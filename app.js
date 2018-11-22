const createError = require('http-errors');
const express = require('express');
const path = require('path');

const logger = require('morgan');

const apiUsers = require('./routes/user');
const apiProducts = require('./routes/products');
const apiOrders = require('./routes/orders');

const app = express();
const dataBase = "oigabackend";

const mongoose = require('mongoose');
mongoose.connect(`mongodb://localhost:27017/${dataBase}`,
  {useNewUrlParser: true, useCreateIndex: true,  promiseLibrary: require('bluebird') })
  .then(() =>  console.log('connection successful'))
  .catch((err) => console.error(err));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if (bearerHeader) {
        const bearer = bearerHeader.split(' ');
        req.token = bearer[1];
        next();
    } else if (req.originalUrl !== '/users/login') {
        console.log(req.originalUrl);
        res.sendStatus(403);
    }
});
app.use('/products', apiProducts);
app.use('/orders', apiOrders);
app.use('/users', apiUsers);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.sendStatus(err.status);
});

module.exports = app;
