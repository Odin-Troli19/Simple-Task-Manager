# Simple Task Manager

This is a full-stack Task Manager (To-Do List) application. It's a demonstration project for a third-year Computer Science student, showcasing a complete client-server architecture.

##  Features

* **View** all tasks.
* **Add** a new task.
* **Delete** an existing task.

##  Technology Stack

* **Back-End:** Python (Flask)
    * `flask`: The web server.
    * `flask-cors`: To allow the front-end to make requests to the back-end.
* **Front-End:** React.js
    * `react`: For building the user interface.
    * `axios`: For making API requests to the back-end.

##  Project Structure

simple-task-manager/ ├── client/ (React Front-end) ├── server/ (Flask Back-end) └── README.md

##  Setup and Installation

You will need **Node.js** (for the front-end) and **Python 3** (for the back-end) installed.

### 1. Back-End Setup (Server)

1.  Navigate to the `server` directory:
    ```sh
    cd server
    ```
2.  (Recommended) Create and activate a virtual environment:
    ```sh
    python3 -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
    ```
3.  Install the required Python packages:
    ```sh
    pip install Flask flask-cors
    ```
4.  Run the Flask server (it will run on `http://127.0.0.1:5000`):
    ```sh
    python3 app.py
    ```

### 2. Front-End Setup (Client)

1.  Open a **new terminal window** (leave the server running!).
2.  Navigate to the `client` directory:
    ```sh
    cd client
    ```
3.  Install the required Node.js packages:
    ```sh
    npm install
    ```
4.  Run the React development server (it will open in your browser at `http://localhost:3000`):
    ```sh
    npm start
    ```

You can now use the application in your browser!

##  API Endpoints

The back-end server provides the following REST API endpoints:

* `GET /api/tasks`
    * Description: Get all tasks.
    * Response: `[{"id": 1, "text": "Example task"}]`
* `POST /api/tasks`
    * Description: Create a new task.
    * Request Body: `{"text": "New task text"}`
    * Response: `{"id": 2, "text": "New task text"}`
* `DELETE /api/tasks/<id>`
    * Description: Delete a task by its ID.
    * Response: `{"message": "Task deleted"}`