const CustomErrorClass = require('../utils/CustomErrorClass');
const asyncHandler = require('./asyncHandler');
const jwt = require('jsonwebtoken');

const verifyToken = asyncHandler( async(req, res, next) => {
    try{
        let token = req.header("Authorization");
        console.log('token:', token);
        if(!token) {
            return next(new CustomErrorClass(403, '访问受限！请先登录用户账号'));
        }
        if(token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft();
        }
        const verifiedUser = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verifiedUser;
        next();
    } catch(error) {
        if(error.name === "TokenExpiredError") {
            return next(new CustomErrorClass(400, "账号信息已过期, 请重新登陆"));
        } else {
            return next(new CustomErrorClass(500, error.message));
        }
    }
})

const verifyShopToken = asyncHandler( async(req, res, next) => {
    try{
        let shopToken = req.header("ShopAuthorization");
        if(!shopToken) {
            return next(new CustomErrorClass(403, '访问受限！请先登录店铺账号'));
        }
        if(shopToken.startsWith("Bearer ")) {
            shopToken = shopToken.slice(7, shopToken.length).trimLeft();
        }
        const verifiedShop = jwt.verify(shopToken, process.env.JWT_SECRET);
        req.shop = verifiedShop;
        next();
    } catch(error) {
        if(error.name === "TokenExpiredError") {
            return next(new CustomErrorClass(400, "账号信息已过期, 请重新登陆"));
        } else {
            return next(new CustomErrorClass(500, error.message));
        }
    }
})



module.exports = {
    verifyToken,
    verifyShopToken,
}