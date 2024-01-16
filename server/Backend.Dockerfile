# Use an official Python runtime as a parent image
FROM python:3.9.18-alpine3.19

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . .

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Create directories in /home
RUN mkdir -p /home/Downloads /home/Documents /home/Music /home/Videos /home/Images

# Make port 80 available to the world outside this container
EXPOSE 80

# Define environment variable
#ENV NAME World

# Run app.py when the container launches
CMD ["sh","./entrypoint.sh"]
