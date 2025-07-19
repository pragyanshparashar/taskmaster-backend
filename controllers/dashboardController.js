const User = require('../models/userModel');
const Task = require('../models/taskModel');
const Attendance = require('../models/attendanceModel');
const Leave = require('../models/leaveModel');

const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalTasks = await Task.countDocuments();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const todaysAttendanceCount = await Attendance.countDocuments({
      date: { $gte: today, $lt: tomorrow }
    });

    const totalPendingLeaves = await Leave.countDocuments({ status: 'Pending' });

    res.status(200).json({
      totalUsers,
      totalTasks,
      todaysAttendanceCount,
      totalPendingLeaves
    });

  } catch (error) {
    console.error('Dashboard Stats Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getDashboardStats };
