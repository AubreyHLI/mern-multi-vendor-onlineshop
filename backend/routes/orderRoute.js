const express = require("express");
const router = express.Router();

// controllers
const {
   createOrders
} = require('../controllers/orderController');

// middlewares
const { verifyShopToken, verifyToken } = require('../middlewares/auth');

router.post('/createOrders', verifyToken, createOrders);


module.exports = router;