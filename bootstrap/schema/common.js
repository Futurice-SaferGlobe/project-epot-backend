const Joi = require('joi')

const commonSchema = schema => Joi.array().items(schema)

module.exports = commonSchema
