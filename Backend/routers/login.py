from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import schemas
from database.dependency import dataBase
router = APIRouter(tags=['Authentication'])

@router.post("/login")
async def Login(user_credentials: schemas.UserLogin ,session: Session = Depends(dataBase)):
    
    return {f"Bearer Token"}