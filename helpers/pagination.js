const Joi = require('joi');

const getPaginationConfig = (options = {}) => ({
	validate: {
		query: {
			limit: Joi.number()
				.integer()
				.min(1)
				.max(500)
				.default(100),
			page: Joi.number()
				.integer()
				.min(1)
				.default(1),
		},
	},
	response: {
		schema: Joi.object()
			.keys({
				limit: Joi.number().required(),
				page: Joi.number().required(),
				total: Joi.number().required(),
				_links: Joi.object().keys({
					self: Joi.object()
						.keys({
							href: Joi.string().required(),
						})
						.required(),
					first: Joi.object()
						.keys({
							href: Joi.string().required(),
						})
						.required(),
					last: Joi.object()
						.keys({
							href: Joi.string().required(),
						})
						.required(),
					prev: Joi.object().keys({
						href: Joi.string().required(),
					}),
					next: Joi.object().keys({
						href: Joi.string().required(),
					}),
				}),
				results: Joi.array().required(),
			})
			.required(),
	},
});

module.exports = {
	getPaginationConfig,
};