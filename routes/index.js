const { create, list, update } = require("../controllers/Order");

module.exports = {
    init: (server) => {
        server.route({
            method:"POST",
            path:"/orders",
            handler: create
        });
        server.route({
            method:"GET",
            path:"/orders",
            config: {
                id: "getOrders",
                tags: ["api"],
                handler: list,
                validate: {
                    options: {
                        stripUnknown: false,
                    },
                },
            }
        });
        server.route({
            method:"PATCH",
            path:"/orders/{id}",
            handler: update
        });
    },
};