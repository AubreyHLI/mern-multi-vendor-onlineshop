const express = require('express');
const router = express.Router();

// controllers
const {
    getShopCoupons,
    createNewCoupon,
    deleteCoupon,
    updateCoupon,
} = require('../controllers/couponsController');

// middlewares
const { verifyShopToken } = require('../middlewares/auth');

// router.get('/getAllProducts', getAllProducts);
router.get('/getShopCoupons', verifyShopToken, getShopCoupons);
router.post('/createCoupon', verifyShopToken, createNewCoupon);
router.delete('/deleteCoupon/:id', verifyShopToken, deleteCoupon);
router.patch('/updateCoupon/:id', verifyShopToken, updateCoupon);

module.exports = router;