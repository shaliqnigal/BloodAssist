from fastapi import Depends, APIRouter
from sqlalchemy.orm import Session
from database.dependency import dataBase

router = APIRouter()
@router.post('/register_donor')
async def create_donor(donor:schemas.Donor,db: Session = Depends(dataBase)):
    
    return {"donor path operation"}