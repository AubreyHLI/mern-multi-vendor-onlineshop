const express = require('express');
const router = express.Router();

// controllers
const {
    createNewProduct,
    getAllProducts,
    updateProduct,
    deleteProduct,
    createReview,
    getShopProducts
} = require('../controllers/productsController');

// middlewares
const { verifyToken, verifyShopToken} = require('../middlewares/auth');
const { upload } = require("../middlewares/multer");

router.get('/getAllProducts', getAllProducts);
router.get('/getShopProducts/:id', getShopProducts);
router.post('/createProduct', verifyShopToken, upload.array("images"), createNewProduct);
router.delete('/deleteProduct/:id', verifyShopToken, deleteProduct);
router.patch('/updateProduct/:id', verifyShopToken, upload.array("newImages"), updateProduct);
router.post('/createReview', verifyToken, createReview);


module.exports = router;