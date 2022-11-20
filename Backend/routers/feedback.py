from fastapi import APIRouter,HTTPException
from database import schemas,crud
from sqlalchemy.orm import Session
from fastapi import Depends
from database.dependency import dataBase

router = APIRouter()

@router.post("/feedback")
async def save_feedback(feedbackdetails: schemas.feedback, session: Session = Depends(dataBase)):
    if feedbackdetails.rating == "" or feedbackdetails.comments == "" or feedbackdetails.email == "" or feedbackdetails.name =="":
        raise HTTPException(status_code = 400) 
    else:
        crud.feedbackCRUD.feedbackSave(feedbackdetails,session)
    return {"feedback registered Successfully"}