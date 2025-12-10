require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const courseRoutes = require('./routes/courseRoutes');
const enrollmentRoutes = require('./routes/enrollmentRoutes');
const paymentRoutes = require('./routes/paymentRoutes'); // পেমেন্ট রুট যোগ করা হয়েছে

const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const app = express();

connectDB();

app.use(express.json({ limit: '10mb' }));
app.use(morgan('dev'));
app.use(cors()); 


app.get('/', (req, res) => {
    res.send('Course Enrollment API is running successfully!'); 
});

app.get('/api', (req, res) => {
    res.json({ message: 'Welcome to the Course Enrollment API v1.0' });
});


app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/payments', paymentRoutes);


app.use(notFound);
app.use(errorHandler);


module.exports = app;