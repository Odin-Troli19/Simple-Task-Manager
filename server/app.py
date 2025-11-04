from flask import Flask, request, jsonify
from flask_cors import CORS

# Initialize the Flask app
app = Flask(__name__)
# Enable CORS (Cross-Origin Resource Sharing) to allow
# our React front-end (on a different port) to make requests.
CORS(app)

# A simple in-memory "database" (a list of dictionaries)
# We use a global variable to keep track of the next ID
tasks_db = [
    {"id": 1, "text": "Learn Docker"},
    {"id": 2, "text": "Build a full-stack app"},
    {"id": 3, "text": "Deploy the app"}
]
next_id = 4

# --- API Endpoints ---

# [GET] /api/tasks: Get all tasks
@app.route('/api/tasks', methods=['GET'])
def get_tasks():
    """Returns the list of all tasks."""
    return jsonify(tasks_db)

# [POST] /api/tasks: Create a new task
@app.route('/api/tasks', methods=['POST'])
def add_task():
    """Adds a new task to the database."""
    global next_id
    if not request.json or 'text' not in request.json:
        return jsonify({"error": "Missing 'text' in request body"}), 400

    task_text = request.json['text']
    
    # Create the new task
    new_task = {
        "id": next_id,
        "text": task_text
    }
    
    # Add to our "database" and increment the ID
    tasks_db.append(new_task)
    next_id += 1
    
    # Return the new task with a 201 (Created) status
    return jsonify(new_task), 201

# [DELETE] /api/tasks/<id>: Delete a task
@app.route('/api/tasks/<int:id>', methods=['DELETE'])
def delete_task(id):
    """Deletes a task by its ID."""
    global tasks_db
    
    # Find the task in the list
    task_to_delete = None
    for task in tasks_db:
        if task['id'] == id:
            task_to_delete = task
            break
            
    if task_to_delete:
        tasks_db.remove(task_to_delete)
        return jsonify({"message": f"Task {id} deleted"}), 200
    else:
        # If task not found, return a 404 error
        return jsonify({"error": "Task not found"}), 404

# --- Run the App ---

if __name__ == '__main__':
    # Run in debug mode for development
    # The server will be at http://127.0.0.1:5000
    app.run(debug=True, port=5000)