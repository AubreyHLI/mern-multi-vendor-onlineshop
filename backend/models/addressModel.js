const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
    recipient: { 
        type: String, 
        required: [true, "请填写收件人"],
    },
    phone: { 
        type: String, 
        required: [true, "请填写收件人手机号码"],
    },
    province: { 
        type: String, 
        required: [true, "请填写省份"],
    },
    city: { 
        type: String, 
        required: [true, "请填写城市"],
    },
    district: { 
        type: String,
    },
    address1: { 
        type: String, 
        required: [true, "请填写详细地址"],
    },
});

module.exports = mongoose.model("Address", addressSchema);