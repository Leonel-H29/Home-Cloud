from app.main.main import app
from fastapi.middleware.cors import CORSMiddleware

app.debug = True
print(f"DEBUG: {app.debug}")
origins = ['*']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
