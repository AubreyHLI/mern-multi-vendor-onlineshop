const mongoose = require("mongoose");

const orderDetailSchema = new mongoose.Schema({
    productId: { type: String,  required: true },
    name: { type: String,  required: true },
    image: { type: String,  required: true },
    price: { type: Number, required: true },
    qty: { type: Number, required: true },
    isReviewed: { type: Boolean, default:false }
}, { versionKey: false, _id: false });


const orderSchema = new mongoose.Schema({
    _customer: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
    orderDetails: [{
        type: orderDetailSchema,
    }],
    paymentInfo: {
        id: { type: String },
        status: { type: String },
        type: { type: String },
    },
    checkoutSummary: {
        subTotalPrice: { type: Number },
        shipping: { type: Number },
        discount: { type: Number },
        totalPrice: { type: Number },
    },
    shippingAddress:{
        type: Object,
        required: true,
    },
    status:{
        type: String,
        default: "Processing",
    },
    deliveredAt: {
        type: Date,
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },
});

const Order =  mongoose.model("Order", orderSchema);
const OrderDetail =  mongoose.model("OrderDetail", orderDetailSchema);
module.exports = { 
    Order, 
    OrderDetail
};