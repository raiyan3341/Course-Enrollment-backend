const Enrollment = require('../models/Enrollment');
const User = require('../models/User');
const Course = require('../models/Course');

const enrollCourse = async (req, res) => {
  const { courseId } = req.body;
  const studentId = req.user._id;

  const exists = await Enrollment.findOne({ studentId, courseId });
  if (exists) return res.status(400).json({ message: 'Already enrolled' });

  const course = await Course.findById(courseId);
  if (!course) return res.status(404).json({ message: 'Course not found' });

  const enrollment = await Enrollment.create({ studentId, courseId });

  await User.findByIdAndUpdate(studentId, { $addToSet: { enrolledCourses: courseId } });

  res.status(201).json(enrollment);
};


const getEnrollment = async (req, res) => {
  const enrollment = await Enrollment.findById(req.params.id)
    .populate('studentId', 'name email studentId') 
    .populate('courseId', 'title');

  if (enrollment) res.json(enrollment);
  else res.status(404).json({ message: 'Enrollment not found' });
};

const updateProgress = async (req, res) => {
  const { id } = req.params; 
  const { currentLesson, progressPercentage, marks } = req.body;
  const enrollment = await Enrollment.findById(id);

  if (!enrollment) return res.status(404).json({ message: 'Enrollment not found' });

  if (typeof currentLesson !== 'undefined') enrollment.currentLesson = currentLesson;
  if (typeof progressPercentage !== 'undefined') enrollment.progressPercentage = progressPercentage;
  

  if (marks) enrollment.marks = { ...enrollment.marks, ...marks };


  if (enrollment.marks) {
    const { quiz1 = 0, quiz2 = 0, finalExam = 0 } = enrollment.marks;
    enrollment.totalScore = quiz1 + quiz2 + finalExam;
  }

  await enrollment.save();

  const enrollments = await Enrollment.find({ studentId: enrollment.studentId });
  let totalPercent = 0;
  enrollments.forEach(e => totalPercent += (e.progressPercentage || 0));
  const avgPercent = enrollments.length ? Math.round(totalPercent / enrollments.length) : 0;
  
  await User.findByIdAndUpdate(enrollment.studentId, { progress: avgPercent });

  res.json(enrollment);
};

module.exports = {
  enrollCourse,
  getEnrollment,
  updateProgress
};