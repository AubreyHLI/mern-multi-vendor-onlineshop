const Cart = require('../models/cartModel');
const CustomErrorClass = require('../utils/CustomErrorClass');
const asyncHandler = require('../middlewares/asyncHandler');

// shopping cart
const getCart = asyncHandler(async (req, res, next) => {
    const cart = await Cart.findOne({_userId: req.user.id})
        .select('cartDetails')
        .populate({
            path: 'cartDetails.product',
            select: '_id name originalPrice discountPrice images stock shop',
            populate: {
                path: 'shop',
                select: '_id name'
            }
        });
    res.status(200).json({
        success: true,
        cart,
    });
})

const addToCart = asyncHandler(async (req, res, next) => {
    const { productId, qty } = req.body;
    const cart = await Cart.findOne({_userId: req.user.id});
    const existsProduct = cart.cartDetails.find(item => item.product == productId);
    if (existsProduct) {
       existsProduct.qty += qty;
    } else {
        cart.cartDetails.push({
            product: productId,
            qty,
        });
    }
    await cart.save();
    res.status(201).json({
        success: true,
        message:'Item added to cart successfully!'
    });
})


const removeFromCart = asyncHandler(async (req, res, next) => {
    const { itemId } = req.body;
    const cart = await Cart.findOneAndUpdate({_userId: req.user.id}, {$pull: {cartDetails: { product: itemId }}}, {new:true});

    res.status(201).json({
        success: true,
    });
})


const updateCart = asyncHandler(async (req, res, next) => {
    const {itemId, qty} = req.body;
    const cart = await Cart.findOne({_userId: req.user.id});
    const updateItem = cart.cartDetails.find(item => item.product == itemId);
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