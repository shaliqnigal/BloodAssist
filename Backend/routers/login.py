from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import schemas
from database.dependency import dataBase
from database.crud import loginCRUD
from database import oauth, hashing
router = APIRouter(tags=['Authentication'])

@router.post("/login")
async def Login(user_credentials: schemas.UserLogin ,session: Session = Depends(dataBase)):
    user = loginCRUD.user_login(user_credentials,session)
    if not user:
        raise HTTPException(status_code= status.HTTP_403_FORBIDDEN,detail=f"Invalid credentials")
    if not hashing.verify(user_credentials.password,user.password):
        raise HTTPException(status_code= status.HTTP_403_FORBIDDEN, detail=f"Invalid Credentials")
    access_token  =oauth.create_access_token(data={"user_id":user.id,"user_email":user.email})
    return {f"Bearer {access_token}"}