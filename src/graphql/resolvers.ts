import { queryOperation, queryOperations } from '@/models/operationModel'
import {
  queryConnection,
  queryConnections,
  queryHeaderConn
} from '@/models/connectionModel'

/**
 * Because the indices in operations changed from number to string type, we need to convert it
 * @param num number type to transform into a string
 */
const numToString = num => num.toString()

export const resolvers = {
  Query: {
    info: () => `Ping`,
    operations: async (_, { ids }) => {
      try {
        if (ids) {
          if (Array.isArray(ids)) {
            return ids.map(id => queryOperation(id))
          } else if (typeof ids === 'string') {
            return await queryOperation(ids)
          }
        }
        return queryOperations()
      } catch (err) {
        throw err
      }
    },
    operation: async (_, { id }) => {
      try {
        return await queryOperation(id)
      } catch (err) {
        throw err
      }
    },
    operationHeader: async (_, { id, uid }) => {
      try {
        const opQuery = await queryOperation(id)
        const connQuery = await queryHeaderConn(id, uid)

        const headerQuery = opQuery.data.filter(h => h.uid === uid)[0]

        if (headerQuery) {
          return {
            ...headerQuery,
            connections: connQuery
          }
        }

        if (!headerQuery) {
          const subheaderQuery = opQuery.data
            .map(({ subheaders }) => subheaders.filter(s => s.uid === uid)[0])
            .filter(s => {
              if (s && s.uid) {
                return s.uid === uid
              }
            })[0]

          return {
            ...subheaderQuery,
            connections: connQuery
          }
        }
      } catch (err) {
        throw err
      }
    },

    operationConnection: async (_, { id }) => {
      try {
        return await queryConnection(id)
      } catch (err) {
        throw err
      }
    },
    operationConnections: async (_, { ids }) => {
      try {
        return await queryConnections(ids)
      } catch (err) {
        throw err
      }
    }
  },

  Operation: {
    name: root => root.operation,
    headers: (root, { uid }) => {
      return uid ? root.data.filter(d => d.uid === uid) : root.data
    }
  },

  OperationHeader: {
    subheaders: (root, { uid }) => {
      return uid ? root.subheaders.filter(s => s.uid === uid) : root.subheaders
    }
  }
}
