const Hapi = require("hapi");
const bissle = require("bissle");
const akaya = require("akaya");
const inert = require("inert");
const vision = require("vision");
const hapiSwagger = require("hapi-swagger");
const routes = require("./routes");
const Pack = require("./package");

// Create a server with a host and port
const server=Hapi.server({
    port: process.env.PORT || 8080
});

routes.init(server);

// Start the server
const start =  async function() {

    const swaggerOptions = {
        info: {
            title: "Test API Documentation",
            version: Pack.version,
        },
    };

    try {
        await server.register([
            inert,
            vision,
            akaya, 
            bissle,
            {
                plugin: hapiSwagger,
                options: swaggerOptions
            }
        ]);
        await server.start();
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }

    console.log("Server running at:", server.info.uri);
};

start();