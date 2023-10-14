const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    _userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
    cartDetails: [
        {
            product: {
                type: mongoose.Types.ObjectId,
                ref: "Product"
            },
            qty: { type: Number, },
        },
    ],
});

module.exports = mongoose.model("Cart", cartSchema);

