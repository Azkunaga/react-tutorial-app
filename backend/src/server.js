//require("./config/mongodb");

const app = require("express");

const loginRoute = require("./routes/loginRoute");
const registerRoute = require("./routes/registerRoute");
const chatGPTRoute = require("./routes/chatGPTRoute");

app.use(express.json())

app.use('/login', loginRoute);
app.use('/register', registerRoute);
app.use('/chatGPT', chatGPTRoute);

module.exports = app;