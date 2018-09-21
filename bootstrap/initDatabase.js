// @ts-check
const { Database } = require('arangojs')

/**
 *
 * @param {Object} opts options to initalize database
 * @param {String} opts.url the connection url
 * @param {String} opts.username db username
 * @param {String} opts.password db password
 * @param {String} opts.databaseName the name for the new database
 * @param {String} opts.collectionName the name for the collection
 */
async function initDatabase(opts) {
  try {
    if (!opts.url) opts.url = 'http://127.0.0.1:8529'
    // Create connection
    const connection = new Database({
      url: opts.url
    })

    connection.useBasicAuth(opts.username, opts.password)
    console.log(`connected to ${opts.url}`)

    // Create database
    const isDatabaseExist = await connection
      .listDatabases()
      .then(databases => databases.find(db => db === opts.databaseName))

    if (!isDatabaseExist) {
      await connection.createDatabase(opts.databaseName)
      connection.useDatabase(opts.databaseName)
      connection.useBasicAuth({
        username: opts.username,
        password: opts.password
      })
      console.log(`database '${opts.databaseName}' created`)
    } else {
      console.log(`database '${opts.databaseName}' already exists. skipping...`)
    }

    // Create collection
    const collection = connection.collection(opts.collectionName)
    await collection
      .create()
      .catch(err =>
        console.error(`error while creating collection:`, err.message)
      )
    console.log(`collection '${opts.collectionName}' created`)

    return { connection, [opts.collectionName]: collection }
  } catch (err) {
    throw new Error(err)
  }
}

module.exports = initDatabase
