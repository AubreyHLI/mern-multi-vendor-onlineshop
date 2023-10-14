const mongoose = require("mongoose");

const orderDetailSchema = new mongoose.Schema({
    _product: {
        type: mongoose.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    }
}, { versionKey: false, _id: false });


const orderSchema = new mongoose.Schema({
    _customer: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
    orderDetails: [
        {
            type: orderDetailSchema,
        }
    ],
    paymentId: {
        type: String,
    },
    priceSummary: {
        subTotalPrice: {
            type: Number,
        },
        shipping: {
            type: Number,
        },
        discount: {
            type: Number,
        },
        totalPrice:{
            type: Number,
        },
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
const OrderDetail =  mongoose.model("OrderDerail", orderDetailSchema);
module.exports = { 
    Order, 
    OrderDetail
};