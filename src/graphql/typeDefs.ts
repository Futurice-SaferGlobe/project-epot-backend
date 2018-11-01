import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  type Query {
    info: String!
    operations(ids: [ID]): [Operation]
    operation(id: ID!): Operation
    operationConnection(id: ID!): OperationConnection
    operationConnections(ids: [ID]): [OperationConnection]
  }

  type Operation {
    internalId: ID!
    name: String
    area: String
    headers(index: Int): [OperationHeader]
  }

  type OperationHeader {
    uid: ID!
    index: Int!
    title: String
    content: String
    labels: [String]
    subheaders(index: Int): [OperationSubHeader]
  }

  type OperationSubHeader {
    uid: ID!
    index: Int!
    title: String
    content: String
  }

  type OperationConnection {
    operationInternalId: ID!
    connections: [OperationConnectionCollection]
  }

  type OperationConnectionCollection {
    from: String
    to: String
    type: String
  }
`
