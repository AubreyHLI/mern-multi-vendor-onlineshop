const express = require("express");
const router = express.Router();

// controllers
const {
   createOrders,
   getUserAllOrders,

   getShopAllOrders,
} = require('../controllers/orderController');

// middlewares
const { verifyShopToken, verifyToken } = require('../middlewares/auth');

router.post('/createOrders', verifyToken, createOrders);
router.get('/getUserOrders', verifyToken, getUserAllOrders);

router.get('/getShopOrders', verifyShopToken, getUserAllOrders);

module.exports = router;