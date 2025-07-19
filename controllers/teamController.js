const Team = require('../models/Team');
const User = require('../models/user');

// ✅ Create a new team
const createTeam = async (req, res) => {
  try {
    const { name, description, members } = req.body;

    const team = new Team({
      name,
      description,
      createdBy: req.user.id,
      members: [req.user.id, ...(members || [])],
    });

    const savedTeam = await team.save();
    res.status(201).json(savedTeam);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create team', error: error.message });
  }
};

// ✅ Get all teams created by logged-in user
const getMyTeams = async (req, res) => {
  try {
    const teams = await Team.find({ createdBy: req.user.id }).populate('members', 'name email');
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch teams', error: error.message });
  }
};

// ✅ Add a member to the team
const addMemberToTeam = async (req, res) => {
  try {
    const { teamId } = req.params;
    const { memberId } = req.body;

    const team = await Team.findById(teamId);

    if (!team) return res.status(404).json({ message: 'Team not found' });

    if (!team.members.includes(memberId)) {
      team.members.push(memberId);
      await team.save();
    }

    res.json(team);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add member', error: error.message });
  }
};

module.exports = {
  createTeam,
  getMyTeams,
  addMemberToTeam,
};
