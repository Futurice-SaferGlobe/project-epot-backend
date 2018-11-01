// @ts-check
const { Database } = require('arangojs')
const generate = require('nanoid/generate')
const readFileAsync = require('./readFileAsync')

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

const uidAllowedSymbols = '1234567890qwertyuiopasdfghjklzxcvbnm'
exports.generateArrayMemberUids = array =>
  array.map(member => ({
    uid: generate(uidAllowedSymbols, 10),
    ...member
  }))

exports.readFileAsync = readFileAsync
