from fastapi import APIRouter
from flask import Flask, request, jsonify
import subprocess

URL = '/api/shell'

router = APIRouter()

@router.post(URL)
async def execute_command(command: str):
    try:
        result = subprocess.run(command, shell=True, capture_output=True, text=True)
        return {"output": result.stdout, "error": result.stderr}
    except Exception as e:
        return {"error": f"Error executing command: {str(e)}"}


