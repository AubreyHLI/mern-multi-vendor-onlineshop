const express = require('express');
const router = express.Router();

// controllers
const {
    getShopCoupons,
    createNewCoupon,
    deleteCoupon,
    updateCoupon,
    checkCoupon,
} = require('../controllers/couponsController');

// middlewares
const { verifyShopToken, verifyToken } = require('../middlewares/auth');

// router.get('/getAllProducts', getAllProducts);
router.get('/getShopCoupons', verifyShopToken, getShopCoupons);
router.post('/createCoupon', verifyShopToken, createNewCoupon);
router.delete('/deleteCoupon/:id', verifyShopToken, deleteCoupon);
router.patch('/updateCoupon/:id', verifyShopToken, updateCoupon);
router.post('/checkCoupon/:code', verifyToken, checkCoupon);

module.exports = router;