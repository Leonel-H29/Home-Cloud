# Web Home Cloud

## Introduction

The Web File Server project aims to provide a simple yet efficient solution for hosting and serving files over the web. It utilizes FastAPI for the backend and React with Vite for the frontend to create a modern and responsive user interface.

## Installation

To get started with the Web File Server, you can either clone the repository or download the source code. Follow the instructions below:

```bash
git clone https://github.com/Leonel-H29/Home-Cloud.git
cd Home-Cloud
```

## Running Locally

To run the project locally, you'll need to start both the backend and frontend servers. Follow these steps:

### Backend (FastAPI)

1. Navigate to the `server` directory:

   ```bash
   cd server
   ```

2. Install the dependencies:

   ```bash
   pip install -r requirements.txt
   ```

3. Start the FastAPI server:

- Windows & MacOS

  ```bash
  python manage.py
  ```

- Linux
  ```bash
  python3 manage.py
  ```

The backend will run on in `http://localhost:8082`

### Frontend (React with Vite)

1. Open a new terminal window/tab.

2. Navigate to the `client` directory:

   ```bash
   cd client
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Start the frontend server:
   ```bash
   npm run dev
   ```

Once both the backend and frontend servers are running, you can access the web file server at `http://localhost:5173`.

## Running with Docker and docker-compose

Alternatively, you can run the project using Docker and docker-compose. Make sure you have Docker and docker-compose installed on your system.

1. Clone the repository (if not already done):

   ```bash
    git clone https://github.com/Leonel-H29/Home-Cloud.git
    cd Home-Cloud
   ```

2. Run docker-compose to build and start the containers:
   ```bash
   docker-compose -f "docker-compose.yml" up -d --build
   ```

Once the containers are up and running, you can access the web file server at `http://localhost:5173`.
