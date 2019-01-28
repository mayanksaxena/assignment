const Knex = require('knex');
const config = require('config');

module.exports = Knex(config.get('database'));
