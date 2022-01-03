const Router = require('koa-router')
const { verifyAuth } = require('../middleware/user') 
const { createDynamic } = require('../controller/moment')

const momentRouter = new Router({prefix: '/moment'})

// 发表动态
momentRouter.post('/', verifyAuth, createDynamic)

module.exports = momentRouter