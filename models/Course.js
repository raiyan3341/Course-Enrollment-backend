const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  contentUrl: { type: String },
  duration: { type: String },
  order: { type: Number },

});

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String },
  instructor: { type: String },
  description: { type: String },
  price: { type: Number, default: 0 },
  duration: { type: String },
  thumbnail: { type: String },
  lessons: [lessonSchema],
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
