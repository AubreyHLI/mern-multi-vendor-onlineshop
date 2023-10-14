const jwt = require('jsonwebtoken');

const generateToken = (user, code, response) => {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRESIN,
    });

    response.status(code).json({
        success: '登录成功', 
        user, 
        token,
    });
}

module.exports = generateToken;