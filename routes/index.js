const Joi = require("joi");
const { create, list, update } = require("../controllers/Order");

module.exports = {
    init: (server) => {
        server.route({
            method: "POST",
            path: "/orders",
            handler: create,
            config: {
                description: "Create Orders",
                notes: "Returns an order with id, status and distance",
                tags: ["api"],
                validate: {
                    payload: {
                        origin: Joi.array()
                            .items(Joi.string(), Joi.string())
                            .required(),
                        destination: Joi.array()
                            .items(Joi.string(), Joi.string())
                            .required(),
                    },
                },
            },
        });
        server.route({
            method: "GET",
            path: "/orders",
            config: {
                id: "getOrders",
                description: "Get Orders",
                notes: "Returns Orders List",
                tags: ["api"],
                handler: list,
                validate: {
                    options: {
                        stripUnknown: false,
                    },
                },
            },
        });
        server.route({
            method: "PATCH",
            path: "/orders/{id}",
            handler: update,
            config: {
                description: "Update Orders",
                notes: "Returns status Success if order is not taken or error",
                tags: ["api"],
                validate: {
                    payload: {
                        status: Joi.string().required(),
                    },
                },
            },
        });
    },
};
