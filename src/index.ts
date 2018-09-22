import { app } from './app'
import { Server } from 'http'
import prettyjson from 'prettyjson'
import { constants } from '@/constants'

import logger from '@/logger/logger'
import { initDb } from '@/database'

const {
  isProd,
  server: { port: serverPort }
} = constants

export async function runServer(port: number) {
  try {
    const server = new Server(app)

    server.on('error', error => {
      throw error
    })

    server.on('listening', () => {
      if (!isProd) {
        logger.info(`App is running at http://localhost:${port}`)
        logger.info(isProd ? 'PRODUCTION' : 'DEVELOPMENT' + ' MODE')
        console.log(prettyjson.render(constants) + '\n')
      }
    })

    await initDb()

    server.listen(port)
  } catch (err) {
    logger.error(err)
  }
}

if (typeof constants === 'object' && typeof isProd === 'boolean') {
  runServer(serverPort)
} else {
  throw new Error('no valid constants')
}

export default runServer
