const Razorpay = require("razorpay");
require('dotenv').config(); //Loads environment variables from .env file


const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

module.exports = razorpayInstance;