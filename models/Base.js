const { chain } = require('lodash');
const { DbErrors } = require('objection-db-errors');
const Joi = require('joi');
const objection = require('objection');

const knex = require('../knex');
const {
	Model,
	Model: { BelongsToOneRelation },
} = objection;

Model.knex(knex);


class BaseModel extends DbErrors(Model) {
	// static get permissions() {
	// 	return [];
	// }

	// hasProperty(property) {
	// 	return !!Joi.reach(this.constructor.attributes, property);
	// }

	// $beforeInsert(context) {
	// 	// const userPermissions = get(
	// 	// 	context,
	// 	// 	'request.auth.credentials.permissions.data',
	// 	// 	{}
	// 	// );

	// 	// if (userLacksPermissionsToCreateModel) {
	// 	// 	throw new PermissionError(
	// 	// 		`error.${this.constructor.name.toLowerCase()}.create_permission.required`
	// 	// 	);
	// 	// }

	// 	if (this.hasProperty('account')) {
	// 		// Always set account to what's set in token on insert
	// 		this.account = context.request.auth.credentials.acc;
	// 	}
	// 	if (this.hasProperty('createdBy')) {
	// 		this.createdBy = context.request.auth.credentials.uid;
	// 	}

	// 	const date = new Date();
	// 	if (this.hasProperty('createdAt')) {
	// 		this.createdAt = date;
	// 	}
	// 	if (this.hasProperty('updatedAt')) {
	// 		this.updatedAt = date;
	// 	}
	// }

	// $beforeUpdate(options, context) {
	// 	console.log("this", this);
	// 	// if (this.account) {
	// 	// 	logger.requestLogger.warn(
	// 	// 		`Something is trying to modify account property of ${
	// 	// 			this.constructor.name
	// 	// 		}.
	// 	// 		This will never be acceptable! It will be deleted, burnt and casted away!`
	// 	// 	);
	// 	// }

	// 	// // Account property should never be modified
	// 	// delete this.account;

	// 	// const userPermissions = get(
	// 	// 	context,
	// 	// 	'request.auth.credentials.permissions.data',
	// 	// 	{}
	// 	// );
	// 	// const userLacksPermissionsToUpdateModel = !hasPermissionsToUpdateModel(
	// 	// 	this.constructor.permissions,
	// 	// 	userPermissions,
	// 	// 	this.constructor.idColumn,
	// 	// 	this.toJSON()
	// 	// );

	// 	// if (userLacksPermissionsToUpdateModel) {
	// 	// 	throw new PermissionError(
	// 	// 		`error.${this.constructor.name.toLowerCase()}.update_permission.required`
	// 	// 	);
	// 	// }

	// 	// if (this.hasProperty('updatedAt')) {
	// 	// 	this.updatedAt = new Date();
	// 	// }
	// }

	// $formatJson(json) {
	// 	const updatedJson = cloneDeep(super.$formatJson(json));

	// 	// Swap BelongsToOne relation property key to primitive column key
	// 	if (this.config.transformBelongsToOneRelationPropertyKeys) {
	// 		const relations = this.constructor.getRelations();
	// 		const keys = Object.keys(updatedJson);

	// 		keys.forEach((key) => {
	// 			if (
	// 				relations[key] instanceof BelongsToOneRelation &&
	// 				this.convertRelationKey(key)
	// 			) {
	// 				const primitiveColumnKey =
	// 					relations[key].ownerProp.props[0];

	// 				updatedJson[primitiveColumnKey] = updatedJson[key];
	// 				delete updatedJson[key];
	// 			}
	// 		});
	// 	}

	// 	return updatedJson;
	// }

	// $parseJson(json, opt) {
	// 	const updatedJson = chain(super.$parseJson(json, opt))
	// 		.cloneDeep()
	// 		.omit([
	// 			'account', // Never allow account property to change
	// 			'createdAt',
	// 			'updatedAt',
	// 		])
	// 		.value();
	// 	console.log("updatedJson", updatedJson);
	// 	return updatedJson;
	// }

	// static get responseSchema() {
	// 	return {
	// 		_links: Joi.object(),
	// 	};
	// }
}

module.exports = BaseModel;
