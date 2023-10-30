from fastapi import APIRouter
from os import listdir, path, stat
from os.path import join
from datetime import datetime
from humanize import naturalsize
import pwd

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

        # Filtrar archivos y directorios ocultos
        visible_contents = [
            item for item in all_contents if not item.split('/')[-1].startswith('.')]

        # Obtener información de cada elemento
        contents_info = []
        for item in visible_contents:
            info = stat(item)
            print(info)
            created = datetime.fromtimestamp(info.st_ctime)
            last_modified = datetime.fromtimestamp(info.st_mtime)
            size = info.st_size  
            item_type = "Archivo" if path.isfile(item) else "Directorio"
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
