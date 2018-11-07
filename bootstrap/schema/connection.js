const Joi = require('joi')
const commonSchema = require('./common')
const connectionSchema = commonSchema(
  Joi.object().keys({
    operationInternalId: Joi.string(),
    connections: Joi.array().items(
      Joi.object().keys({
        from: Joi.string(),
        to: Joi.string(),
        type: Joi.string()
      })
    )
  })
)

module.exports = connectionSchema
