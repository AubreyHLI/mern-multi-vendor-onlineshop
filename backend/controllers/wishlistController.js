const Wishlist = require('../models/wishlistModel');
const CustomErrorClass = require('../utils/CustomErrorClass');
const asyncHandler = require('../middlewares/asyncHandler');

// wishilist
const getWishlist = asyncHandler(async (req, res, next) => {
    const wishlist = await Wishlist.findOne({_userId: req.user.id})
        .select('wishlistDetails')
        .populate({
            path: 'wishlistDetails',
            select: '_id name originalPrice discountPrice images'
        });
    res.status(200).json({
        success: true,
        wishlist,
    });
})

const addToWishlist = asyncHandler(async (req, res, next) => {
    const { productId } = req.body;
    const wishlist = await Wishlist.findOne({_userId: req.user.id});
    const existsProduct = wishlist.wishlistDetails.find(item => item == productId);
    if (existsProduct) {
        await Wishlist.findOneAndUpdate({_userId: req.user.id}, {$pull: {wishlistDetails: productId}});
    } else {
        wishlist.wishlistDetails.push(productId);
        await wishlist.save();
    }
    res.status(201).json({
        success: true
    });
})


const removeFromWishlist = asyncHandler(async (req, res, next) => {
    try{
        const { productId } = req.body;
        await Wishlist.findOneAndUpdate({_userId: req.user.id}, {$pull: {wishlistDetails: productId}});
        
        res.status(201).json({
            success: true,
        });
    } catch(err) {
        return next(new CustomErrorClass(500, err.message));
    }
})

module.exports = {
    getWishlist,
    addToWishlist,
    removeFromWishlist,
}