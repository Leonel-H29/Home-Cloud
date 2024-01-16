from fastapi import APIRouter
import subprocess
import os

URL = '/api/shell'


router = APIRouter()

current_location = "/home/"

allowed_commands = ['ls', 'pwd', 'cd', 'touch', 'nano', 'rm',
                    'mkdir', 'rmdir', 'echo', 'grep', 'cat', 'zip', 'unzip', 'wc']


@router.post(URL)
async def execute_command(command: str):
    global current_location
    try:
        if command.split()[0] not in allowed_commands:
            return {"error": "Command Not Allowed!", "location": current_location}

        if command.startswith('cd'):
            parts = command.split(' ')
            if len(parts) > 1:
                new_dir = parts[1]
                if new_dir.startswith('/'):
                    current_location = os.path.abspath(new_dir)
                else:
                    current_location = os.path.abspath(
                        os.path.join(current_location, new_dir))

        result = subprocess.run(
            command, shell=True, capture_output=True, text=True, cwd=current_location)
        output = result.stdout.strip()

        return {"output": output, "location": current_location}
    except Exception as e:
        return {"error": f"Error executing command: {str(e)}", "location": current_location}
