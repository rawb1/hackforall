const { gql } = require('apollo-server-koa');
const mongoose = require('mongoose');
const fs = require('fs');

const UserModel = mongoose.model('User');
const CourseModel = mongoose.model('Course');
const InfoModel = mongoose.model('Info');
const StudentModel = mongoose.model('Student');

const typeDefs = gql(
  fs.readFileSync(__dirname.concat('/schemas/schema.graphql'), 'utf8')
);

const resolvers = {
  Query: {
    getUser: (parent, args, context, info) => {
      return UserModel.find({});
    },
    getCourse: (parent, args, context, info) => {
      return CourseModel.find({});
    },
    getStudent: (parent, args, context, info) => {
      return StudentModel.find({});
    },
    getStudentInfo: async (parent, args, context, info) => {
      const res = await InfoModel.find({ studentId: args.id });
      return res[0];
    },
    getInfo: (parent, args, context, info) => {
      return InfoModel.find({});
    }
  },
  Mutation: {
    addCourse: (parent, args, context) => {
      const { title, desc, page, author } = args.post;
      return CourseModel.create({ title, desc, page, author });
    },
    addStudent: (parent, args, context) => {
      const { name, sex, age } = args.post;
      return StudentModel.create({ name, sex, age });
    },
    addStudentInfo: (parent, args, context) => {
      const { id, height, weight, hobby } = args;
      return InfoModel.create({ hobby, height, weight, studentId: id });
    },
    changeStudentInfo: (parent, args, context) => {
      const { id, height, weight, hobby } = args;
      return InfoModel.findOneAndUpdate(
        { studentId: id },
        { hobby, height, weight }
      );
    }
  }
};

module.exports = {
  resolvers,
  typeDefs
};
