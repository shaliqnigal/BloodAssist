from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session 
from database.dependency import dataBase
from database.crud import detailsCRUD
router = APIRouter()
@router.get('/alldonors')
async def getall_donors(session: Session = Depends(dataBase)):
    details = detailsCRUD.getAllDonors(session)
    return details

@router.get('/donor/{id}')
async def indivual_donor( id : int, session: Session = Depends(dataBase)):
    query = detailsCRUD.inidvualDonor(id,session)
    return query.first()
    