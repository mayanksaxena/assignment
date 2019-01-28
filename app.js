'use strict';

const Hapi = require('hapi');
const { merge }  = require('lodash');
const bissle = require('bissle');
const akaya = require('akaya');
const { getPaginationConfig } = require('./helpers/pagination');
const { create, list, update } = require('./controllers/Order');

// Create a server with a host and port
const server=Hapi.server({
    host:'localhost',
    port:8080
});

// Add the route
server.route({
    method:'POST',
    path:'/orders',
    handler: create
});
server.route({
    method:'GET',
    path:'/orders',
    config: {
        id: 'getOrders',
        tags: ['api'],
        handler: list,
        validate: {
            options: {
                stripUnknown: false,
            },
        },
    }
});
server.route({
    method:'PATCH',
    path:'/orders/{id}',
    handler: update
});

// Start the server
const start =  async function() {

    try {
        await server.register([akaya, bissle])
        await server.start();
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }

    console.log('Server running at:', server.info.uri);
};

start();