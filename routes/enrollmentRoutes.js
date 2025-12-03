const express = require('express');
const router = express.Router();
const { enrollCourse, getEnrollment, updateProgress } = require('../controllers/enrollmentController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, enrollCourse);
router.get('/:id', protect, getEnrollment);
router.put('/:id/progress', protect, updateProgress);

module.exports = router;
