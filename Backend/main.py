from fastapi import FastAPI
import routers.signup

app = FastAPI()
app.include_router(routers.signup.router)