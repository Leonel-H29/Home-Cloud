from fastapi import FastAPI
from app.main.routes import router
from app.file.routes import router as routerFiles
from app.dirs.routes import router as routerDirs
from app.terminal.routes import router as routerT
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

app = FastAPI()

app.include_router(router)
app.include_router(routerFiles)
app.include_router(routerDirs)
app.include_router(routerT)

# Get the addresses allowed for CORS from the .env file
origins = os.getenv("ALLOWED_ORIGINS").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
