const Attendance = require('../models/Attendance');

// ✅ Check-In
const checkIn = async (req, res) => {
  const existingRecord = await Attendance.findOne({
    user: req.user._id,
    date: {
      $gte: new Date().setHours(0, 0, 0, 0),
      $lte: new Date().setHours(23, 59, 59, 999),
    },
  });

  if (existingRecord) {
    return res.status(400).json({ message: 'Already checked in today' });
  }

  const attendance = new Attendance({
    user: req.user._id,
    checkInTime: new Date(),
  });

  const created = await attendance.save();
  res.status(201).json(created);
};

// ✅ Check-Out
const checkOut = async (req, res) => {
  const today = await Attendance.findOne({
    user: req.user._id,
    date: {
      $gte: new Date().setHours(0, 0, 0, 0),
      $lte: new Date().setHours(23, 59, 59, 999),
    },
  });

  if (!today) {
    return res.status(404).json({ message: 'No check-in found for today' });
  }

  if (today.checkOutTime) {
    return res.status(400).json({ message: 'Already checked out' });
  }

  today.checkOutTime = new Date();
  const updated = await today.save();
  res.status(200).json(updated);
};

module.exports = {
  checkIn,
  checkOut,
};
