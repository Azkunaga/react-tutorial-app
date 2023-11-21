const server = require("./server");
const mongodbConnection = require('./config/mongodb');

const port = process.env.DEV_PORT || 3001;

const StartServer = () => {
    server.listen(port, () =>{
        console.log("Server running on port " + port);
    });
};

StartServer();
mongodbConnection();


