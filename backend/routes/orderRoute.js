const express = require("express");
const router = express.Router();

// controllers
const {
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
} = require('../controllers/orderController');

// middlewares
const { verifyShopToken, verifyToken } = require('../middlewares/auth');

router.post('/createOrders', verifyToken, createOrders);
router.get('/getUserOrders', verifyToken, getUserAllOrders);
router.get('/getOrderStatusHistory/:id', verifyToken, getOrderStatusHistory);
router.patch('/updateShippingAddress/:id', verifyToken, updateOrderAddress);
router.post('/confirmOrder/:id', verifyToken, confirmReceiveOrder);
router.post('/cancelOrder/:id', verifyToken, verifyShopToken, cancelOrder);
router.post('/itemRefund', verifyToken, requestItemRefund);

router.get('/getShopOrders', verifyShopToken, getShopAllOrders);
router.get('/getShopRefunds', verifyShopToken, getShopRefundOrders);
router.patch('/updateOrderStatus/:id', verifyShopToken, updateOrderStatus);
router.post('/acceptRefund', verifyShopToken, acceptRefundRequest);


module.exports = router;