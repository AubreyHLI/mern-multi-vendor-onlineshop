const mongoose = require("mongoose");

const shopSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "请填写店铺名"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "请填写电子邮箱"],
    },
    password: {
        type: String,
        required: [true, "请填写密码"],
        minLength: [6, "密码不能少于6位"],
        select: false,
    },
    avatar: {
        public_id: { type:String, },
        url: { type:String, },
    },
    description: {
        type: String,
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Shop", shopSchema);