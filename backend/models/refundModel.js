const mongoose = require('mongoose');

const refundSchema = new mongoose.Schema({
    order: { 
        type: mongoose.Types.ObjectId,
        ref: "Order",
        required: true, 
    },
    customer: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true, 
    },
    shopId: {
        type: String,
        require: true
    },
    refundItems: [
        {
            productId: { type: String,  required: true },
            name: { type: String,  required: true },
            image: { type: String,  required: true },
            price: { type: Number, required: true },
            qty: { type: Number, required: true },
            productStatus: { type: String, required: true },
            requstedAt: {
                type: Date,
                default: Date.now,
            }
        }
    ],
}, { versionKey: false });

module.exports = mongoose.model("Refund", refundSchema);