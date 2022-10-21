from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer
from jose import jwt
from database import schemas
from datetime import datetime, timedelta

oauth_scheme = OAuth2PasswordBearer(tokenUrl="/login")
def create_access_token(data:dict):
    to_encode = data.copy()
    expire = datetime.utcnow()+timedelta(minutes= 30)
    to_encode.update({"exp":expire})
    encoded_jwt = jwt.encode(to_encode,"09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7",algorithm="HS256")
    return encoded_jwt


def get_current_user(token:str = Depends(oauth_scheme)):
    payload =jwt.decode(token,"09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7",algorithms="HS256")
    id : str = payload.get("user_id")
    email : str = payload.get("user_email")
    token_data = schemas.TokenData(id = id, email=email)
    return token_data.id 
