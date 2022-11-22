from pydantic import BaseModel,EmailStr
from typing import Optional

class UserCreate(BaseModel): # schema for user creation
    firstname : str
    lastname : str
    email : EmailStr
    password : str

class UserLogin(BaseModel): # schema for user login
    email:EmailStr
    password :str

class Token(BaseModel): # schema for JWT and it is type
    access_token: str
    token_type : str

class TokenData(BaseModel): # schema for JWT encoded with
    id : Optional[str] = None
    email : Optional[EmailStr] = None

class Donor(BaseModel): #schema for Donor
    firstname : str
    lastname : str
    email : EmailStr
    bloodgroup : str
    city :str
    state:str
    contact_number : str

class feedback(BaseModel): #schema for feedback
    rating : str
    comments: str
    name : str
    email : EmailStr