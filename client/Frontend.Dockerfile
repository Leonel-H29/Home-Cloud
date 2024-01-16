# Use an official Node runtime as a parent image
FROM node:18-alpine3.18

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json ./

# Install dependencies
RUN npm install 

# Copy the contents of the local src directory to the working directory
COPY . .

# Expose port 3000 to the outside world
EXPOSE 5173

# Run the application
CMD ["npm", "run", "dev"]
