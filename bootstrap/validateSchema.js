// @ts-check
const Joi = require('joi')

const operationSchema = Joi.object({
  operation: Joi.string(),
  area: Joi.string(),
  internalId: Joi.string(),
  data: Joi.array().items(
    Joi.object().keys({
      index: Joi.number(),
      uid: Joi.string(),
      title: Joi.string(),
      content: Joi.string().allow(''),
      labels: Joi.array().items(Joi.number()),
      subheaders: Joi.array().items(
        Joi.object().keys({
          index: Joi.number(),
          uid: Joi.string(),
          title: Joi.string(),
          content: Joi.string().allow('')
        })
      )
    })
  )
})

const connectionSchema = Joi.object({
  operationInternalId: Joi.string(),
  connections: Joi.array().items(
    Joi.object().keys({
      from: Joi.string(),
      to: Joi.string(),
      type: Joi.string()
    })
  )
})

const errorHandler = message => {
  throw new Error(message)
}

exports.validateOperationSchema = operationDocument => {
  const opValidation = operationSchema.validate(operationDocument)

  if (opValidation.error) {
    errorHandler(opValidation.error.details[0].message)
  }

  return true
}

exports.validateConnectionSchema = connectionDocument => {
  const connValidation = operationSchema.validate(connectionDocument)

  if (connValidation.error) {
    errorHandler(connValidation.error.details[0].message)
  }

  return true
}
