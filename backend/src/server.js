//require("./config/mongodb");

const express = require('express');
const server = express();

const cors = require('cors');
const corsOptions = require('./config/corsOptions');

const loginRoute = require("./routes/loginRoute");
const registerRoute = require("./routes/registerRoute");
const tutorialRoute = require('./routes/tutorialRoute');
const questionRoute = require("./routes/questionRoute");
const chatGPTRoute = require("./routes/chatGPTRoute");

server.use(express.json())

server.use(cors(corsOptions));

server.use('/api/auth/login', loginRoute);
server.use('/api/auth/register', registerRoute);
server.use('/api/tutorial/', tutorialRoute);
server.use('/api/tutorial/question', questionRoute);
server.use('/api/chatGPT', chatGPTRoute); 

server.all('*', (req, res) => {
    res.status(404);
});

module.exports = server;