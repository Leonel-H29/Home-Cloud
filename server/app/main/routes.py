from fastapi import APIRouter, UploadFile, File
from os import getcwd

router = APIRouter()

@router.get("/")
def main():
    return "Hello World!"

# @router.post("/upload")
# def upload_file(file: UploadFile= File(...)):
#     #print(file)
#     return "Success"

@router.post("/upload")
async def upload_file(file: UploadFile= File(...)):

    file_dir = getcwd() + "/" + file.filename
    with open(file_dir, "wb") as Myfile:
        content = await file.read()
        Myfile.write(content)
        Myfile.close()
    return "Success"