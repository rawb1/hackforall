const Router = require('koa-router');

const { register, login } = require('../controllers/auth');

const authRouter = new Router();

authRouter.post('/register', register);
authRouter.post('/login', login);

module.exports = authRouter;
