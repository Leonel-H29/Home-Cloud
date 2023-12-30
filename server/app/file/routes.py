from fastapi import APIRouter, UploadFile, File, Query, HTTPException
from fastapi.responses import FileResponse, JSONResponse
from os import getcwd, remove, path, rename


URL = '/api/file'

router = APIRouter()


@router.post(URL + "/create")
async def create_file(name: str, extension: str, location: str = Query(".")):
    """
    Endpoint to create a new file
    """
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
        raise HTTPException(
            status_code=500, detail=f"Failed to create file: {str(e)}")


@router.post(URL + "/upload")
async def upload_file(file: UploadFile = File(...), location: str = Query(".")):
    """
    Endpoint to upload one or many files
    """
    file_dir = path.join(getcwd(), location, file.filename)
    with open(file_dir, "wb") as Myfile:
        content = await file.read()
        Myfile.write(content)
        Myfile.close()
    return "Success"


@router.put(URL + "/edit/{name_file}")
async def rename_move_file(name_file: str, new_name: str = None, current_location: str = None, new_location: str = None):

    try:
        # current_location = getcwd()
        file_path = path.join(current_location, name_file)

        if not path.exists(file_path):
            return JSONResponse(
                content={"message": "File not found"},
                status_code=404
            )

        if new_name:
            new_file_path = path.join(current_location, new_name)
            if path.exists(new_file_path):
                return JSONResponse(
                    content={"message": "File with new name already exists"},
                    status_code=409
                )
            # Rename file
            rename(file_path, new_file_path)

            file_path = new_file_path

        if new_location:
            new_location_path = path.join(current_location, new_location)
            if not path.exists(new_location_path):
                return JSONResponse(
                    content={"message": "New location not found"},
                    status_code=404
                )
            # Move file to the new location
            new_file_path = path.join(new_location_path, name_file)
            rename(file_path, new_file_path)
            file_path = new_file_path

        return JSONResponse(
            content={"message": "File renamed and/or moved successfully"},
            status_code=200
        )

    except Exception as e:
        return JSONResponse(
            content={"message": str(e)},
            status_code=500
        )


@router.get(URL + "/{name_file}")
def get_file(name_file: str):
    """
    Endpoint to obtain one determinated file
    """
    return FileResponse(getcwd() + "/" + name_file)


@router.get(URL + "/download/{name_file}")
def download_file(name_file: str):
    """
    Endpoint to download one determinated file
    """
    mediaType = "application/octet-stream"
    return FileResponse(getcwd() + "/" + name_file, media_type=mediaType, filename=name_file)


@router.delete(URL + "/delete/{name_file}")
def delete_file(name_file: str, location: str = Query(".")):
    """
    Endpoint to delete one determinated file
    """
    try:
        remove(path.join(getcwd(), location, name_file))
    except FileNotFoundError:
        return JSONResponse(content={
            "removed": False,
            "messagge": "File Not Found"
        }, status_code=404)

    return JSONResponse(content={
        "removed": True,
        "messagge": "Ok"
    }, status_code=200)
