from fastapi import APIRouter, UploadFile, File, Query, HTTPException
from fastapi.responses import FileResponse, JSONResponse
from os import getcwd, remove, path


URL = '/api/file'

router = APIRouter()


@router.post(URL + "/create")
async def create_file(name: str, extension: str, location: str = Query(".")):
    file_name = f"{name}.{extension}"
    file_path = path.join(getcwd(), location, file_name)

    try:
        with open(file_path, "w") as new_file:
            new_file.write("")
        return JSONResponse(content={
            "message": f"File '{file_name}' created successfully in '{location}'.",
            "path": file_path
        }, status_code=201)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to create file: {str(e)}")


@router.post(URL + "/upload")
async def upload_file(file: UploadFile = File(...), location: str = Query(".")):

    file_dir = path.join(getcwd(), location, file.filename)
    with open(file_dir, "wb") as Myfile:
        content = await file.read()
        Myfile.write(content)
        Myfile.close()
    return "Success"


@router.get(URL + "/{name_file}")
def get_file(name_file: str):
    return FileResponse(getcwd() + "/" + name_file)

@router.get(URL + "/download/{name_file}")
def download_file(name_file: str):
    mediaType ="application/octet-stream"
    return FileResponse(getcwd() + "/" + name_file, media_type=mediaType, filename=name_file)

@router.delete(URL + "/delete/{name_file}")
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