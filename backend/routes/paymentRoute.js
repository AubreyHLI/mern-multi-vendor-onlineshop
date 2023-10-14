const express = require("express");
const router = express.Router();
const asyncHandler = require('../middlewares/asyncHandler');
const CustomErrorClass = require('../utils/CustomErrorClass');
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const { verifyToken } = require('../middlewares/auth');


// Get the stripe public api key
router.get("/config", verifyToken, asyncHandler(async (req, res, next) => {
    res.status(200).json({ 
        success: true,
        publishKey: process.env.STRIPE_API_KEY 
    });
}));


// Create payment intent
router.post("/process", verifyToken, asyncHandler(async (req, res, next) => {
    const myPayment = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: "cny",
        metadata: {
            company: "Aubrey Mern",
        },
    });
    res.status(201).json({
        success: true,
        client_secret: myPayment.client_secret,
    });
}));

module.exports = router;