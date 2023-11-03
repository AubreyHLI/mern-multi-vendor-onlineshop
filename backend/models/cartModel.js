const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    _userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
    cartDetails: [{
        _id: false,
        shop: {
            type: mongoose.Types.ObjectId,
            ref: "Shop",
            required: true,
        },
        items: [{
            _id: false,
            product: {
                type: mongoose.Types.ObjectId,
                ref: "Product"
            },
            qty: { type: Number, },
        }]
    }],
}, {versionKey: false});

module.exports = mongoose.model("Cart", cartSchema);

