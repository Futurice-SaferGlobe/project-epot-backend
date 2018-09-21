// @ts-check
const { Database } = require('arangojs')

/**
 * creates and returns a connection to the database.
 *
 * @param {Object} opts options object
 * @param {String} opts.username username for the database
 * @param {String} opts.password password for the database
 * @param {String=} opts.url the url of the database (defaults to http://127.0.0.1:8529)
 */
exports.createDbConnection = ({ username, password, url }) => {
  if (!url) url = 'http://127.0.0.1:8529'

  const connection = new Database({
    url
  })
  connection.useBasicAuth(username, password)

  return connection
}
