from fastapi import APIRouter
from os import listdir, path, stat
from os.path import join
from datetime import datetime
from humanize import naturalsize
import pwd
from app.dirs.conf_dir import get_size
from fastapi import HTTPException

URL = '/api/'
router = APIRouter()


@router.get("/")
def main():
    return "Hello World!"


@router.get(URL+"list")
def list_files_and_directories(location: str = "."):
    try:
        # Obtener la lista de archivos y directorios
        contents = listdir(location)

        # Incluir archivos y directorios ocultos
        all_contents = [path.join(location, item) for item in contents]

        

        # Obtener información de cada elemento
        contents_info = []
        for item in all_contents:
            info = stat(item)
            print(info)
            created = datetime.fromtimestamp(info.st_ctime)
            last_modified = datetime.fromtimestamp(info.st_mtime)
            size = get_size(item) if path.isdir(item) else info.st_size
            item_type = "File" if path.isfile(item) else "Directory"
            owner_info = pwd.getpwuid(info.st_uid)
            

            contents_info.append({
                "name": item.split('/')[-1],
                "type": item_type,
                "created":created.strftime("%d-%m-%Y %H:%M:%S"),
                "last_modified": last_modified.strftime("%d-%m-%Y %H:%M:%S"),
                "owner" : owner_info.pw_name,
                "content": len(listdir(join(location, item))) if item_type=='Directorio' else None,   
                "size": naturalsize(size)
            })

        return {"contents": contents_info}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
