from fastapi import FastAPI
from app.main.routes import router
from app.file.routes import router as routerFiles
from app.dirs.routes import router as routerDirs



app = FastAPI()

app.include_router(router)
app.include_router(routerFiles)
app.include_router(routerDirs)