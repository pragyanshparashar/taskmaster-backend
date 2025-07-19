const Project = require('../models/project');

// @desc    Create a new project
// @route   POST /api/projects
exports.createProject = async (req, res) => {
  try {
    const { name, description, team, createdBy, deadline } = req.body;

    const project = await Project.create({
      name,
      description,
      team,
      createdBy,
      deadline
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create project', details: error.message });
  }
};

// @desc    Get all projects
// @route   GET /api/projects
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate('team').populate('createdBy');
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch projects', details: error.message });
  }
};

// @desc    Get project by ID
// @route   GET /api/projects/:id
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate('team').populate('createdBy');
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch project', details: error.message });
  }
};

// @desc    Get all projects by Team ID
// @route   GET /api/projects/team/:teamId
exports.getProjectsByTeamId = async (req, res) => {
  try {
    const projects = await Project.find({ team: req.params.teamId }).populate('createdBy');
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch team projects', details: error.message });
  }
};

// @desc    Update a project
// @route   PUT /api/projects/:id
exports.updateProject = async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    if (!updatedProject) return res.status(404).json({ error: 'Project not found' });
    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update project', details: error.message });
  }
};

// @desc    Delete a project
// @route   DELETE /api/projects/:id
exports.deleteProject = async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Project not found' });
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete project', details: error.message });
  }
};
