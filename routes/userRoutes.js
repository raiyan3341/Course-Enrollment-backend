const express = require('express');
const router = express.Router();
const { getUserProfile, updateUserProfile, getUserEnrollments } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);
router.get('/enrollments', protect, getUserEnrollments);

module.exports = router;
