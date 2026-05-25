const express = require("express");
require('dotenv').config(); //Loads environment variables from .env file
const { userAuth } = require("../middleWares/auth.js");
const paymentRouter = express.Router();
const razorpayInstance = require("../utils/razorPay.js");
const Payment = require("../models/paymentSchema.js");
const User = require("../models/userSchema.js");
const { membershipAmount } = require("../utils/constant.js");
const {
  validateWebhookSignature,
} = require("razorpay/dist/utils/razorpay-utils");


paymentRouter.post("/payment/create", userAuth, async(req, res) => {


  try {

    const { membershipType } = req.body;
    const { firstName, lastName, emailId } = req.user;

    
    const order = await razorpayInstance.orders.create({
      amount: membershipAmount[membershipType] * 100,
      currency: "INR",
      receipt: "receipt#1",
      notes: {
        firstName,
        lastName,
        emailId,
        membershipType: membershipType,
      },
    });

    // Save it in my database

    const payment = new Payment({
      userId: req.user._id,
      orderId: order.id,
      status: order.status,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      notes: order.notes,
    });

    const savedPayment = await payment.save();
    // console.log("Chalo Wapas: ", savedPayment);

    // Return back my order details to frontend
    res.json({ ...savedPayment.toJSON(), keyId: process.env.RAZORPAY_KEY_ID });
  } catch (err) {
  console.log(err);
  return res.status(500).json({ msg: err.message });
}
});

paymentRouter.post("/payment/webhook", async (req, res) => {
  try {

    // console.log("Webhook Called");

/*
When Razorpay sends a webhook request to your backend: (Razorpay Server  --->  Your Backend) it sends: request body, headers
One header is: X-Razorpay-Signature
This signature is used for:
1]. security
2]. verification

To check:
(Did this webhook really come from Razorpay?
Or from some hacker/fake request?)
*/
    const webhookSignature = req.get("X-Razorpay-Signature");
    // console.log("Webhook Signature", webhookSignature);

    const isWebhookValid = validateWebhookSignature(
      JSON.stringify(req.body),
      webhookSignature,
      process.env.RAZORPAY_WEBHOOK_SECRET,
    );

    if (!isWebhookValid) {
      console.log("Invalid Webhook Signature");
      return res.status(400).json({ msg: "Webhook signature is invalid" });
    }
    // console.log("Valid Webhook Signature");

    // Udpate my payment Status in DB
    const paymentDetails = req.body.payload.payment.entity;

    const payment = await Payment.findOne({ orderId: paymentDetails.order_id });
    payment.status= paymentDetails.status;
    await payment.save();
    // console.log("Payment saved");

    const user = await User.findOne({ _id: payment.userId });
    user.isPremium = true;
    user.membershipType = payment.notes.membershipType;
    // console.log("User saved");

    await user.save();

    // Update the user as premium

    // if (req.body.event == "payment.captured") {
    // }
    // if (req.body.event == "payment.failed") {
    // }

    // return success response to razorpay

    return res.status(200).json({ msg: "Webhook received successfully" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

paymentRouter.get("/premium/verify", userAuth, async (req, res) => {
  
  const user = req.user.toJSON();
  user.isPremium= false;

  if (user.isPremium) {
    return res.json({ ...user }); //return res.json({ isPremium: true});
  }
  return res.json({ ...user }); //return res.json({ isPremium: false});
});

module.exports = paymentRouter;
