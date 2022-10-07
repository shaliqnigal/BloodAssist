from fastapi import APIRouter,HTTPException, status
from database import schemas
from database.crud import userCRUD

router = APIRouter()

@router.post("/signup")
async def create_user(userDetails :schemas.UserCreate):
    if userCRUD.search_user_email(userDetails.email):
        raise HTTPException(status_code=status.HTTP_409_CONFLICT,detail=f"User with {userDetails.email} already exists")
    else:
        userCRUD.user_create(userDetails)
    return {"User registered Successfully"}