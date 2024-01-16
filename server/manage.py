import os
import uvicorn


def main():
    # Define el módulo y el nombre de la aplicación de FastAPI que deseas ejecutar
    # Reemplaza 'app.main.main:app' con el nombre de tu módulo y aplicación de FastAPI
    module_name = 'app.main.main:app'
    # Por defecto, usa el entorno de desarrollo
    app_env = os.getenv("APP_ENV", "dev")

    # Importa configuraciones específicas de entorno
    if app_env == "dev":
        from app.main.main_dev import app
    elif app_env == "prod":
        from app.main.main_prod import app
    else:
        raise ValueError("APP_ENV debe ser 'dev' o 'prod'")

    # Define el puerto en el que deseas ejecutar el servidor
    port = 8082

    reload = True
    uvicorn.run(module_name, host='0.0.0.0', port=port,
                reload=reload, log_level="info")


if __name__ == "__main__":
    main()
