const Order = require('../models/orderModel');
const Cart = require('../models/cartModel');
const StatusDetail = require('../models/statusDetailModel');
const Product = require('../models/productModel');
const Refund = require('../models/refundModel');
const CustomErrorClass = require('../utils/CustomErrorClass');
const asyncHandler = require('../middlewares/asyncHandler');
const mongoose = require("mongoose");

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
    if (existsOrder.status === "Cancelled") {
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
    if(existsOrder.paymentInfo?.status === 'succeeded') {
        existsOrder.paymentInfo.status = 'refunded';
    }
    await existsOrder.save();

    res.status(200).json({
		success: true,
		message: "Order Updated successfully!"
	});
})

const requestItemRefund = asyncHandler(async (req, res, next) => {
    const existsOrder = await Order.findById(req.body.orderId);
    if (!existsOrder) {
		return next(new CustomErrorClass(400, "Order not found with this id"));
	}
    if (existsOrder.status === 'Cancelled') {
		return next(new CustomErrorClass(400, "订单已结束交易，无法申请退款"));
	}
    if (existsOrder.status === 'Archived') {
		return next(new CustomErrorClass(400, "订单已确认收货，无法申请退款"));
	}
    const product = existsOrder.orderDetails.find(item => item.productId === req.body.productId);
    if(!product) {
        return next(new CustomErrorClass(400, "订单不包含该商品，无法申请退款"));
    }
    if(product?.productStatus === 'Refunded') {
        return next(new CustomErrorClass(400, "该商品已退款成功，无法再次申请退款"));
    }
    if(product.productStatus === 'Processing refund') {
        return next(new CustomErrorClass(400, "该商品退款正在处理中，请耐心等待"));
    }
    
    product.productStatus = 'Processing refund';

    const refund = await Refund.findOne({order: existsOrder._id});
    if(!refund) {
        await Refund.create({
            order: existsOrder._id,
            refundItems: product,
            customer: req.user.id,
            shopId: existsOrder.shop._id
        });
    } else {
        refund.refundItems.push(product);
        await refund.save()
    }
    await existsOrder.save();

    res.status(200).json({
		success: true,
		message: "Refund request sent",
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
        for (const item of existsOrder.orderDetails) {
            const product = await Product.findById(item.productId);
            product.stock -= item.qty;
            product.sold_out += item.qty;
            await product.save();
            item.productStatus = 'Shipped';
        }
        // await existsOrder.save();
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

const getShopRefundOrders = asyncHandler(async (req, res, next) => {
    const refundOrders = await Refund.find({shopId: req.shop.id})
        .populate([{
            path: 'customer',
            select: '_id name'
        }, {
            path: 'order',
            select: '_id status createdAt paymentInfo'
        }]);
	res.status(200).json({
		success: true,
		refunds: refundOrders
	});
})

const acceptRefundRequest =  asyncHandler(async (req, res, next) => {
    const productId = new mongoose.Types.ObjectId(req.body.productId);
    const orderId = new mongoose.Types.ObjectId(req.body.orderId);

    const existsOrder = await Order.findById(orderId);
	if (!existsOrder) {
		return next(new CustomErrorClass(400, "Order not found with this id"));
	}
    if (existsOrder.shop._id != req.shop.id) {
        return next(new CustomErrorClass(400, "权限限制，无法修改其他店铺的订单状态"));
    }

    const refundedItemsCount = existsOrder?.orderDetails?.reduce((acc, item) => {
        if(item.productId == productId) {
            item.productStatus = 'Refunded';
        }
        if(item.productStatus === 'Refunded') {
            return acc += 1
        }
    }, 0);
    if(refundedItemsCount === existsOrder?.orderDetails?.length) {
        existsOrder.status = 'Refunded Success';
    }
    await existsOrder.save();

    // return back stock
    const product = await Product.findById(productId);
    const productItem = existsOrder?.orderDetails?.find(item => item.productId == productId);
    product.stock += productItem.qty;
    product.sold_out -= productItem.qty;
    await product.save();

    // update refundRecord
    const refundOrder = await Refund.findOneAndUpdate({order: orderId}, 
        { $set: {"refundItems.$[elem].productStatus": 'Refunded'} },
        { arrayFilters: [{ "elem.productId":  req.body.productId+''}], new: true }
    );
    console.log(refundOrder)

	res.status(200).json({
		success: true,
		message: "Order Refund successfully!",
	});
})


module.exports = {
    createOrders,
    getUserAllOrders,
    getOrderStatusHistory,
    updateOrderAddress,
    confirmReceiveOrder,
    cancelOrder,
    requestItemRefund,

    getShopAllOrders,
    updateOrderStatus,
    getShopRefundOrders,
    acceptRefundRequest,
}