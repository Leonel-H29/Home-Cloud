from pathlib import Path
from app.main.main import app
import os
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

BASE_DIR = Path(__file__).resolve().parent.parent.parent

# Load environment variables from .env file
FILE_ENV = 'prod.env'
load_dotenv(Path.joinpath(BASE_DIR, FILE_ENV))

ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS")

app.debug = False
print(f"DEBUG: {app.debug}")

origins = []
if ALLOWED_ORIGINS:
    origins = ALLOWED_ORIGINS.split(',')

print(f"origins={origins}")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
