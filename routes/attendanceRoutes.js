const express = require('express');
const router = express.Router();
const { checkIn, checkOut } = require('../controllers/attendanceController');
const { protect } = require('../middleware/authMiddleware');

router.post('/checkin', protect, checkIn);
router.post('/checkout', protect, checkOut);

module.exports = router;
