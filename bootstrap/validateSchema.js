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
const validateSchema = (schema, document, callback) => {
  const validSchemasArr = Object.keys(schemas)

  console.log(schema)

  if (!validSchemasArr.includes(schema)) {
    callback(
      new Error(
        `invalid schema in argument. ` +
          `schema '${schema}' does not equal one of valid schemas: ` +
          `${validSchemasArr.join(', ')}`
      ),
      null
    )
  }
  const isValid = validators[schema](document)

  if (isValid) {
    callback(null, document)
  }
}

const validators = {
  operations: operationDocument => {
    const opValidation = schemas.operations.validate(operationDocument)

    if (opValidation.error) {
      errorHandler(opValidation.error.details[0].message)
      return false
    }

    return true
  },

  connections: connectionDocument => {
    const connValidation = schemas.connections.validate(connectionDocument)

    if (connValidation.error) {
      errorHandler(connValidation.error.details[0].message)
      return false
    }

    return true
  }
}

module.exports = validateSchema
