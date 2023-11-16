const mongoose = require("mongoose");

const statusDetailSchema = new mongoose.Schema({
    orderId: { 
        type: String,  
        required: true,
    },
    statusHistory: [{
        status: { 
            type: String,  
            required: true,
        },
        description: {
            type: String,  
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        }
    }]
}, { versionKey: false });

module.exports = mongoose.model("StatusDetail", statusDetailSchema);