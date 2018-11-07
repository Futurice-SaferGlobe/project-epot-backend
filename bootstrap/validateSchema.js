// @ts-check
const Joi = require('joi')
const schemas = require('./schema')

const errorHandler = message => {
  throw new Error(message)
}

/**
 * @param {String} schema the name of the schema (eg. `operation`, `connection`)
 * @param {*} document the document to validate
 */
const validateSchema = (schema, document) => {
  const validSchemasArr = Object.keys(schemas)

  if (!validSchemasArr.includes(schema)) {
    return errorHandler(
      `invalid schema in argument. ` +
        `schema '${schema}' does not equal one of valid schemas:` +
        `${validSchemasArr.join(', ')}`
    )
  }

  validators[schema](document)
}

const validators = {
  operation: operationDocument => {
    const opValidation = schemas.operation.validate(operationDocument)

    if (opValidation.error) {
      errorHandler(opValidation.error.details[0].message)
    }

    return true
  },

  connection: connectionDocument => {
    const connValidation = schemas.connection.validate(connectionDocument)

    if (connValidation.error) {
      errorHandler(connValidation.error.details[0].message)
    }

    return true
  }
}

module.exports = validateSchema
