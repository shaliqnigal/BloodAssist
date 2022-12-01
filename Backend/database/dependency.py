from sqlalchemy.orm import Session
from database.connection import engine

def dataBase(): # creates the session for each request and close it when the request is finished
    with Session(engine) as session:
        yield session