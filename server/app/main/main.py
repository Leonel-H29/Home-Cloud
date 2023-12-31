from fastapi import FastAPI
from app.main.routes import router
from app.file.routes import router as routerFiles
from app.dirs.routes import router as routerDirs
from app.terminal.routes import router as routerT
from fastapi.middleware.cors import CORSMiddleware



app = FastAPI()

app.include_router(router)
app.include_router(routerFiles)
app.include_router(routerDirs)
app.include_router(routerT)

# Configuracion de CORS
origins = [
    "http://localhost",
    "http://localhost:5173",  # Si React se ejecuta en el puerto 3000
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)