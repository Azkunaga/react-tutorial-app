//require("./config/mongodb");

const express = require('express');
const server = express();

const loginRoute = require("./routes/loginRoute");
const registerRoute = require("./routes/registerRoute");
const tutorialRoute = require('./routes/tutorialRoute');
//const chatGPTRoute = require("./routes/chatGPTRoute");

server.use(express.json())

server.use('/api/auth/login', loginRoute);
server.use('/api/auth/register', registerRoute);
server.use('/api/tutorial/', tutorialRoute);
//server.use('/api/chatGPT', chatGPTRoute); 

module.exports = server;