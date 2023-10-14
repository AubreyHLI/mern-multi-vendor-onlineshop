const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
    _userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
    wishlistDetails: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Product"
        },
    ],
});

module.exports = mongoose.model("Wishlist", wishlistSchema);
