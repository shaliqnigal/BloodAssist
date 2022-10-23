from sqlalchemy.orm import sessionmaker, Session
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from database.connection import Base
from database.dependency import dataBase
from main import app

SQLALCHEMY_DATABASE_URL = f'postgresql://faoptumsdayvtb:b925857a5bb7a9f9660b473fc0a6619180b196abbb6b1fbe50cdbaf5b4908f30@ec2-54-163-34-107.compute-1.amazonaws.com:5432/d7v81qgh2viukd' # test database
testengine = create_engine(SQLALCHEMY_DATABASE_URL)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=testengine)
Base.metadata.drop_all(bind=testengine)
Base.metadata.create_all(bind=testengine)

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

def test_login_with_invalidDetails(): # testing for logining user with invalid details
    response = client.post(
        "/login", json={"email": "test@gmail.com", "password": "test"}
    )
    assert response.status_code == 403
