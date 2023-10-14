const mongoose = require("mongoose");

const shopOtpVerificationSchema = new mongoose.Schema({
    shopId: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
    },
    expiresAt: {
        type: Date,
    },
});

module.exports = mongoose.model("ShopOTPVerification", shopOtpVerificationSchema);