const app = require("./app");

// connect to db
require('./db/dbConnection');

// config
require("dotenv").config();

// handle uncaught Exception
process.on("uncaughtException", err => {
    console.log('Shutting down the server for uncaught Exception, error: ', err.message);
});

// create server 
const http = require('http');
const server = http.createServer(app);
server.listen(process.env.PORT, () => {
    console.log('listening to port', process.env.PORT);
});

// close server when has unhandled promise rejection
process.on('unhandledRejection', err => {
    console.log('Shutting down the server for unhandled promise rejection, error: ', err);
    console.log('errorName:', err.name);
    server.close(() => {
        process.exit(1);
    })
});
