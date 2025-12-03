
const User = require('../models/User');
const Enrollment = require('../models/Enrollment');

const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id).populate('enrolledCourses', 'title price');
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

const updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.phone = req.body.phone || user.phone;
    user.address = req.body.address || user.address;
    if (req.body.password) {
      const bcrypt = require('bcryptjs');
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);
    }
    await user.save();
    res.json({ message: 'Profile updated' });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

const getUserEnrollments = async (req, res) => {
  try {
    
    const enrollments = await Enrollment.find({ studentId: req.user._id })
      .populate({
        path: 'courseId',
        select: 'title thumbnail description price duration category lessons _id' 
      }); 
    
    const validEnrollments = enrollments.filter(e => e.courseId);

    res.json(validEnrollments);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch enrollments', error: error.message });
  }
};

module.exports = { 
  getUserProfile, 
  updateUserProfile, 
  getUserEnrollments 
};