from database import models,oauth,schemas
from fastapi import Depends, APIRouter
from sqlalchemy.orm import Session
from database.dependency import dataBase

router = APIRouter()
@router.post('/register_donor')
async def create_donor(donor:schemas.Donor,db: Session = Depends(dataBase), current_user :  int  = Depends(oauth.get_current_user)):
    new_donor = models.Donor(owner_id = current_user, **donor.dict())
    db.add(new_donor)
    db.commit()
    db.refresh(new_donor)
    return new_donor