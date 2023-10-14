const Shop = require('../models/shopModel');
const ShopOtpVerification = require('../models/shopOtpVerificationModel');
const Product = require("../models/productModel");
const CustomErrorClass = require('../utils/CustomErrorClass');
const asyncHandler = require('../middlewares/asyncHandler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const sendEmail = require('../utils/sendEmail');

// Create a new shop
const createShop = asyncHandler( async(request, res, next) => {
    const { name, email, password, description } = request.body;
    const existShop = await Shop.findOne({ email });
    if (existShop) { 
        return next(new CustomErrorClass(400, '该邮箱已被注册，请填写新邮箱')); 
    }
    const existName = await Shop.findOne({ name });
    if(existName) {
        return next(new CustomErrorClass(400, '该店名已被使用，请填写新店铺名称')); 
    }

    // else 
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newShop = await Shop.create({ name, email, password: hashedPassword, description });
    console.log(newShop);
    // send verification email
    try {
        sendVerificationEmail(newShop);
        res.status(201).json({
            success: true, 
            shop: { 
                _id: newShop._id, 
                email 
        },
        });
    } catch(error) {
        return next(new CustomErrorClass(500, error.message));
    }
});


const sendVerificationEmail = async(shopInfo) => {
    const { _id, name, email } = shopInfo;
    const otpCode = Math.random().toFixed(6).slice(-6);
    const mailOption = {
        receiver: email,
        subject: 'Mern Supermarket 平台 - 邮箱验证',
        html: `<p>Hello ${name},</p>
            <p>感谢您注册 Mern Supermarket 店铺账号！</p>
            <p>您正在进行邮箱验证，本次验证码为: <b>${otpCode}</b>。此验证码有效期为30分钟，请及时验证。</p>
            <p>如非本人操作，请忽略此邮件。由此给您带来的不便敬请谅解! </p><br/>
            <p>The Mern Supermarket Team</p>`,
    }
    // hash the otpCode
    const salt = await bcrypt.genSalt(10);
    const hashedOtp = await bcrypt.hash(otpCode, salt);
    await ShopOtpVerification.create({
        shopId: _id,
        otp: hashedOtp,
        createdAt: Date.now(),
        expiresAt: Date.now() + 30*60*1000,
    })
    sendEmail(mailOption);
}


// Verify OTP
const verifyOtp = asyncHandler( async (request, response, next) => {
    try {
        const { shopId, otpCode } = request.body;
        if(!shopId || !otpCode) {
            return next(new CustomErrorClass(400, "验证码不能为空，请重新输入"));
        }
        // else
        const shopOtpRecords = await ShopOtpVerification.find({shopId});
        if(shopOtpRecords.length <= 0) {
            return next(new CustomErrorClass(400, "该邮箱已验证或未被注册，请直接登录或重新注册"));
        } 

        // else: shop otp records found
        const { expiresAt } = shopOtpRecords[0];
        console.log(shopOtpRecords[0]);
        const hashedOtp = shopOtpRecords[0].otp;
        if(expiresAt < Date.now()) {
            // await ShopOtpVerification.deleteMany({shopId});
            return next(new CustomErrorClass(400, "验证码已过期，请重新发送"));
        } 
        
        // else 
        const isValid = await bcrypt.compare(otpCode, hashedOtp);
        if(!isValid) {
            return next(new CustomErrorClass(400, "无效验证码，请前往邮箱获取正确验证码"));
        }

        // else: success
        const shop = await Shop.findOneAndUpdate({_id: shopId}, {isVerified: true}, {new: true});
        await ShopOtpVerification.deleteMany({shopId});
        const shopToken = jwt.sign({ id: shop._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRESIN,
        });
        response.status(200).json({
            success: true,
            shopToken,
            shop,
        })
    } catch (error) {
        return next(new CustomErrorClass(500, err.message));
    }
});


const resendVerificationEmail = asyncHandler( async(req, res, next) => { 
    const { shopId } = req.body;
    const shop = await Shop.findById(shopId);
    if(!shop) {
        return next(new CustomErrorClass(400, '该店铺不存在，请重新注册')); 
    }
    // else
    if(shop.isVerified) {
        return next(new CustomErrorClass(400, '该店铺邮箱已验证，请直接登录')); 
    }
    // else: delete existng records and resend
    await ShopOtpVerification.deleteMany({shopId});
    try {
        sendVerificationEmail(shop);
        res.status(200).json({
            success: true, 
        });
    } catch(error) {
        return next(new CustomErrorClass(500, error.message));
    }
})


// Login shop
const loginShop = asyncHandler( async (request, response, next) => {
    const { email, password } = request.body;
    const existShop = await Shop.findOne({ email }).select('+password'); 
    if(!existShop) {
        return next(new CustomErrorClass(400, "该用户不存在"));
    }
    // else
    const checkPW = await bcrypt.compare(password, existShop.password);
    if(!checkPW) {
        return next(new CustomErrorClass(400, "密码错误"));
    }
    // else
    if(!existShop.isVerified) {
        response.status(200).json({
            success: false,
            shop: { _id: existShop._id, email },
        })
    } else {
        const token = jwt.sign({ id: existShop._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRESIN,
        });
    
        delete existShop.password;  // don't sent password to frontend
    
        response.status(200).json({
            success: true, 
            shop: existShop, 
            shopToken: token
        });
    }
});


// Logout shop
const logoutShop = asyncHandler( async(request, response, next) => {
    try {
        response.status(201).json({
            success: true,
            message: "Log out successful!",
        });
    } catch (err) {
        return next(new CustomErrorClass(500, err.message));
    }
})



const getCurrentShop = asyncHandler( async(req, res, next) => {
    try {
        const shop = await Shop.findById(req.shop.id);
        res.status(200).json({
            success: true,
            shop,
        })
    } catch (error) {
        return next(new CustomErrorClass(404, error.message));
    }
})

const getSingleShopInfo = asyncHandler( async(req, res, next) => {
    try {
        const shop = await Shop.findById(req.params.id);
        const shopProducts = await Product.find({shop: req.params.id});
        res.status(200).json({
            success: true,
            shop,
            shopProducts,
        })
    } catch (error) {
        return next(new CustomErrorClass(404, error.message));
    }
})



// export
module.exports = {
    createShop,
    verifyOtp,
    resendVerificationEmail,
    loginShop,
    logoutShop,
    getCurrentShop,
    getSingleShopInfo,
}
