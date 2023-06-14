//require("./config/mongodb");

const express = require('express');
const server = express();

const loginRoute = require("./routes/loginRoute");
//const registerRoute = require("./routes/registerRoute");
//const chatGPTRoute = require("./routes/chatGPTRoute");

server.use(express.json())

server.use('/api/login', loginRoute);
server.use('/api/register', registerRoute);
//server.use('/api/chatGPT', chatGPTRoute); 

module.exports = server;