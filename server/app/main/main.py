from fastapi import FastAPI
from app.main.routes import router


app = FastAPI()

app.include_router(router)