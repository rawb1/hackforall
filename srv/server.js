const Koa = require('koa');
const path = require('path');
const log4js = require('koa-log4');
const serve = require('koa-static');
const bodyParser = require('koa-bodyparser');
const { ApolloServer } = require('apollo-server-koa');
const { graphqlUploadKoa } = require('graphql-upload');

const { playground, dev } = require('./config/env');
const cache = require('./config/cache');
require('./config/logger');
require('./config/mailer');
require('./config/mongo');
require('./config/keystore');
require('./config/minio');

require('./api/models');
const { userController, hackathonController } = require('./api/controllers');
const schema = require('./api/graphql');

const logger = log4js.getLogger('app');

const app = new Koa();
const apollo = new ApolloServer({
  schema,
  // Disable the built in file upload implementation that uses an outdated
  // `graphql-upload` version, see:
  // https://github.com/apollographql/apollo-server/issues/3508#issuecomment-662371289
  uploads: false,
  debug: dev,
  playground,
  context: async ({ ctx }) => {
    ctx.state.hackathon = await cache(
      'hackathon',
      hackathonController.findActive,
      5 * 60
    );
    ctx.state.user = await userController.authenticate(ctx);
    return ctx;
  }
});

app.use(bodyParser());
app.use(graphqlUploadKoa({ maxFileSize: 10000000, maxFiles: 10 }));
app.use(log4js.koaLogger(log4js.getLogger('http'), { level: 'auto' }));
app.use(serve(path.join(__dirname, '../dist')));
app.use(apollo.getMiddleware());

app.listen(4000, () => {
  logger.info(`Server ready at http://localhost:4000${apollo.graphqlPath}`);
});
