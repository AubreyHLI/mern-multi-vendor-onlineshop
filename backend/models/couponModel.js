const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
    shopId: { type: String, required: true,},
    code: { type: String, required: true, },
    name: { type: String },
    type: {
        type: String, 
        enum: ['percentage', 'fixedAmount', 'cartLevel', 'newCustomer'],
        required: true,
    },
    discountPrice: { type: Number},
    discountPercentage: { type: Number},
    lowerLimit: { type: Number },
    beginsAt: { 
        type: Date,
        required: true 
    },
    expiresAt: {
        type: Date,
        required: true 
    },
}, { versionKey: false });

module.exports = mongoose.model("Coupon", couponSchema);