from fastapi import APIRouter,HTTPException, status
from database import schemas
from database.crud import userCRUD
from sqlalchemy.orm import Session
from fastapi import Depends
from database.dependency import dataBase

router = APIRouter()

@router.post("/signup")
async def create_user(userDetails :schemas.UserCreate, session: Session = Depends(dataBase)):
    if userDetails.email == "" or userDetails.firstname == "" or userDetails.lastname == "" or userDetails.password == "":
        raise HTTPException(status_code = 400, detail = f"Enter all details")
    if userCRUD.search_user_email(userDetails.email, session):
        raise HTTPException(status_code=status.HTTP_409_CONFLICT,detail=f"User with {userDetails.email} already exists")
    else:
        userCRUD.user_create(userDetails, session)
    return {"User registered Successfully"}