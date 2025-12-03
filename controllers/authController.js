const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const Course = require("../models/Course");
const Enrollment = require("../models/Enrollment");

const registerUser = async (req, res) => {
  try {
    
    const { email, password, name, courseSelection, ...rest } = req.body;
    const exist = await User.findOne({ email });
    if (exist) return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    req.body.password = hashedPassword;

    const user = new User(req.body);
    await user.save();

    const course = await Course.findOne({ title: courseSelection });

    if (course) {
        await Enrollment.create({ 
            studentId: user._id, 
            courseId: course._id 
        });
        await User.findByIdAndUpdate(user._id, { $addToSet: { enrolledCourses: course._id } });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "30d" });

    res.status(201).json({ user, token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "30d" });

    res.json({ user, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    
    if (!token) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }
    
    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch(err) {
        return res.status(401).json({ message: "Not authorized, token failed" });
    }

    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { registerUser, loginUser, getProfile };