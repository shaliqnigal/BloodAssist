from pydantic import BaseModel,EmailStr

class UserCreate(BaseModel):
    firstname : str
    lastname : str
    email : EmailStr
    password : str

class UserLogin(BaseModel):
    email:EmailStr
    password :str