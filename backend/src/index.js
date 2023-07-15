require('dotenv').config({path: "env/.env.local"})
const server = require("./server");

const port = process.env.DEV_PORT || 3000;

const StartServer = () => {
    server.listen(port, () =>{
        console.log("Server running on port " + port);
    });
};

// Handling Error
//process.on("unhandledRejection", err => {
//    console.log(`An error occurred: ${err.message}`)
//    server.close(() => process.exit(1))
//})

StartServer();


