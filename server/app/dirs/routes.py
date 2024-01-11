from fastapi import APIRouter,  Query
from fastapi.responses import FileResponse, JSONResponse
from os import getcwd, mkdir, rmdir, rename, path
from shutil import rmtree
from shutil import move, make_archive

URL = '/api/dirs'
router = APIRouter()


@router.post(URL + "/create/{dir_name}")
def create_directory(dir_name: str,  location: str = Query(".")):
    try:
        mkdir(path.join(getcwd(), location, dir_name))
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


@router.put(URL + "/edit/{dir_name}")
def rename_move_directory(
    dir_name: str,
    new_name: str = None, current_location: str = None, new_location: str = None
):
    

    if new_name is not None:
        try:
            rename(
                path.join(current_location, dir_name),
                path.join(current_location, new_name)
            )
        except FileNotFoundError:
            return JSONResponse(
                content={
                    "edited": False,
                    "message": "Directory Not Found"
                },
                status_code=404
            )

    if new_location is not None:
        try:
            move(
                path.join(current_location, dir_name),
                path.join(current_location, new_location, dir_name)
            )
        except FileNotFoundError:
            return JSONResponse(
                content={
                    "edited": False,
                    "message": "Directory Not Found"
                },
                status_code=404
            )

    return JSONResponse(
        content={
            "edited": True,
            "message": "Directory Edited Successfully"
        },
        status_code=200
    )


@router.delete(URL + "/delete/{dir_name}")
def delete_directory(dir_name: str,  location: str = Query(".")):
    try:
        # rmdir(getcwd() + "/" + dir_name)
        rmtree(path.join(getcwd(), location, dir_name))
    except FileNotFoundError:
        return JSONResponse(content={
            "deleted": False,
            "message": "Directory Not Found"
        }, status_code=404)

    return JSONResponse(content={
        "deleted": True,
        "message": "Directory Deleted Successfully"
    }, status_code=200)



@router.get(URL + "/download/{dir_name}")
def download_directory(dir_name: str, location: str = Query(".")):
    try:
        
        mediaType = "application/octet-stream"
        zip_filepath = make_archive(path.join(getcwd(), location, dir_name), 'zip', path.join(getcwd(), location, dir_name))
        print(zip_filepath)
        

        return FileResponse(zip_filepath, media_type=mediaType,filename=dir_name)

    except FileNotFoundError:
        return JSONResponse(
            content={
                "downloaded": False,
                "message": "Directory Not Found"
            },
            status_code=404
        )
    finally:
        rmtree(zip_filepath, ignore_errors=True)
   