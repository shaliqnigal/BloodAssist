from database import schemas, models
from sqlalchemy.orm import Session
from database.hashing import Hash
from database.connection import engine

class userCRUD(): # crud operation for signup path operation 
    def user_create(user:schemas.UserCreate):
        with Session(engine) as session:
            hashedPassword = Hash.hash(user.password) 
            user.password = hashedPassword
            new_user = models.User(**user.dict())
            session.add(new_user)
            session.commit()
            session.refresh(new_user)
    def search_user_email(email :str):
        with Session(engine) as session:
            return session.query(models.User).filter(models.User.email == email).first()



