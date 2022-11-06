from database import models,oauth,schemas
from fastapi import Depends, APIRouter, HTTPException, status
from sqlalchemy.orm import Session
from database.dependency import dataBase

router = APIRouter()
@router.post('/register_donor')
async def create_donor(donor:schemas.Donor,session: Session = Depends(dataBase), current_user :  int  = Depends(oauth.get_current_user), current_user_email= Depends(oauth.get_current_user_email) ):
    search_id = session.query(models.Donor).filter(models.Donor.owner_id == current_user ).first()
    
    if current_user_email != donor.email:
        raise HTTPException(status_code=403 , detail=f" Use same email you are logged in with")
    if search_id:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT,detail=f"Your are already registered")
    else:
        new_donor = models.Donor(owner_id = current_user, **donor.dict())
        session.add(new_donor)
        session.commit()
        session.refresh(new_donor)
    return new_donor