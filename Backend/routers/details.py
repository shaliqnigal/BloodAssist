from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session 
from database.dependency import dataBase
from database import models
from typing import List

router = APIRouter()
@router.get('/alldonors')
async def getall_donors(session: Session = Depends(dataBase)):
    details = session.query(models.Donor).all()
    return details

@router.get('/donor/{id}')
async def indivual_donor( id : int, session: Session = Depends(dataBase)):
    query = session.query(models.Donor).filter(models.Donor.owner_id == id)
    return query.first()
    