// @ts-check
const path = require('path')
const { readFile } = require('fs')
const { promisify } = require('util')
const { aql } = require('arangojs')
const { createDbConnection } = require('./utils')

const readFileAsync = promisify(readFile)

async function setCollections({
  pathToJson,
  username,
  password,
  database,
  collection
}) {
  try {
    // Create database connection
    const connection = createDbConnection({ username, password })
    connection.useDatabase(database)

    // Read the JSON file as utf8 string and parse it
    const operations = JSON.parse(
      await readFileAsync(path.resolve(process.cwd(), pathToJson), 'utf8')
    )

    // INSERT operation(s) into the collection.
    if (Array.isArray(operations)) {
      for (let operation of operations) {
        await connection.query(
          aql`INSERT ${operation} INTO ${connection.collection(collection)}`
        )
      }
    } else if (operations === Object(operations)) {
      await connection.query(
        aql`INSERT ${operations} INTO ${connection.collection(collection)}`
      )
    } else {
      throw new Error(
        'invalid data type (needs to be either an array or an object'
      )
    }

    // Success!!!
    console.log(
      `${
        operations.length
      } operation(s) added to the collection '${collection}'`
    )
  } catch (err) {
    throw new Error(err)
  }
}

module.exports = setCollections
