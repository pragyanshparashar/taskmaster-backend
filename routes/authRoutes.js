// routes/authRoutes.js
const express = require('express');
const router = express.Router();

const {
  registerUser,
  loginUser,
  getUserProfile,
} = require('../controllers/authController');

const { protect } = require('../middleware/authMiddleware');

// Public Routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected Route (Requires valid JWT)
router.get('/profile', protect, getUserProfile);

module.exports = router;



