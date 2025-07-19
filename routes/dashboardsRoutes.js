const express = require('express');
const router = express.Router();
const { getDashboardStats } = require('../controllers/dashboardController');
const { protect } = require('../middleware/authMiddleware');

// 🔒 Protected dashboard stats route
router.get('/stats', protect, getDashboardStats);

module.exports = router;
