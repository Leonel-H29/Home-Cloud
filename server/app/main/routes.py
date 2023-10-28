from fastapi import APIRouter, UploadFile, File
from fastapi.responses import FileResponse, JSONResponse
from os import getcwd, remove

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


@router.get("/file/{name_file}")
def get_file(name_file: str):
    return FileResponse(getcwd() + "/" + name_file)

@router.get("/download/{name_file}")
def download_file(name_file: str):
    mediaType ="application/octet-stream"
    return FileResponse(getcwd() + "/" + name_file, media_type=mediaType, filename=name_file)

@router.delete("/delete/{name_file}")
def delete_file(name_file: str):
    try:
        remove(getcwd() + "/" + name_file)
    except FileNotFoundError:
        return JSONResponse(content={
            "removed": False,
            "messagge": "File Not Found"
        }, status_code=404)

    return JSONResponse(content={
            "removed": True,
            "messagge": "Ok"
        }, status_code=200)