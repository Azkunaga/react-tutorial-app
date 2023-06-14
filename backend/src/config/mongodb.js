// db connection
require("dotenv").config({path: "env/local.env"});

const mongoose = require("mongoose");

const connection = () => {
    mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Database connection successful')
    })
    .catch(err => {
       console.error('Database connection error')
    })
}

module.exports = connection;