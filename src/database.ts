// TODO: 👇 WHY AREN'T THEY EXPOSING THE GODDAMN TYPES?!?!?!
import { Database, aql } from 'arangojs'
import { constants } from '@/constants'
import logger from '@/logger/logger'

const { url, name, user, pass } = constants.db

// tslint:disable:prefer-const
let connection: Database

export const initDb = (): Promise<Database> => {
  return new Promise(async (resolve, reject) => {
    try {
      connection = new Database(url)
      connection.useBasicAuth(user, pass)
      connection.useDatabase(name)

      await connection.query(aql`RETURN 0`)

      resolve(connection)
    } catch (err) {
      // TODO: print error here as a backup, until the logger properly logs errors.
      logger.error(`db: ${err.message}`)

      reject(err)
    }
  })
}

export const getDb = () => {
  return connection
}
