const { merge } = require('lodash');
const { gql } = require('apollo-server-koa');
const { constraintDirectiveTypeDefs } = require('graphql-constraint-directive');
const GraphQLDate = require('graphql-date');

const userSchema = require('./userSchema');
const hackerSchema = require('./hackerSchema');
const applicationSchema = require('./applicationSchema');
const teamSchema = require('./teamSchema');
const hackathonSchema = require('./hackathonSchema');
const statsSchema = require('./statsSchema');
const sponsorSchema = require('./sponsorSchema');
const fileSchema = require('./fileSchema');

const typeDefs = gql`
  directive @cacheControl(
    maxAge: Int
    scope: CacheControlScope
  ) on OBJECT | FIELD_DEFINITION

  enum CacheControlScope {
    PUBLIC
    PRIVATE
  }

  scalar Date

  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`;

const resolvers = {
  Date: GraphQLDate
};

module.exports = {
  typeDefs: [
    constraintDirectiveTypeDefs,
    typeDefs,
    userSchema.typeDefs,
    hackathonSchema.typeDefs,
    hackerSchema.typeDefs,
    applicationSchema.typeDefs,
    teamSchema.typeDefs,
    statsSchema.typeDefs,
    sponsorSchema.typeDefs,
    fileSchema.typeDefs
  ],
  resolvers: merge(
    resolvers,
    userSchema.resolvers,
    hackathonSchema.resolvers,
    hackerSchema.resolvers,
    applicationSchema.resolvers,
    teamSchema.resolvers,
    statsSchema.resolvers,
    sponsorSchema.resolvers,
    fileSchema.resolvers
  )
};
