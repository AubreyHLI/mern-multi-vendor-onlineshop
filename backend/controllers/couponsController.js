const Coupon = require('../models/couponModel');
const CustomErrorClass = require('../utils/CustomErrorClass');
const asyncHandler = require('../middlewares/asyncHandler');

// Get coupons of a shop
const getShopCoupons = asyncHandler( async(req, res, next) => { 
    const shopCoupons = await Coupon.find({shopId: req.shop.id}).sort({ createdAt: -1 });
    res.status(200).json({
        success: true,
        shopCoupons,
    });
})

// Create coupon
const createNewCoupon = asyncHandler( async (req, res, next) => {
    const shopId = req.shop.id;
    const {code, name, type, discountPercentage, discountPrice, lowerLimit, beginsDate, expiresDate} = req.body;
    
    const isCouponCodeExists = await Coupon.find({code, shopId});
    if (isCouponCodeExists.length !== 0) {
        return next(new CustomErrorClass(400, "该优惠券代码已存在，请重新输入！"));
    }
    // else
    if(!['percentage', 'fixedAmount', 'cartLevel', 'newCustomer'].includes(type)) {
        return next(new CustomErrorClass(400, "此优惠券类型无效!"));
    };
    // else
    const parsedBeginsDate = new Date(beginsDate); 
    const parsedExpiresDate = new Date(expiresDate);    
    const coupon = await Coupon.create({
        shopId, 
        code, 
        name, 
        type, 
        lowerLimit,
        beginsAt: parsedBeginsDate,
        expiresAt: parsedExpiresDate,
    }); 
    switch (type) {
        case 'fixedAmount':
            coupon.discountPrice = discountPrice;
            break;
        case 'percentage':
            coupon.discountPercentage = discountPercentage;
            break;
        default: break;
    } 
    await coupon.save();


    res.status(201).json({
        success: true,
        message: "Coupon created successfully!",
    });
});




// export
module.exports = {
    getShopCoupons,
    createNewCoupon,
}