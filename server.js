const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Database Connection
const connectDB = require('./config/db');
connectDB();

// ✅ Route Imports
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const teamRoutes = require('./routes/teamRoutes');
const leaveRoutes = require('./routes/leaveRoutes'); // ✅ NEW
const announcementRoutes = require('./routes/announcementRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
app.use('/api/notifications', notificationRoutes);

app.use('/api/dashboard', dashboardRoutes);

app.use('/api/attendance', attendanceRoutes);

app.use('/api/upload', uploadRoutes);

app.use('/api/announcements', announcementRoutes);

// ✅ Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/teams', teamRoutes); // ✅ Corrected: /api/team → /api/teams
app.use('/api/leaves', leaveRoutes); // ✅ NEW

// Default Route
app.get('/', (req, res) => {
  res.send('TaskMaster API is running...');
});

// Server Listener
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
