//require("./config/mongodb");

const express = require('express');
const server = express();

const cookieParser = require('cookie-parser');

const cors = require('cors');
const corsOptions = require('./config/corsOptions');

const JwtValidator = require('./validators/JwtValidator');
const credentials = require('./validators/credentials');

//const roleValidator = require('../src/validators/roleValidator');

const loginRoute = require("./routes/loginRoute");
const registerRoute = require("./routes/registerRoute");
const logoutRoute = require("./routes/logoutRoute");
const refreshRoute = require('./routes/refresRoute');
const tutorialRoute = require('./routes/tutorialRoute');
const questionRoute = require("./routes/questionRoute");
const chatGPTRoute = require("./routes/chatGPTRoute");

//Handles options credentials check
server.use(credentials);

//Cross Origin Resource Sharing
server.use(cors(corsOptions));

//middleware for json
server.use(express.json())

//middleware for coockies
server.use(cookieParser());

//public routes
server.use('/api/auth/login', loginRoute);
server.use('/api/auth/register', registerRoute);
server.use('/api/auth/logout', logoutRoute);
server.use('/api/auth/refresh', refreshRoute);

server.use(JwtValidator);
//private routes JWT-Roles
server.use('/api/tutorial/', tutorialRoute);
server.use('/api/tutorial/question', questionRoute);
server.use('/api/chatGPT', chatGPTRoute);

//no existing routes
server.all('*', (req, res) => {
    res.status(404);
});

module.exports = server;