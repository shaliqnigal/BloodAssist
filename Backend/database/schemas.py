from pydantic import BaseModel,EmailStr
from typing import Optional

class UserCreate(BaseModel):
    firstname : str
    lastname : str
    email : EmailStr
    password : str

class UserLogin(BaseModel):
    email:EmailStr
    password :str

class Token(BaseModel):
    access_token: str
    token_type : str

class TokenData(BaseModel):
    id : Optional[str] = None
    email : Optional[EmailStr] = None

class Donor(BaseModel):
    firstname : str
    lastname : str
    email : EmailStr
    bloodgroup : str
    contactnumber: int