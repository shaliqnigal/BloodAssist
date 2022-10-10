from database import schemas, models
from sqlalchemy.orm import Session
from database.hashing import Hash
from database.connection import engine
from fastapi import Depends
from database.dependency import dataBase

class userCRUD(): # crud operation for signup path operation 
    def user_create(user:schemas.UserCreate, session: Session = Depends(dataBase)):
        hashedPassword = Hash.hash(user.password) 
        user.password = hashedPassword
        new_user = models.User(**user.dict())
        session.add(new_user)
        session.commit()
        session.refresh(new_user)
    def search_user_email(email :str, session: Session = Depends(dataBase)):
        return session.query(models.User).filter(models.User.email == email).first()



