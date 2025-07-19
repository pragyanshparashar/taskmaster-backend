const Leave = require('../models/leave');

// ✅ Apply for leave
const applyLeave = async (req, res) => {
  const { fromDate, toDate, reason } = req.body;

  const leave = new Leave({
    user: req.user._id,
    fromDate,
    toDate,
    reason,
  });

  const createdLeave = await leave.save();
  res.status(201).json(createdLeave);
};

// ✅ Get leaves for current user
const getMyLeaves = async (req, res) => {
  const leaves = await Leave.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.status(200).json(leaves);
};

module.exports = {
  applyLeave,
  getMyLeaves,
};

