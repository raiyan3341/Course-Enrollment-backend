const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { 
    createPaymentIntent, 
    confirmEnrollmentAfterPayment 
} = require('../controllers/paymentController');

const router = express.Router();

router.post('/create-payment-intent', protect, createPaymentIntent); 

router.post('/confirm-enrollment', protect, confirmEnrollmentAfterPayment); 

module.exports = router;