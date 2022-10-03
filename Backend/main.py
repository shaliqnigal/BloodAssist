from fastapi import FastAPI
from database import models
from database.connection import engine
import routers.signup

app = FastAPI()

models.Base.metadata.create_all(bind=engine) #creates the tables from models.py

app.include_router(routers.signup.router)