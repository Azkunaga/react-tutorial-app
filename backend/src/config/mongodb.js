require("dotenv").config({path: "env/.env.local"});

const mongoose = require("mongoose");

const connection = async () => {
    mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log('Database connection successful')
    }).catch(err => {
        console.error('Database connection error')
    })
}

module.exports = connection;