const Router = require('koa-router');
const authRouter = require('./auth');

const router = new Router();

router.use('/', authRouter.routes(), authRouter.allowedMethods());

module.exports = router;
