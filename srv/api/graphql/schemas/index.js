const { merge } = require('lodash');
const { constraintDirectiveTypeDefs } = require('graphql-constraint-directive');

const userSchema = require('./userSchema');
const hackerSchema = require('./hackerSchema');
const applicationSchema = require('./applicationSchema');
const teamSchema = require('./teamSchema');
const hackathonSchema = require('./hackathonSchema');
const baseSchema = require('./baseSchema');
const statsSchema = require('./statsSchema');

module.exports = {
  typeDefs: [
    constraintDirectiveTypeDefs,
    baseSchema.typeDefs,
    userSchema.typeDefs,
    hackerSchema.typeDefs,
    applicationSchema.typeDefs,
    teamSchema.typeDefs,
    hackathonSchema.typeDefs,
    statsSchema.typeDefs
  ],
  resolvers: merge(
    baseSchema.resolvers,
    userSchema.resolvers,
    hackerSchema.resolvers,
    applicationSchema.resolvers,
    teamSchema.resolvers,
    hackathonSchema.resolvers,
    statsSchema.resolvers
  )
};
