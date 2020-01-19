const Koa = require('koa');
const path = require('path');
const log4js = require('koa-log4');
const serve = require('koa-static');
const Router = require('koa-router');
const session = require('koa-session');
const bodyParser = require('koa-bodyparser');
const passport = require('koa-passport');
const { ApolloServer } = require('apollo-server-koa');

require('./config');
require('./logger');
require('./mongodb');
require('./passport');
require('./mailer');

const logger = log4js.getLogger('app');

const routerMap = require('./router');
const schema = require('./graphql');
const jwt = require('./passport/strategies/jwt');

const app = new Koa();
const router = new Router({ prefix: '/api' });
const apollo = new ApolloServer({
  schema,
  context: ({ ctx }) => ctx
});

app.keys = ['your-session-secret'];
app.use(session({}, app));
app.use(bodyParser());
app.use(log4js.koaLogger(log4js.getLogger('http'), { level: 'auto' }));
app.use(serve(path.join(__dirname, '../dist')));
app.use(passport.initialize());
app.use(passport.session());
app.use(jwt);
// app.use(passport.authenticate('jwt', { session: false }));
router.use(routerMap.routes());
app.use(router.routes());
app.use(router.allowedMethods());
app.use(apollo.getMiddleware());

app.listen(4000, () => {
  logger.info('GraphQL-demo server listen at http://localhost:4000');
  logger.info(`Server ready at http://localhost:4000${apollo.graphqlPath}`);
});
