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


app.get('/', (req, res) => {
    res.send('Route is working! YAY');
})

app.use('/api/v1/product', productRoute);
app.use('/api/v1/brand', brandRoute);
app.use('/api/v1/category', categoryRoute);
app.use('/api/v1/store', storeRouter);


module.exports = app;
