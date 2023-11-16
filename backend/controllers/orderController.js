const { Order } = require('../models/orderModel');
const Cart = require('../models/cartModel');
const StatusDetail = require('../models/statusDetailModel');
const CustomErrorClass = require('../utils/CustomErrorClass');
const asyncHandler = require('../middlewares/asyncHandler');

const createOrders = asyncHandler(async(req, res, next) => { 
    const { orders, shippingAddress, shipping, paymentInfo } = req.body;
    
    for(const order of orders) {
        const newOrder = await Order.create({
            _customer: req.user.id,
            shop: order?.shop,
            orderDetails: order?.items,
            paymentInfo,
            checkoutSummary: {
                subTotalPrice: order?.subTotal,
                discount: order?.discount,
                totalPrice: order?.total,
                shipping,
            },
            shippingAddress,
        });
        const newStatusDetail = await StatusDetail.create({orderId: newOrder?._id, statusHistory: { status: 'Processing' }});
        newOrder.statusDetail = newStatusDetail._id;
        await newOrder.save();
    };
    
    // clear cart
    const cart = await Cart.findOneAndUpdate({_userId: req.user.id}, {$set: {cartDetails: []}}, {new:true});

    res.status(201).json({
		success: true,
		message: "Order created successfully!",
	});
})


// get all orders of user
const getUserAllOrders = asyncHandler(async (req, res, next) => {
	const orders = await Order.find({ "_customer": req.user.id }).sort({
		createdAt: -1,
	});
	res.status(200).json({
		success: true,
		orders,
	});
})

const getOrderStatusHistory = asyncHandler(async (req, res, next) => {
	const statusDetail = await StatusDetail.findById(req.params.id);
	res.status(200).json({
		success: true,
		statusDetail,
	});
})

// get all orders of shop
const getShopAllOrders = asyncHandler(async (req, res, next) => {
	const orders = await Order.find({ "shop._id": req.shop.id })
        .populate({
            path: '_customer',
            select: '_id name'
        })
        .sort({createdAt: -1});
	res.status(200).json({
		success: true,
		orders,
	});
})


module.exports = {
    createOrders,
    getUserAllOrders,
    getOrderStatusHistory,

    getShopAllOrders,
}