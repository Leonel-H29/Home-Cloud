from fastapi import APIRouter
from os import listdir, path, stat
from datetime import datetime
import math

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
            last_modified = datetime.fromtimestamp(info.st_mtime)
            size_mb = math.ceil(info.st_size / (1024 * 1024))  # Convertir a MB
            item_type = "Archivo" if path.isfile(item) else "Directorio"

            contents_info.append({
                "name": item.split('/')[-1],
                "type": item_type,
                "last_modified": last_modified.strftime("%d-%m-%Y %H:%M:%S"),
                "size_mb": size_mb
            })

        return {"contents": contents_info}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
