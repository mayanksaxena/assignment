const Hapi = require("hapi");
const bissle = require("bissle");
const akaya = require("akaya");
const routes = require("./routes");

// Create a server with a host and port
const server=Hapi.server({
    port:8080
});

routes.init(server);

// Start the server
const start =  async function() {

    try {
        await server.register([akaya, bissle]);
        await server.start();
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }

    console.log("Server running at:", server.info.uri);
};

start();