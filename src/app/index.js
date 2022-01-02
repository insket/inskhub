const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const userRouter = require('../router/user')
const errHandler = require('../app//error-handle')

const app = new Koa()

app.use(bodyParser())
app.use(userRouter.routes())
app.use(userRouter.allowedMethods())

app.on('error', errHandler)

module.exports = app
