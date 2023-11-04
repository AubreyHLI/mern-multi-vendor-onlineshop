// custom middleware to handle errors after connection to db
const CustomErrorClass = require('../utils/CustomErrorClass');

module.exports = (err, req, res, next) => {
    // if is not specific error, define as Internal server error
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal server Error";

    // duplicate key error
    if(err.code === 11000) {
        const message = `Duplicate key entered, this key is ${Object.keys(err.keyValue)}`;
        err = new CustomErrorClass(400, message);
    }

    console.log('2 error:', err);
    console.log('error.message:', err.message);

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
        statusCode: err.statusCode,
    })
}