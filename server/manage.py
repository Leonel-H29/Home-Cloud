import os
import uvicorn


def main():
        
    # By default, use the development environment
    app_env = os.getenv("APP_ENV", "dev")

    # Define the port on which you want to run the server
    port = 8082
    # Enabled auto reload
    reload = True
    
    
    """
    If the user passes the input 'ENV=prod' as a parameter, it will use the production environment. Otherwise it will use the development environment.
    """
    if app_env == "prod":
        # Define the module and name of the FastAPI application you want to run
        module_name = 'app.main.main_prod:app'
        uvicorn.run(app=module_name, host='0.0.0.0', port=port,
                reload=reload, log_level="info")
    else:
    
        module_name = 'app.main.main_dev:app'
        uvicorn.run(app=module_name, host='0.0.0.0', port=port,
                reload=reload, log_level="info")


if __name__ == "__main__":
    main()
