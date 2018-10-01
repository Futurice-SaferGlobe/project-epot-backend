import { queryOperation } from '@/models/operationModel'

export const resolvers = {
  Query: {
    info: () => `Ping`,
    operation: async (_, { id }) => {
      try {
        return await queryOperation(id)
      } catch (err) {
        throw err
      }
    }
  },

  Operation: {
    name: root => root.operation,
    headers: root => root.data
  },

  OperationHeader: {
    subheaders: root => root.subheaders
  }
}
