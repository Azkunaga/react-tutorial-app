const mongoose = require("mongoose");

const connection = async (uri) => {
    mongoose.connect(process.env.MONGODB_URI || uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        // console.log('Database connection successful')
    }).catch(err => {
        console.error('Database connection error')
    })
}

module.exports = connection;