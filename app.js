const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose')


// middleware
app.use(express.json());
app.use(cors());


// routes
const productRoute = require('./routes/product.route');
const brandRoute = require('./routes/brand.route');
const categoryRoute = require('./routes/category.route');
const storeRouter = require('./routes/store.route');
const supplierRouter = require('./routes/supplier.route');
const stockRouter = require('./routes/stock.route');
const userRouter = require('./routes/user.route');


app.get('/', (req, res) => {
    res.send('Route is working! YAY');
})

app.use('/api/v1/product', productRoute);
app.use('/api/v1/brand', brandRoute);
app.use('/api/v1/category', categoryRoute);
app.use('/api/v1/store', storeRouter);
app.use('/api/v1/supplier', supplierRouter);
app.use('/api/v1/stock', stockRouter);
app.use('/api/v1/user', userRouter);


module.exports = app;
