const server = require("./server");

const port = process.env.DEV_PORT || 3000;

const StartServer = () => {
    server.listen(port, () =>{
        console.log("Server running on port " + port);
    });
};

StartServer();


