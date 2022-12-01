from fastapi import FastAPI
from database import models
from database.connection import engine
import routers.signup
import routers.donor
import routers.signup, routers.login , routers.feedback
import routers.details
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

models.Base.metadata.create_all(bind=engine) #creates the tables from models.py

#TOD0: update origins with fornend hosted address in production.
# origin where frontend broswer is running, to comminucate with it we have open CORS.
origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# including all the routers
app.include_router(routers.signup.router)
app.include_router(routers.donor.router)
app.include_router(routers.login.router)
app.include_router(routers.details.router)
app.include_router(routers.feedback.router)

