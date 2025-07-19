const express = require('express');
const router = express.Router();
const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');

// Routes
router.post('/', createTask);          // Create a new task
router.get('/', getTasks);             // Get all tasks or filtered ones
router.get('/:id', getTaskById);       // Get a specific task by ID
router.put('/:id', updateTask);        // Update a task
router.delete('/:id', deleteTask);     // Delete a task

module.exports = router;
