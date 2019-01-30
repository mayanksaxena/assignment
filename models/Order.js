const Joi = require("joi");
const { Model } = require("objection");
const knex = require("../knex");
Model.knex(knex);

class Order extends Model {
    static get tableName() {
        return "orders";
    }

    hasProperty(property) {
        return !!Joi.reach(this.constructor.attributes, property);
    }

    $beforeInsert(context) {
        const date = new Date();
        if (this.hasProperty("createdAt")) {
            this.createdAt = date;
        }
        if (this.hasProperty("updatedAt")) {
            this.updatedAt = date;
        }
    }

    $beforeUpdate(options, context) {
        if (this.hasProperty("updatedAt")) {
            this.updatedAt = new Date();
        }
    }

    static get attributes() {
        return Joi.object().keys({
            distance: Joi.number().integer(),
            origin: Joi.string(),
            destination: Joi.string(),
            id: Joi.number(),
            createdAt: Joi.date().iso(),
            updatedAt: Joi.date().iso(),
            status: Joi.string(),
        });
    }

    static get responseSchema() {
        return Order.attributes.keys();
    }
}

module.exports = Order;
