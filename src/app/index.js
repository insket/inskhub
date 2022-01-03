const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const useRoutes = require('../router')
const errHandler = require('../app//error-handle')

const app = new Koa()

app.use(bodyParser())

// 统一动态加载路由
useRoutes(app)

app.on('error', errHandler)

module.exports = app
