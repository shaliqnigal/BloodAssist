from sqlalchemy.orm import sessionmaker, Session
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from database.connection import Base
from database.dependency import dataBase
from main import app

SQLALCHEMY_DATABASE_URL = f'postgresql://wxicuwdkacwpwp:59f82b3a92c5a75e1ac0df883d963e1647d93e868fbc8e268c656ec00f9b6253@ec2-3-216-167-65.compute-1.amazonaws.com:5432/d9s58ndac5jopf' # test database url
testengine = create_engine(SQLALCHEMY_DATABASE_URL)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=testengine) # requests a connection from the engine's connection pool
Base.metadata.drop_all(bind=testengine) # drops all the tables in test database
Base.metadata.create_all(bind=testengine) # creates the tables in test database

def override_dataBase():
    with Session(testengine) as session:
        yield session

app.dependency_overrides[dataBase] = override_dataBase
client = TestClient(app)

def test_create_user(): # testing for creating user
    response = client.post(
        "/signup", json={"firstname":"testfirstname", "lastname":"testlatname", "email": "test@gmail.com", "password": "test1"}
    )
    assert response.status_code == 200

def test_to_create_existinguser(): # testing existing user 
    response = client.post(
        "/signup", json={"firstname":"testfirstname", "lastname":"testlatname", "email": "test@gmail.com", "password": "test"}
    )
    assert response.status_code == 409

def test_login(): # testing for logining user
    response = client.post(
        "/login", json={"email": "test@gmail.com", "password": "test1"}
    )
    assert response.status_code == 200

def test_login_with_invalidPassword(): # testing for logining user with invalid password
    response = client.post(
        "/login", json={"email": "test@gmail.com", "password": "test"}
    )
    assert response.status_code == 403

def test_login_with_invalidEmail(): # testing for logining user with invalid email
    response = client.post(
        "/login", json={"email": "test11@gmail.com", "password": "test"}
    )
    assert response.status_code == 403
    
def test_register_donor(): # testing to register the donor with fake access token
    response = client.post(
        "/register_donor",
        headers={"Authorization":"faketoken"},
        json={"firstname":"testfirstname", "lastname":"testlatname", "email": "test@gmail.com","bloodgroup":"O","contactnumber":"3146575422"}
    )
    assert response.status_code == 401


def test_details(): # testing to return all the details 0f donors
    response = client.get("/alldonors")
    assert response.status_code == 200

def test_eachDonorDetails(): # testing to return indiviual detials of donor
    response = client.get("/donor/0")
    assert response.status_code == 200
