const Cart = require('../models/cartModel');
const CustomErrorClass = require('../utils/CustomErrorClass');
const asyncHandler = require('../middlewares/asyncHandler');
const mongoose = require("mongoose");

// shopping cart
const getCart = asyncHandler(async (req, res, next) => {
    const cart = await Cart.findOne({_userId: req.user.id})
        .select('cartDetails')
        .populate([{
            path: 'cartDetails.shop',
            select: '_id name'
        },{
            path: 'cartDetails.items.product',
            select: '_id name originalPrice discountPrice images stock',
        }])
    res.status(200).json({
        success: true,
        cart,
    });
})

const addToCart = asyncHandler(async (req, res, next) => {
    const { shopId, productId, qty } = req.body;
    const cart = await Cart.findOne({_userId: req.user.id});
    const existsShop = cart.cartDetails.find(shopCart => shopCart?.shop == shopId);
    if(existsShop) {
        const existsProduct = existsShop.items.find(item => item.product == productId);
        if (existsProduct) {
            existsProduct.qty += qty;
        } else {
            existsShop.items.push({
                product: productId,
                qty,
            })
        }
    } else {
        cart.cartDetails.push({
            shop: shopId,
            items: {
                product: productId,
                qty,
            }
        });
    }
    await cart.save();
    
    res.status(201).json({
        success: true,
        message:'Item added to cart successfully!'
    });
})


const removeFromCart = asyncHandler(async (req, res, next) => {
    const itemId = new mongoose.Types.ObjectId(req.body.itemId);
    const shopId = new mongoose.Types.ObjectId(req.body.shopId);
    const cart = await Cart.findOneAndUpdate({_userId: req.user.id}, 
        { $pull: {'cartDetails.$[elem].items': { product: itemId }}},
        { arrayFilters: [{ "elem.shop": shopId }], new: true}
    )
    let shopCart = cart.cartDetails.find(shopCart => shopCart.shop == req.body.shopId);
    if(shopCart.items.length <= 0) {
        await Cart.findOneAndUpdate({_userId: req.user.id}, {$pull: {cartDetails: {shop: shopId}}})
    }

    res.status(201).json({
        success: true,
    });
})


const updateCart = asyncHandler(async (req, res, next) => {
    const {shopId, itemId, qty} = req.body;
    const cart = await Cart.findOne({_userId: req.user.id});
    const updateShopCart = cart.cartDetails.find(shopCart => shopCart.shop == shopId)
    const updateItem = updateShopCart.items.find(item => item.product == itemId);
    updateItem.qty = qty;
    await cart.save();

    res.status(201).json({
        success: true,
    });
})

const clearCart = asyncHandler(async (req, res, next) => {
    const cart = await Cart.findOneAndUpdate({_userId: req.user.id}, {$set: {cartDetails: []}}, {new:true});

    res.status(201).json({
        success: true,
        cart,
    });
})


// export
module.exports = {
    getCart,
    addToCart,
    removeFromCart,
    updateCart,
    clearCart,
}