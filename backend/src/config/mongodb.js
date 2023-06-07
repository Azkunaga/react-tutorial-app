// db connection
require("dotenv").config({path: "env/local.env"});

const mongoose = require("mongoose");

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