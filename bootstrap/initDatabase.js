// @ts-check
const { createDbConnection } = require('./utils')
const { aql } = require('arangojs')
const chalk = require('chalk').default

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
    const connection = createDbConnection({
      url: opts.url,
      username: opts.username,
      password: opts.password
    })
    console.log(chalk.green(`connected to ${opts.url}`))

    // Create database
    const isDatabaseExist = await connection
      .listDatabases()
      .then(databases => databases.find(db => db === opts.databaseName))

    if (!isDatabaseExist) {
      await connection.createDatabase(opts.databaseName)
      console.log(chalk.green(`database '${opts.databaseName}' created`))
    } else {
      console.log(
        chalk.green(
          `database '${opts.databaseName}' already exists. skipping...`
        )
      )
    }
    connection.useDatabase(opts.databaseName)

    // Create collection
    const collection = connection.collection(opts.collectionName)
    await collection.create().catch(err => {
      // Collection already exists
      if (err.code === 409) {
        connection.query(aql`
          FOR d IN ${collection}
            REMOVE d IN ${collection}
        `)

        return
      }

      throw err
    })

    console.log(chalk.green(`collection '${opts.collectionName}' created `))

    return { connection, collection }
  } catch (err) {
    throw new Error(err)
  }
}

module.exports = initDatabase
