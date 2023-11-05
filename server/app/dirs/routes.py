from fastapi import APIRouter
from fastapi.responses import JSONResponse
from os import getcwd, mkdir, rmdir, rename


URL = '/api/dirs'
router = APIRouter()


@router.post(URL + "/upload/{dir_name}")
def create_directory(dir_name: str):
    try:
        mkdir(getcwd() + "/" + dir_name)
    except FileExistsError:
        return JSONResponse(content={
            "created": False,
            "message": "Directory Already Exists"
        }, status_code=400)
    except FileNotFoundError:
        return JSONResponse(content={
            "created": False,
            "message": "Directory Not Found"
        }, status_code=404)

    return JSONResponse(content={
        "created": True,
        "message": "Directory Created Successfully"
    }, status_code=201)

@router.put(URL + "/rename/{dir_name}")
def edit_directory(dir_name: str, new_name: str):
    try:
        rename(getcwd() + "/" + dir_name, getcwd() + "/" + new_name)
    except FileNotFoundError:
        return JSONResponse(content={
            "edited": False,
            "message": "Directory Not Found"
        }, status_code=404)

    return JSONResponse(content={
        "edited": True,
        "message": "Directory Edited Successfully"
    }, status_code=200)

@router.delete(URL + "/delete/{dir_name}")
def delete_directory(dir_name: str):
    try:
        rmdir(getcwd() + "/" + dir_name)
    except FileNotFoundError:
        return JSONResponse(content={
            "deleted": False,
            "message": "Directory Not Found"
        }, status_code=404)

    return JSONResponse(content={
        "deleted": True,
        "message": "Directory Deleted Successfully"
    }, status_code=200)
