const Koa = require('koa');
const path = require('path');
const log4js = require('koa-log4');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const serve = require('koa-static');
const session = require('koa-session');
const bodyParser = require('koa-bodyparser');
const { ApolloServer } = require('apollo-server-koa');

require('./config/dotenv');
require('./config/log4js');
require('./config/nodemailer');
require('./config/mongoose');

require('./api/models');
const schema = require('./api/graphql');

const logger = log4js.getLogger('app');
const User = mongoose.model('User');

const app = new Koa();
const apollo = new ApolloServer({
  schema,
  context: async ({ ctx }) => {
    try {
      const cookie = ctx.cookies.get('jwt');
      const token = jwt.verify(cookie, 'shhhhh');
      ctx.state.user = await User.findOne(token.sub);
    } catch (err) {
      logger.debug(err);
    }
    return ctx;
  }
});

app.keys = ['your-session-secret'];
app.use(session({}, app));
app.use(bodyParser());
app.use(log4js.koaLogger(log4js.getLogger('http'), { level: 'auto' }));
app.use(serve(path.join(__dirname, '../dist')));
app.use(apollo.getMiddleware());

app.listen(4000, () => {
  logger.info('GraphQL-demo server listen at http://localhost:4000');
  logger.info(`Server ready at http://localhost:4000${apollo.graphqlPath}`);
});
