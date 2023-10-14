const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    user: { 
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
    rating: { 
        type: Number, 
    },
    comment: { 
        type: String, 
    },
    createdAt:{ 
        type: Date,  
        default: Date.now, 
    }
});

module.exports = mongoose.model("Review", reviewSchema);