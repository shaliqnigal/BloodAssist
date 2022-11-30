from database import schemas, models
from sqlalchemy.orm import Session
from database import hashing,oauth
from database.connection import engine
from fastapi import Depends
from database.dependency import dataBase

class userCRUD(): # crud operation for signup path operation 
    def user_create(user:schemas.UserCreate, session: Session = Depends(dataBase)): # function for creatimg user and saving it in database
        hashedPassword = hashing.hash(user.password) 
        user.password = hashedPassword
        new_user = models.User(**user.dict())
        session.add(new_user)
        session.commit()
        session.refresh(new_user)
    def search_user_email(email :str, session: Session = Depends(dataBase)):
        return session.query(models.User).filter(models.User.email == email).first()
    

class loginCRUD(): # login crud operation
    def user_login(login:schemas.UserLogin, session: Session =Depends(dataBase)): # fetching the details from databse userprofile table by filtering with email 
        return session.query(models.User).filter(models.User.email == login.email).first()

class feedbackCRUD(): # feedback drub operation
    def feedbackSave(feedback: schemas.feedback, session: Session = Depends(dataBase)): # function to save the feedback in database
        new_feedback = models.Feedback(**feedback.dict())
        session.add(new_feedback)
        session.commit()
        session.refresh(new_feedback)

class donorCRUD(): #Dono crud operations
    def findDonorWithid(id:int, session: Session = Depends(dataBase)): # function to find the donor with id
        return session.query(models.Donor).filter(models.Donor.owner_id == id)
    def updateDonor(id:int, update_donor: schemas.Donor,session: Session = Depends(dataBase)): # function to update the donor base on id
        query = session.query(models.Donor).filter(models.Donor.owner_id == id)
        query.update(update_donor.dict(), synchronize_session=False)
        session.commit()
    def deleteDonor(id:int,session: Session = Depends(dataBase)):# function to delete the donor based on id
        query = session.query(models.Donor).filter(models.Donor.owner_id == id)
        query.delete(synchronize_session=False)
        session.commit()
    def createDonor(id:int, donor: schemas.Donor,session: Session = Depends(dataBase), current_user :  int  = Depends(oauth.get_current_user)): # function to create the donor in databse
        new_donor = models.Donor(owner_id = current_user, **donor.dict())
        session.add(new_donor)
        session.commit()
        session.refresh(new_donor)

class detailsCRUD():
    def getAllDonors(session: Session = Depends(dataBase)):
        return session.query(models.Donor).all()
    
    def inidvualDonor(id:int,session: Session = Depends(dataBase)):
        return session.query(models.Donor).filter(models.Donor.owner_id == id)