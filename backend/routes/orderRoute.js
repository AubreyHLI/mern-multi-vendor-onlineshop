const express = require("express");
const router = express.Router();

// controllers
const {
   createOrders,
   getUserAllOrders,
   getOrderStatusHistory,

   getShopAllOrders,
} = require('../controllers/orderController');

// middlewares
const { verifyShopToken, verifyToken } = require('../middlewares/auth');

router.post('/createOrders', verifyToken, createOrders);
router.get('/getUserOrders', verifyToken, getUserAllOrders);
router.get('/getOrderStatusHistory/:id', verifyToken, getOrderStatusHistory);

router.get('/getShopOrders', verifyShopToken, getShopAllOrders);

module.exports = router;