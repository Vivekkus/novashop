import Razorpay from 'razorpay';

let razorpay = null;

// Only initialize if keys are provided
if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET &&
    process.env.RAZORPAY_KEY_ID !== 'rzp_test_placeholder_key_id') {
    razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET
    });
    console.log('✅ Razorpay initialized');
} else {
    console.log('⚠️  Razorpay not configured - payment features will be disabled');
}

export default razorpay;
