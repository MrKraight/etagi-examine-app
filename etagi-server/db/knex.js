const environment = 'staging'
const config = require('../knexfile')[environment]
module.exports = require('knex')(config)