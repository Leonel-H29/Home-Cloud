#!/bin/sh

##I look for directories with the name '__pycache__'
directories=$(find $PWD -type d -name "__pycache__")

#I go through the list and delete each directory and the contents of each directory
for x in $directories; do
	rm -r $x
done


###I check if the static files directory already exists, if not it is created.
###If the directory already exists, I check if at least one file exists and then copy them to the server in their respective directories.

if [ -d "/app/static/" ]; then
    echo "Alredy exist directory to static files"
else
    echo "Building static files directory ..."
    sleep 2
    mkdir static
fi

if [ "$(ls -A /app/static/)" ]; then
    echo "Copying static files..."
    cp -r /app/static/* /
fi


echo "Uploading server ..."
sleep 2
APP_ENV=prod python3 manage.py
