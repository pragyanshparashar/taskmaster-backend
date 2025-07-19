const express = require('express');
const router = express.Router();
const { applyLeave, getMyLeaves } = require('../controllers/leaveController');
const { protect } = require('../middleware/authMiddleware');

router.post('/apply', protect, applyLeave);
router.get('/my-leaves', protect, getMyLeaves);

module.exports = router;

