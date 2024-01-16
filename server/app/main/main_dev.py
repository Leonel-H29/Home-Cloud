from pathlib import Path
from app.main.main import *
import os
from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent.parent.parent
print(BASE_DIR)


# Load environment variables from .env file
FILE_ENV = 'dev.env'
load_dotenv(Path.joinpath(BASE_DIR, FILE_ENV))
# ALLOWED_COMMANDS = os.getenv("ALLOWED_COMMANDS").split(",")

app.debug = True
print(f"DEBUG: {app.debug}")
origins = ['*']
# DEBUG = app.debug
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
