const express = require('express');
const router = express.Router();

// controllers
const {
    getShopCoupons,
    createNewCoupon,
} = require('../controllers/couponsController');

// middlewares
const { verifyShopToken } = require('../middlewares/auth');

// router.get('/getAllProducts', getAllProducts);
router.get('/getShopCoupons', verifyShopToken, getShopCoupons);
router.post('/createCoupon', verifyShopToken, createNewCoupon);
// router.delete('/deleteProduct/:id', verifyShopToken, deleteProduct);
// router.patch('/updateProduct/:id', verifyShopToken, upload.array("newImages"), updateProduct);


module.exports = router;