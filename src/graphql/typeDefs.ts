import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  type Query {
    info: String!
    operations: [Operation!]
    operation(id: ID!): Operation
  }

  type Operation {
    internalId: ID!
    name: String
    area: String
    headers(index: Int): [OperationHeader]
  }

  type OperationHeader {
    index: Int!
    title: String
    content: String
    labels: [String]
    subheaders(index: Int): [OperationSubHeader]
  }

  type OperationSubHeader {
    index: Int!
    title: String
    content: String
  }
`
