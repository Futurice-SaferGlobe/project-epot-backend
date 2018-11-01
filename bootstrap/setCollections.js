// @ts-check
const path = require('path')
const { aql } = require('arangojs')
const { createDbConnection, readFileAsync } = require('./utils')

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
    const json = JSON.parse(
      await readFileAsync(path.resolve(process.cwd(), pathToJson), 'utf8')
    )

    // INSERT operation(s) into the collection.
    if (Array.isArray(json)) {
      for (let operation of json) {
        await connection.query(
          aql`INSERT ${operation} INTO ${connection.collection(collection)}`
        )
      }
    } else if (json === Object(json)) {
      await connection.query(
        aql`INSERT ${json} INTO ${connection.collection(collection)}`
      )
    } else {
      throw new Error(
        'invalid data type (needs to be either an array or an object)'
      )
    }

    // Success!!!
    console.log(
      `${
        json.length
      } operation(s)/connections(s) added to the collection '${collection}'`
    )
  } catch (err) {
    throw new Error(err)
  }
}

module.exports = setCollections
