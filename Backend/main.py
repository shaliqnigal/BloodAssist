from fastapi import FastAPI
from database import models
from database.connection import engine
import routers.signup
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

models.Base.metadata.create_all(bind=engine) #creates the tables from models.py

#TOD0: update origins with fornend hosted address in production.
origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(routers.signup.router)