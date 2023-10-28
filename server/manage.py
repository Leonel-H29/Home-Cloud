import uvicorn

def main():
    # Define el módulo y el nombre de la aplicación de FastAPI que deseas ejecutar
    # Reemplaza 'app.main.main:app' con el nombre de tu módulo y aplicación de FastAPI
    module_name = 'app.main.main:app'
    #app_name = 'app'

    # Define el puerto en el que deseas ejecutar el servidor
    port = 8082

    # Agrega la opción 'reload=True' para habilitar el recargado automático
    uvicorn.run(module_name, host='0.0.0.0', port=port, reload=True, log_level="info")

if __name__ == "__main__":
    main()
