from fastapi import FastAPI
from app.main.routes import router
from app.file.routes import router as routerFiles



app = FastAPI()

app.include_router(router)
app.include_router(routerFiles)