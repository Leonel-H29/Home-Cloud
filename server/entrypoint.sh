#!/bin/sh


echo "Uploading server ..."
sleep 2
APP_ENV=prod python3 manage.py
