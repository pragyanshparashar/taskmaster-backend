const express = require('express');
const router = express.Router();
const {
  createTeam,
  getMyTeams,
  addMemberToTeam
} = require('../controllers/teamController');
const { protect } = require('../middlewares/authMiddleware'); // assumes middleware exists

// ✅ Create a new team
router.post('/', protect, createTeam);

// ✅ Get teams created by the logged-in user
router.get('/', protect, getMyTeams);

// ✅ Add member to team
router.post('/:teamId/add-member', protect, addMemberToTeam);

module.exports = router;
