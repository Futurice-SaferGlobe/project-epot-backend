const Joi = require('joi')
const commonSchema = require('./common')

const operationSchema = commonSchema(
  Joi.object().keys({
    operation: Joi.string(),
    area: Joi.string(),
    internalId: Joi.string(),
    data: Joi.array().items(
      Joi.object().keys({
        index: Joi.number(),
        uid: Joi.string(),
        title: Joi.string(),
        content: Joi.string().allow(''),
        labels: Joi.array().items(Joi.string().allow('')),
        subheaders: Joi.array().items(
          Joi.object().keys({
            index: Joi.number(),
            uid: Joi.string(),
            title: Joi.string(),
            content: Joi.string().allow(''),
            labels: Joi.array().items(Joi.string().allow(''))
          })
        )
      })
    )
  })
)

module.exports = operationSchema
