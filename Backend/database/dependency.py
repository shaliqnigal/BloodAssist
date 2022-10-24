from sqlalchemy.orm import Session
from database.connection import engine

def dataBase():
    with Session(engine) as session:
        yield session