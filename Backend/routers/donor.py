from database import models,oauth,schemas
from fastapi import Depends, APIRouter, HTTPException, status
from sqlalchemy.orm import Session
from database.dependency import dataBase
from database.crud import donorCRUD

router = APIRouter()
@router.post('/register_donor') # path operator for registering donor
async def create_donor(donor:schemas.Donor,session: Session = Depends(dataBase), current_user :  int  = Depends(oauth.get_current_user), current_user_email= Depends(oauth.get_current_user_email) ):
    if donor.firstname == "" or donor.lastname == "" or donor.city == "" or donor.bloodgroup == "" or donor.contact_number == "" or donor.email == "" or donor.state == "":
        raise HTTPException(status_code = 400, detail = f"enter all details")

    search_id = session.query(models.Donor).filter(models.Donor.owner_id == current_user ).first()
    
    if current_user_email != donor.email:
        raise HTTPException(status_code=403 , detail=f" Use same email you are logged in with")
    if search_id:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT,detail=f"Your are already registered")
    else:
        donorCRUD.createDonor(id,donor,session,current_user)
    return {"donor data saved"}

@router.put("/editdonor/{id}") # path operstor update the existing donor details based on id
async def edit_donor(id:int,update_donor:schemas.Donor,session: Session = Depends(dataBase), current_user :  int  = Depends(oauth.get_current_user), current_user_email= Depends(oauth.get_current_user_email)):
    query = donorCRUD.findDonorWithid(id,session)
    donor = query.first()
    if donor == None:
        raise HTTPException(status_code = 404, detail = f"You are not yet registered")
    if current_user_email != update_donor.email:
        raise HTTPException(status_code = 400, detail = f"Use same email you are logged in with")
    if (donor.owner_id) != int(current_user):
        raise HTTPException(status_code= 403,detail=f"Not authorized to perform requested action")
    donorCRUD.updateDonor(id,update_donor,session)
    return donor

@router.delete("/deletedonor/{id}") # path operator to delete the donor based on id
async def delete_donor(id:int,session: Session = Depends(dataBase), current_user :  int  = Depends(oauth.get_current_user), current_user_email= Depends(oauth.get_current_user_email)):
    query = donorCRUD.findDonorWithid(id,session)
    donor = query.first()
    if donor == None:
        raise HTTPException(status_code = 404, detail = f"You are not yet registered")
    if (donor.owner_id) == int(current_user):
        donorCRUD.deleteDonor(id,session)
    else:
        raise HTTPException(status_code = 403, detail = f"Not authorized to perform requested action")
    return donor