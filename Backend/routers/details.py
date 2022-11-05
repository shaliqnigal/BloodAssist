from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import schemas
from database.dependency import dataBase
from database import models
from typing import List

router = APIRouter()
@router.get('/alldonors')
async def getall_donors(session: Session = Depends(dataBase)):
    details = session.query(models.Donor).all()
    return details