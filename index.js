const mongoose = require('mongoose');
require('dotenv').config();
const colors = require('colors');

const app = require('./app');

// database connection
mongoose.connect(process.env.DATABASE_LOCAL).then(() => {
    console.log(`Database connection is successful`.success.bold);
}).catch((err) => {
    console.log("Not Connected to Database ERROR! ", err);
});


// server 
const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`App is running on port ${port}`.yellow.bold);
})