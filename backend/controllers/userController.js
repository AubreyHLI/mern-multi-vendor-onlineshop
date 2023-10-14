// use the model
const User = require('../models/userModel');
const Address = require('../models/AddressModel');
const CustomErrorClass = require('../utils/CustomErrorClass');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const asyncHandler = require('../middlewares/asyncHandler');
const { removeFromCloudinary, uploadStreamToCloudinary } = require('../utils/cloudinary');

// Create a new User
const createUser = asyncHandler( async(request, response, next) => {
    const { name, email, password } = request.body;
    const existUser = await User.findOne({ email });
    if (existUser) { 
        return next(new CustomErrorClass(400, '该邮箱已被注册，请填写新邮箱')); 
    }

    // else
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({ 
        name, 
        email, 
        password: hashedPassword 
    });
    await Cart.create({_userId: newUser._id })
    await Wishlist.create({_userId: newUser._id})

    response.status(201).json({
        success: true,
    })
});


// Login user
const loginUser = asyncHandler( async (request, response, next) => {
    const { email, password } = request.body;
    const existUser = await User.findOne({ email }).select('+password'); 
    if(!existUser) {
        return next(new CustomErrorClass(400, "该用户不存在"));
    }

    // else
    const checkPW = await bcrypt.compare(password, existUser.password);
    if(!checkPW) {
        return next(new CustomErrorClass(400, "密码错误"));
    }

    // else 
    const token = jwt.sign({ id: existUser._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRESIN,
    });

    delete existUser.password;  // don't sent password to frontend
    
    response.status(200).json({
        success: '登录成功', 
        user: existUser, 
        token,
    });
});


// Logout user
const logoutUser = asyncHandler( async(request, response, next) => {
    try {
        response.status(201).json({
            success: true,
            message: "Log out successful!",
            token: null,
            user: null,
        });
    } catch (err) {
        return next(new CustomErrorClass(500, err.message));
    }
})



const getCurrentUser = asyncHandler( async(req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        res.status(200).json({
            success: true,
            user,
        })
    } catch (error) {
        return next(new CustomErrorClass(404, error.message));
    }
})


// Profile actions
const updateUserInfo = asyncHandler( async(req, res, next) => {
    const { name, phoneNumber, email } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) {
        return next(new CustomErrorClass(400, "用户不存在"));
    }
    const emailUsed = await User.findOne({email});
    if(emailUsed && emailUsed._id.toString() !== user._id.toString()) {
        return next(new CustomErrorClass(400, "该邮箱已被使用，请更换"));
    }
    // else
    user.name = name;
    user.email = email;
    user.phoneNumber = phoneNumber;
    if(req.file) {
        if(user.avatar && user.avatar.public_id) {
            await removeFromCloudinary(user.avatar)
        }
        let result = await uploadStreamToCloudinary(req.file.buffer, `users/avatars`, 240); 
        user.avatar = {
            public_id: result.public_id,
            url: result.secure_url,
        }
    }
    await user.save();

    res.status(201).json({
        success: true,
    });
})


const getAddresses = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id)
        .select('addressBook')
        .populate('addressBook.addresses');

    res.status(200).json({
        success: true,
        addressBook: user.addressBook,
    });
})

// add address
const addAddress = asyncHandler(async (req, res, next) => {
    const { recipient, phone, province, city, district, address1, isDefault } = req.body;
    const newAddress = await Address.create({ recipient, phone, province, city, district, address1 });
    const user = await User.findById(req.user.id);
    user.addressBook.addresses.unshift(newAddress._id);
    if(isDefault || user.addressBook.addresses.length === 1) {
        user.addressBook.defaultAddressId = newAddress._id;
    }
    await user.save();

    res.status(201).json({
        success: true,
    });
})

const changeDefaultAddress = asyncHandler(async (req, res, next) => {
    const { newDefaultId } = req.body;
    const user = await User.findById(req.user.id);

    user.addressBook.defaultAddressId = newDefaultId;
    await user.save();

    res.status(201).json({
        success: true,
    });
})
  
  
// update addresses
const updateAddress = asyncHandler(async (req, res, next) => {
    const existsAddress = await Address.findById(req.params.id);

    Object.assign(existsAddress, req.body);
    await existsAddress.save();

    res.status(201).json({
        success: true,
    });
})
  
// delete address
const deleteAddress = asyncHandler(async (req, res, next) => {
    const address = await Address.findOneAndDelete({_id: req.params.id});
    const user = await User.findOneAndUpdate({ _id: req.user.id }, { $pull: { 'addressBook.addresses': address._id }}, {new: true});
    
    const {defaultAddressId, addresses} = user.addressBook;
    if(defaultAddressId == address._id ) {
        user.addressBook.defaultAddressId = addresses.length > 0 ? addresses[0] : null;
    }
    await user.save();

    res.status(200).json({ 
        success: true,
    });
})
  
// update user password
const updateUserPw = asyncHandler(async (req, res, next) => {
    const {oldPassword, confirmPassword, newPassword} = req.body;
    const user = await User.findById(req.user.id).select("+password");

    const checkPW = await bcrypt.compare(oldPassword, user.password);
    if (!checkPW) {
        return next(new CustomErrorClass(400, "原密码不正确，请提供正确密码"));
    }
    if (newPassword !== confirmPassword) {
        return next(new CustomErrorClass(400, "确认密码与新密码不一致"));
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({
        success: true,
        message: "密码更新成功!",
    });
})



// Admin
const loginAdmin = asyncHandler( async (request, response, next) => {
    const { email, password } = request.body;
    if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PW) {
        response.status(201).json({
            success: true,
            isAdmin: true
        })
    } else if (email === process.env.ADMIN_EMAIL && password !== process.env.ADMIN_PW) {
        return next(new CustomErrorClass(400, "Password is wrong, please enter the correct password."));
    } else {
        return next(new CustomErrorClass(400, "Account doesn't exist!"));
    }
});


const getAllUsers =  asyncHandler( async (req, res, next) => {
    const users = await User.find().sort({
        createdAt: -1,
    });
    res.status(200).json({
        success: true,
        users,
    });
})
  

const deleteUserById = asyncHandler(async (req, res, next) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
        return next(new CustomErrorClass(400, "User is not available with this id"));
    }

    const users = await User.find().sort({
        createdAt: -1,
    });

    res.status(201).json({
        success: true,
        message: "User deleted successfully!",
        users,
    });
})



// export
module.exports = {
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
}