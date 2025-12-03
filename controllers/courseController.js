const Course = require('../models/Course');

const createCourse = async (req, res) => {
  const { title, category, instructor, description, price, duration, thumbnail } = req.body;
  const course = await Course.create({ title, category, instructor, description, price, duration, thumbnail });
  res.status(201).json(course);
};

const getCourses = async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
};

const getCourseById = async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (course) res.json(course);
  else res.status(404).json({ message: 'Course not found' });
};

const updateCourse = async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) return res.status(404).json({ message: 'Course not found' });
  Object.assign(course, req.body);
  await course.save();
  res.json(course);
};

const deleteCourse = async (req, res) => {
  const course = await Course.findByIdAndDelete(req.params.id);
  if (course) res.json({ message: 'Course deleted' });
  else res.status(404).json({ message: 'Course not found' });
};

module.exports = { createCourse, getCourses, getCourseById, updateCourse, deleteCourse };