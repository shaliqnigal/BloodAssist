from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session 
from database.dependency import dataBase
from database.crud import detailsCRUD
router = APIRouter()
@router.get('/alldonors') # path operation to get all donors 
async def getall_donors(session: Session = Depends(dataBase)):
    details = detailsCRUD.getAllDonors(session)
    return details

@router.get('/donor/{id}') # path operation to get indiviual donor based on id
async def indivual_donor( id : int, session: Session = Depends(dataBase)):
    query = detailsCRUD.inidvualDonor(id,session)
    return query.first()
    