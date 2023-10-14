// custom middleware to handle errors after connection to db
const CustomErrorClass = require('../utils/CustomErrorClass');

module.exports = (err, req, res, next) => {
    // if is not specific error, define as Internal server error
    // console.log('1 error:', err);
    // console.log('-------------------------------------------------------------------------------------------------');

    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal server Error";

    // wrong mongodb id error
    // if(err.name === "CastError") {
    //     const message = `Resources not found with this id! Invalid ${err.path}`;
    //     err = new CustomErrorClass(400, message);
    // }

    // duplicate key error
    if(err.code === 11000) {
        const message = `Duplicate key entered, this key is ${Object.keys(err.keyValue)}`;
        err = new CustomErrorClass(400, message);
    }

    // wrong jwt error
    // if(err.name === "JsonWebTokenError") {
    //     const message = `Your url is invalid, please use a valid activation url`;
    //     err = new CustomErrorClass(400, message);
    // }

    // jwt expired
    // if(err.name === "TokenExpiredError") {
    //     const message = `Your url is expired, please try to send letter again`;
    //     err = new CustomErrorClass(400, message);
    // }

    console.log('2 error:', err);
    console.log('error.message:', err.message);

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
        statusCode: err.statusCode,
    })
}