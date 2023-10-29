from fastapi import APIRouter
from os import listdir, path
from fastapi import HTTPException

URL = '/api/'
router = APIRouter()


@router.get("/")
def main():
    return "Hello World!"


@router.get(URL+"list")
def list_files_and_directories(location: str = "."):
    try:
        print(location)
        # Obtener la lista de archivos y directorios
        contents = listdir(location)
        print(contents)

        # Incluir archivos y directorios ocultos
        all_contents = [path.join(location, item) for item in contents]

        # Filtrar archivos y directorios ocultos
        visible_contents = [
            item for item in all_contents if not item.split('/')[-1].startswith('.')]

        return {"contents": visible_contents}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
