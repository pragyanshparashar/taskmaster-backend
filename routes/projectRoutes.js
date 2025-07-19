const express = require('express');
const router = express.Router();
const {
  createProject,
  getAllProjects,
  getProjectById,
  getProjectsByTeamId,
  updateProject,
  deleteProject
} = require('../controllers/projectController');

// Create a new project
router.post('/', createProject);

// Get all projects
router.get('/', getAllProjects);

// Get project by ID
router.get('/:id', getProjectById);

// Get projects by team ID
router.get('/team/:teamId', getProjectsByTeamId);

// Update project
router.put('/:id', updateProject);

// Delete project
router.delete('/:id', deleteProject);

module.exports = router;
