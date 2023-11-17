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

   getShopAllOrders,
   updateOrderStatus,
   
} = require('../controllers/orderController');

// middlewares
const { verifyShopToken, verifyToken } = require('../middlewares/auth');

router.post('/createOrders', verifyToken, createOrders);
router.get('/getUserOrders', verifyToken, getUserAllOrders);
router.get('/getOrderStatusHistory/:id', verifyToken, getOrderStatusHistory);
router.patch('/updateShippingAddress/:id', verifyToken, updateOrderAddress);
router.post('/confirmOrder/:id', verifyToken, confirmReceiveOrder);
router.post('/cancelOrder/:id', verifyToken, verifyShopToken, cancelOrder);

router.get('/getShopOrders', verifyShopToken, getShopAllOrders);
router.patch('/updateOrderStatus/:id', verifyShopToken, updateOrderStatus);


module.exports = router;