const Joi = require('joi');
const { Model } = require('objection');
const knex = require('../knex');
Model.knex(knex);

class Order extends Model {
    static get tableName() {
        return 'Orders';
    }

    static get attributes() {
        return Joi.object().keys({
            distance: Joi.string(),
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

// class Order extends BaseModel {
// 	static get tableName() {
// 		return 'Orders';
// 	}

// 	static get attributes() {
// 		return Joi.object().keys({
// 			distance: Joi.string(),
// 			origin: Joi.string(),
// 			destination: Joi.string(),
// 			id: Joi.number(),
// 			createdAt: Joi.date().iso(),
// 			updatedAt: Joi.date().iso(),
// 			status: Joi.string(),
// 		});
// 	}

// 	static get responseSchema() {
// 		return Model.attributes.keys();
// 	}
// }

// module.exports = Order;
