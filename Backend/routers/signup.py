from fastapi import APIRouter
from database import schemas

router = APIRouter()

@router.post("/signup")
async def create_user(userDetails :schemas.UserCreate):
    return {"User registered Successfully"}