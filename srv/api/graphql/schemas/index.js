const { merge } = require('lodash');
const { constraintDirectiveTypeDefs } = require('graphql-constraint-directive');

const userSchema = require('./userSchema');
const hackerSchema = require('./hackerSchema');
const applicationSchema = require('./applicationSchema');
const teamSchema = require('./teamSchema');
const hackathonSchema = require('./hackathonSchema');
const baseSchema = require('./baseSchema');
const statsSchema = require('./statsSchema');
const sponsorSchema = require('./sponsorSchema');
const fileSchema = require('./fileSchema');

module.exports = {
  typeDefs: [
    constraintDirectiveTypeDefs,
    baseSchema.typeDefs,
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
    baseSchema.resolvers,
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
