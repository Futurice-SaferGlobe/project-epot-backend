import { queryOperation, queryOperations } from '@/models/operationModel'

export const resolvers = {
  Query: {
    info: () => `Ping`,
    operations: async () => queryOperations(),
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
    headers: (root, { index }) =>
      index ? root.data.filter(d => d.index === index) : root.data
  },

  OperationHeader: {
    subheaders: (root, { index }) =>
      index ? root.subheaders.filter(s => s.index === index) : root.subheaders
  }
}
