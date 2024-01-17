from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from app.main.routes import router
from app.file.routes import router as routerFiles
from app.dirs.routes import router as routerDirs
from app.terminal.routes import router as routerT


app = FastAPI()

app.include_router(router)
app.include_router(routerFiles)
app.include_router(routerDirs)
app.include_router(routerT)

app.mount("/static", StaticFiles(directory="static"), name="static")