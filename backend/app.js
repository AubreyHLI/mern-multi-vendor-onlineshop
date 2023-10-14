const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const errorHandler = require('./middlewares/errorHandler');

// config
require('dotenv').config();

// middleware
app.use(express.urlencoded({extended: true})); // an Express built-in middleware to parse form data as strings or arrays
app.use(express.json());  // an Express built-in middleware to recognize the incoming Request Object as a JSON Object
app.use(morgan("common"));
app.use(cors({
    origin: [process.env.CLIENT_URL_LOCAL, ],
    credentials: true,
    methods: ['GET', 'POST', 'DELETE', 'PATCH'],
}));

// import route
const userRoute = require('./routes/userRoute');
const productsRoute = require('./routes/productsRoute');
const shopsRoute = require('./routes/shopsRoute');
const paymentRoute = require('./routes/paymentRoute');
// const eventsRoute = require('./routes/eventsRoute');
// const couponsRoute = require('./routes/couponRoute');
// const orderRoute = require('./routes/ordersRoute');

app.use('/api/users', userRoute);
app.use('/api/products', productsRoute);
app.use('/api/shop', shopsRoute);
app.use('/api/payment', paymentRoute);
// app.use('/api/events', eventsRoute);
// app.use('/api/coupons', couponsRoute);
// app.use('/api/orders', orderRoute);


// error handling
app.use(errorHandler);


module.exports = app;