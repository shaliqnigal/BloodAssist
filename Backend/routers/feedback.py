from fastapi import APIRouter,HTTPException, status
from database import schemas
from sqlalchemy.orm import Session
from fastapi import Depends
from database.dependency import dataBase
from database import models

router = APIRouter()

@router.post("/feedback")
async def save_feedback(feedbackdetails: schemas.feedback, session: Session = Depends(dataBase)):
    if feedbackdetails.rating == "" or feedbackdetails.comments == "" or feedbackdetails.email == "" or feedbackdetails.name =="":
        raise HTTPException(status_code = 400) 
    new_feedback = models.Feedback(**feedbackdetails.dict())
    session.add(new_feedback)
    session.commit()
    session.refresh(new_feedback)
    return {"feedback registered Successfully"}