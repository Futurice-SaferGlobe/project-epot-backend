import prettyjson from 'prettyjson'
import { ApolloServer } from 'apollo-server-express'

import { app } from './app'
import { constants } from '@/constants'
import logger from '@/logger/logger'
import { initDb } from '@/database'

import { resolvers, typeDefs } from './graphql'

export async function runServer(port: number) {
  try {
    const server = new ApolloServer({
      typeDefs,
      resolvers
    })
    server.applyMiddleware({ app })

    app.on('error', error => {
      throw error
    })

    await initDb()

    app.listen(port, () => {
      if (!constants.isProd) {
        logger.info(`🚀 App is running at http://localhost:${port}`)
        logger.info('DEVELOPMENT MODE')
        console.log(prettyjson.render(constants) + '\n')
      }
    })
  } catch (err) {
    console.error(err)
    logger.error(err)
  }
}

if (typeof constants === 'object' && typeof constants.isProd === 'boolean') {
  runServer(constants.server.port)
} else {
  throw new Error('no valid constants')
}

export default runServer
