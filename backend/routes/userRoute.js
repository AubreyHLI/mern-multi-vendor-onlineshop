const express = require('express');
const router = express.Router();

// controllers
const {
    createUser,
    loginUser,
    logoutUser,
    getCurrentUser,
    updateUserInfo,
    getAddresses,
    addAddress,
    changeDefaultAddress,
    updateAddress,
    deleteAddress,
    updateUserPw,
    loginAdmin,
    getAllUsers,
    deleteUserById,    
} = require('../controllers/userController');

const {
    getCart,
    addToCart,
    removeFromCart,
    updateCart,
    clearCart,
} = require('../controllers/cartController');

const {
    getWishlist,
    addToWishlist,
    removeFromWishlist,
} = require('../controllers/wishlistController');

// middlewares
const { verifyToken } = require('../middlewares/auth');
const { upload } = require('../middlewares/multer');

router.post('/signup', createUser);
router.post('/login', loginUser);
router.get('/logout', verifyToken, logoutUser);
router.get('/getUser', verifyToken, getCurrentUser);
router.patch('/updateUserInfo', verifyToken, upload.single("avatar"), updateUserInfo);
router.get('/getAddresses', verifyToken, getAddresses);
router.post('/addAddress', verifyToken, addAddress);
router.patch('/updateDefaultAddress', verifyToken, changeDefaultAddress);
router.patch('/updateAddress/:id', verifyToken, updateAddress);
router.delete('/deleteAddress/:id', verifyToken, deleteAddress);
router.patch('/updatePassword', verifyToken, updateUserPw);

router.get('/getCart', verifyToken, getCart);
router.post('/addCartItem', verifyToken, addToCart);
router.delete('/removeCartItem', verifyToken, removeFromCart);
router.patch('/updateCartItem', verifyToken, updateCart);
router.patch('clearCart', verifyToken, clearCart);

router.get('/getWishlist', verifyToken, getWishlist);
router.post('/addWishlist', verifyToken, addToWishlist);
router.delete('/removeWishlist', verifyToken, removeFromWishlist);


router.post('/loginAdmin', loginAdmin);
router.get('/getAllUsers', getAllUsers);
router.delete('/deleteUser/:id', deleteUserById);

module.exports = router;