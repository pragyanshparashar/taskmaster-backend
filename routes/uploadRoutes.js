const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const { protect } = require('../middleware/authMiddleware');

// 👤 Upload profile/resume file
router.post('/', protect, upload.single('file'), (req, res) => {
  res.status(200).json({ filePath: `/uploads/${req.file.filename}` });
});

module.exports = router;
