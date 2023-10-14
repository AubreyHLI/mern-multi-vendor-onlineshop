const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');    // npm 的bcryct package
const jwt = require("jsonwebtoken");

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, "请填写姓名"],
    },
    email: {
        type: String,
        required: [true, "请填写电子邮箱"],
    },
    password: {
        type: String,
        required: [true, "请填写密码"],
        minLength: [6, "密码不能少于6位"],
        select: false,// not return password field info when query(select) this user
    },
    avatar: {
        public_id: { type:String, },
		url: { type:String, },
    },
    phoneNumber: {
        type: Number,
    },
    addressBook: {
        defaultAddressId: { type:String, },
        addresses: [
            {
                type: mongoose.Types.ObjectId,
                ref: "Address"
            },
        ]
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    resetPasswordToken: String,
    resetPasswordTime: Date,
});


module.exports = mongoose.model("User", UserSchema);