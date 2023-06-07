// db connection
require("dotenv").config({path: "env/local.env"});

const {MongoClient} = require("mongodb");

// Create Instance of MongoClient for mongodb
const client = new MongoClient(process.env.MONGODB_URI);

// Connect to database
client
    .connect()
    .then(()=>{
        console.log("DB Connected Successfully")
    })
    .catch((err)=>{
        console.log("Failed to connect",err);
    });