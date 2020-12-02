const { gql } = require('apollo-server-koa');

const { userController } = require('../../controllers');

const typeDefs = gql`
  directive @auth(requires: Role!) on OBJECT | FIELD_DEFINITION

  enum Role {
    ADMIN
    USER
  }

  type User {
    id: ID @auth(requires: ADMIN)
    username: String!
    email: String! @constraint(format: "email")
    role: Role!
  }

  input UserInput {
    username: String
    email: String! @constraint(format: "email")
    password: String!
  }

  extend type Query {
    login(user: UserInput!, remember: Boolean = false): User
    logout: Boolean
    forgot(email: String!): String
  }

  extend type Mutation {
    register(user: UserInput!): User
    reset(resetToken: String!, newPassword: String!): Boolean
  }
`;

const resolvers = {
  Query: {
    login: (_, { user: { username, email, password }, remember }, ctx) =>
      userController.login(ctx, username, email, password, remember),
    logout: (_, __, { cookies }) => userController.logout(cookies),
    forgot: (_, { email }, { origin }) => userController.forgot(origin, email)
  },
  Mutation: {
    register: (_, { user: { username, email, password } }, ctx) =>
      userController.register(ctx, username, email, password),
    reset: (_, { resetToken, newPassword }, ctx) =>
      userController.reset(ctx, resetToken, newPassword)
  }
};

module.exports = {
  typeDefs,
  resolvers
};
