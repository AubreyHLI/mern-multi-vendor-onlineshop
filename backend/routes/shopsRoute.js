const express = require('express');
const router = express.Router();

// controllers
const {
    createShop,
    verifyOtp,
    resendVerificationEmail,
    loginShop,
    logoutShop,
    getCurrentShop,
    getSingleShopInfo,
    updateShopInfo
} = require('../controllers/shopsController');

// middlewares
const { verifyShopToken } = require('../middlewares/auth');
const { upload } = require("../middlewares/multer");

router.post("/signup", createShop);
router.post("/verifyOtp", verifyOtp);
router.post("/resendEmail", resendVerificationEmail);
router.post("/login", loginShop);
router.get("/logout", logoutShop);
router.get("/getShop", verifyShopToken, getCurrentShop);
router.get("/getShopInfo/:id", getSingleShopInfo);
router.patch('/updateShopInfo', verifyShopToken, upload.single("avatar"), updateShopInfo);


module.exports = router;