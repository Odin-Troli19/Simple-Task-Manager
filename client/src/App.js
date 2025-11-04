import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

// The API endpoint for our Flask server
const API_URL = 'http://127.0.0.1:5000/api';

function App() {
  // --- State ---
  // tasks: The list of tasks from the server
  // newTask: The text currently in the input field
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  // --- Effects ---

  // This `useEffect` hook runs once when the component mounts.
  // It's used to fetch the initial list of tasks from the server.
  useEffect(() => {
    fetchTasks();
  }, []);

  // --- API Functions ---

  // GET: Fetch all tasks from the server
  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${API_URL}/tasks`);
      setTasks(response.data); // Update the state with fetched tasks
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // POST: Add a new task
  const handleAddTask = async (e) => {
    e.preventDefault(); // Prevent default form submission
    if (newTask.trim() === '') return; // Don't add empty tasks

    try {
      const response = await axios.post(`${API_URL}/tasks`, { text: newTask });
      // Add the new task (returned from server) to our local state
      setTasks([...tasks, response.data]);
      setNewTask(''); // Clear the input field
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  // DELETE: Delete a task
  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/tasks/${id}`);
      // Filter out the deleted task from our local state
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // --- Render ---
  return (
    <div className="App">
      <h1>Task Manager</h1>

      {/* Form for adding new tasks */}
      <form className="task-form" onSubmit={handleAddTask}>
        <input
          type="text"
          placeholder="Add a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      {/* List of current tasks */}
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className="task-item">
            <span>{task.text}</span>
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;