const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Enrollment = require('../models/Enrollment');
const User = require('../models/User');


const createPaymentIntent = async (req, res) => {

  const { amount, courseId } = req.body; 
  
  if (!req.user) return res.status(401).json({ message: 'User not authenticated' });
  
  try {

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, 
      currency: 'usd',
      metadata: { 
        studentId: req.user._id.toString(),
        courseId: courseId
      },
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Stripe PaymentIntent Creation Error:", error);
    res.status(500).json({ message: 'Payment initiation failed', error: error.message });
  }
};

const confirmEnrollmentAfterPayment = async (req, res) => {
    const { courseId, paymentIntentId } = req.body;
    const studentId = req.user._id;

    const exists = await Enrollment.findOne({ studentId, courseId });
    if (exists) return res.status(400).json({ message: 'You are already enrolled.' });

    try {

        const enrollment = await Enrollment.create({ 
            studentId, 
            courseId,
            status: 'active',
            paymentOption: 'card (Stripe)', 
            transactionId: paymentIntentId 
        });
        
        await User.findByIdAndUpdate(studentId, { $addToSet: { enrolledCourses: courseId } });
        
        res.json({ message: 'Enrollment successful!', enrollment });
        
    } catch (err) {
        console.error("Enrollment Confirmation Error:", err);
        res.status(500).json({ message: 'Enrollment confirmation failed', error: err.message });
    }
}

module.exports = { createPaymentIntent, confirmEnrollmentAfterPayment };