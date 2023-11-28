const Product = require("../models/productModel");
const Shop = require("../models/shopModel");
const User = require("../models/userModel");
const Order = require("../models/orderModel");
const mongoose = require("mongoose");
const asyncHandler = require('../middlewares/asyncHandler');
const CustomErrorClass = require('../utils/CustomErrorClass');
const { uploadStreamToCloudinary, removeFromCloudinary, deleteFolderInCloudinary } = require("../utils/cloudinary");


// get all products
const getAllProducts = asyncHandler( async(request, response, next) => { 
    const products = await Product.find()
        .populate(['shop', {
            path: 'reviews.customer',
            select: '_id name avatar'
        }])
        .sort({ createdAt: -1 });
    response.status(200).json({
        success: true,
        products,
    });
})

// create new product 
const createNewProduct = asyncHandler( async(request, response, next) => { 
    try {
        const shop = await Shop.findById(request.shop.id);
        if (!shop) {
            return next(new CustomErrorClass(400, "店铺不存在，无法创建新商品"));
        } 
        // else 
        const {name, category, description, originalPrice, discountPrice, stock} = request.body;
        const imageUrls = [];
        const newProduct = await Product.create({
            name, category, description, originalPrice, stock,
            shop: shop._id,
        });
        if(discountPrice) {
            newProduct.discountPrice = discountPrice; 
        }
        if(request?.files?.length > 0) {
            const files = request.files;
            for(let i = 0; i < files.length; i++) {
                let result = await uploadStreamToCloudinary(files[i].buffer, `shops/${shop._id}/products/${newProduct._id}`, 600); 
                imageUrls.push({
                    public_id: result.public_id,
                    url: result.secure_url,
                });
            }
            newProduct.images = imageUrls;
        }
        await newProduct.save();

        response.status(201).json({
            success: true,
        });
    } catch (error) {
        return next(new CustomErrorClass(400, error));
    }
})

// get products of one shop
const getShopProducts = asyncHandler( async(req, res, next) => { 
    const shopProducts = await Product.find({shop: req.params.id}).sort({ createdAt: -1 });
    res.status(200).json({
        success: true,
        shopProducts,
    });
})

// update product
const updateProduct = asyncHandler(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new CustomErrorClass(400, "此商品不存在，无法操作"));
    }
    if (req.shop.id != product.shop) {
        return next(new CustomErrorClass(400, "权限限制，无法编辑该商品"));
    }
    // else
    Object.assign(product, req.body);
    if(!req.body.discountPrice) {
        product.discountPrice = null
    }

    let imageUrls = [];
    const { oldImagesIndex } = req.body;
    if(oldImagesIndex?.length > 0) {
        for(let item of oldImagesIndex) {
            let index = Number(item);
            imageUrls.push(product.images[index])
        }
    }
    if(req?.files?.length > 0) {
        const files = req.files;
        for(let i = 0; i < files.length; i++) {
            let result = await uploadStreamToCloudinary(files[i].buffer, `shops/${product.shop}/products/${product._id}`, 600); 
            imageUrls.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
        }
    }
    product.images = [...imageUrls];
    await product.save();
   
    res.status(200).json({
        success: true,
        message: "Product was updated successfully!",
    });
 })

 
// delete product
const deleteProduct = asyncHandler(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new CustomErrorClass(400, "此商品不存在，无法操作"));
    }
    if (req.shop.id != product.shop) {
        return next(new CustomErrorClass(400, "权限限制，无法删除该商品"));
    }

    // else
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    const { _id, shop, images } = deletedProduct;
    if(images.length > 0) {
        for(let image of images ) {
            if(image.public_id) {
                await removeFromCloudinary(image)
            }
        }
        await deleteFolderInCloudinary(`shops/${shop}/products/${_id}`);
    }
    res.status(200).json({
        success: true,
        message: "Product deleted successfully!",
    });
})


// review for a product
const createReview = asyncHandler( async(req, res, next) => { 
    const { rating, comment, productId, orderId } = req.body;    
    const product = await Product.findById(productId);
    const existReview = product?.reviews?.find(review => review?.orderId === orderId && review?.customer == req.user.id);

    // update review if is reviewed, else create new one
    if (existReview) {
        existReview.rating = rating;
        existReview.comment = comment;
    } else {
        product.reviews.push({
            customer: req.user.id,
            rating,
            comment,
            productId,
            orderId,
        });
    }
    // calculate the average rating
    let avgRating =  product.reviews.reduce((acc, item) => acc += item.rating, 0);
    product.ratings = avgRating / product.reviews.length;
    await product.save();

    let review = product?.reviews?.find(review => review?.orderId === orderId && review?.customer == req.user.id);
    
    await Order.findByIdAndUpdate(orderId,
        { $set: { "orderDetails.$[elem].isReviewed": true , "orderDetails.$[elem].reviewId": review?._id} },
        { arrayFilters: [{ "elem.productId": productId }] }
    );
    res.status(201).json({
        success: true,
        message: "Reviwed succesfully!",
    });
})




// export
module.exports = {
    getAllProducts,
    createNewProduct,
    getShopProducts,
    updateProduct,
    deleteProduct,
    createReview,
}