const { Order } = require('../models/orderModel');
const Cart = require('../models/cartModel');
const StatusDetail = require('../models/statusDetailModel');
const Product = require('../models/productModel');
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

const updateOrderAddress = asyncHandler(async (req, res, next) => {
    const existsOrder = await Order.findById(req.params.id);
	if (!existsOrder) {
		return next(new CustomErrorClass(400, "Order not found with this id"));
	}
    if (existsOrder._customer != req.user.id) {
        return next(new CustomErrorClass(400, "权限限制，无法修改他人订单地址"));
    }
	if (existsOrder.status !== "Processing") {
		return next(new CustomErrorClass(400, "订单已发货，无法修改地址"));
	}
    // else
    existsOrder.shippingAddress = req.body.address;
    await existsOrder.save();
    res.status(200).json({
		success: true,
		message: "Order ShippingAddress Updated successfully!"
	});
})

const confirmReceiveOrder = asyncHandler(async (req, res, next) => {
    const existsOrder = await Order.findById(req.params.id);
	if (!existsOrder) {
		return next(new CustomErrorClass(400, "Order not found with this id"));
	}
    if (existsOrder._customer != req.user.id) {
        return next(new CustomErrorClass(400, "权限限制，无法修改他人订单"));
    }
    if (existsOrder.paymentInfo.status !== 'succeeded') {
        return next(new CustomErrorClass(400, "买家未付款，无法确认收货"));
    }
    if (existsOrder.status === "Processing") {
		return next(new CustomErrorClass(400, "订单未发货，无法确认收货"));
	}
    if (existsOrder.status === "Cancelled" || existsOrder.status === 'Refunded') {
		return next(new CustomErrorClass(400, "订单交易已取消，无法确认收货"));
	}
    existsOrder.status = "Archived";
    await existsOrder.save();

    res.status(200).json({
		success: true,
		message: "Order Updated successfully!"
	});
})

const cancelOrder = asyncHandler(async (req, res, next) => {
    const existsOrder = await Order.findById(req.params.id);
	if (!existsOrder) {
		return next(new CustomErrorClass(400, "Order not found with this id"));
	}
    if (existsOrder._customer != req?.user?.id && existsOrder.shop._id != req?.shop?.id) {
        return next(new CustomErrorClass(400, "权限限制，无法取消他人订单"));
    }
    if (existsOrder.status !== "Processing") {
		return next(new CustomErrorClass(400, "订单已发货，无法取消收订单"));
    }
    existsOrder.status = "Cancelled";
    await existsOrder.save();

    res.status(200).json({
		success: true,
		message: "Order Updated successfully!"
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

const updateOrderStatus = asyncHandler(async (req, res, next) => {
    const existsOrder = await Order.findById(req.params.id);
	if (!existsOrder) {
		return next(new CustomErrorClass(400, "Order not found with this id"));
	}
    if (existsOrder.shop._id != req.shop.id) {
        return next(new CustomErrorClass(400, "权限限制，无法修改其他店铺的订单状态"));
    }
    // update sold_out
	if (req.body.status === "Shipped") {
		existsOrder.orderDetails.forEach(async (item) => {
			const product = await Product.findById(item.productId);
			product.stock -= item.qty;
			product.sold_out += item.qty;
			await product.save();
		});
	}
    // update payment status
	if (req.body.status === "Delivered") {
		existsOrder.deliveredAt = Date.now();
		existsOrder.paymentInfo.status = "succeeded";
	}

    // update order status
	existsOrder.status = req.body.status;
	await existsOrder.save();

    // update order status detail history
    const statusDetail = await StatusDetail.findById(existsOrder.statusDetail);
    statusDetail.statusHistory.push({
        status: req.body.status,
        updatedAt: Date.now()
    })
    await statusDetail.save();

	res.status(200).json({
		success: true,
		message: "Order Updated successfully!"
	});
})


module.exports = {
    createOrders,
    getUserAllOrders,
    getOrderStatusHistory,
    updateOrderAddress,
    confirmReceiveOrder,

    getShopAllOrders,
    updateOrderStatus,
    cancelOrder,
}