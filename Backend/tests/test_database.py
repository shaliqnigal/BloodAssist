from sqlalchemy.orm import sessionmaker, Session
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from database.connection import Base
from database.dependency import dataBase
from main import app

SQLALCHEMY_DATABASE_URL = f'postgresql://postgres:1234@localhost:5432/testdb' # test database
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