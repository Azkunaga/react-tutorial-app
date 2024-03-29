const express = require('express');
const server = express();

const cookieParser = require('cookie-parser');

const cors = require('cors');
const corsOptions = require('./config/corsOptions');

const tokenValidator = require('./validators/tokenValidator');

const loginRoute = require("./routes/loginRoute");
const registerRoute = require("./routes/registerRoute");
const logoutRoute = require("./routes/logoutRoute");
const refreshRoute = require('./routes/refresRoute');
const tutorialRoute = require('./routes/tutorialRoute');
const questionRoute = require("./routes/questionRoute");
const chatGPTRoute = require("./routes/chatGPTRoute");
const topicRoute = require("./routes/topicRoute");
const exTypeRoute = require("./routes/exTypeRoute");
const exLevelRoute = require("./routes/exLevelRoute");
const userRoute = require("./routes/userRoute");
const imageRoute = require('./routes/imageRoute');
const codeRoute = require('./routes/codeRoute')

//Cross Origin Resource Sharing
server.use(cors(corsOptions));
//middleware for json
server.use(express.json())
//middleware for coockies
server.use(cookieParser());
//Static folder
server.use(express.static('public'));
//public routes
server.use('/api/auth/login', loginRoute);
server.use('/api/auth/register', registerRoute);
server.use('/api/auth/logout', logoutRoute);
server.use('/api/auth/refresh', refreshRoute);

server.use(tokenValidator);
//private routes JWT-Roles
server.use('/api/tutorial/question', questionRoute);
server.use('/api/tutorial/topic', topicRoute);
server.use('/api/tutorial/exType', exTypeRoute);
server.use('/api/tutorial/exLevel', exLevelRoute);
server.use('/api/tutorial', tutorialRoute);
server.use('/api/chatGPT', chatGPTRoute);
server.use('/api/users', userRoute);
server.use('/api/code', codeRoute);
server.use('/api/upload-image', imageRoute);

//no existing routes
server.all('*', (req, res) => {
    res.status(404);
});

module.exports = server;