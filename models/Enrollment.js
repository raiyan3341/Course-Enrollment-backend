const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  enrolledAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['active', 'completed', 'dropped'], default: 'active' },
  currentLesson: { type: Number, default: 0 },
  progressPercentage: { type: Number, default: 0 },
  marks: {
    quiz1: { type: Number, default: 0 },
    quiz2: { type: Number, default: 0 },
    finalExam: { type: Number, default: 0 }
  },
  totalScore: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Enrollment', enrollmentSchema);
