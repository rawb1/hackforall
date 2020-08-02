const Koa = require('koa');
const path = require('path');
const log4js = require('koa-log4');
const serve = require('koa-static');
const session = require('koa-session');
const bodyParser = require('koa-bodyparser');
const { ApolloServer } = require('apollo-server-koa');
const { graphqlUploadKoa } = require('graphql-upload');

const { sessionSettings, cookie } = require('./config/env');
require('./config/logger');
require('./config/mailer');
require('./config/mongo');

require('./api/models');
const schema = require('./api/graphql');
const logger = log4js.getLogger('app');
const { authenticate } = require('./api/controllers/userController');

const app = new Koa();
const apollo = new ApolloServer({
  schema,
  // Disable the built in file upload implementation that uses an outdated
  // `graphql-upload` version, see:
  // https://github.com/apollographql/apollo-server/issues/3508#issuecomment-662371289
  uploads: false,
  context: authenticate
});

app.keys = cookie.keys;
app.use(session(app, sessionSettings));
app.use(bodyParser());
app.use(graphqlUploadKoa({ maxFileSize: 10000000, maxFiles: 10 }));
app.use(log4js.koaLogger(log4js.getLogger('http'), { level: 'auto' }));
app.use(serve(path.join(__dirname, '../dist')));
app.use(apollo.getMiddleware());

app.listen(4000, () => {
  logger.info(`Server ready at http://localhost:4000${apollo.graphqlPath}`);
});
