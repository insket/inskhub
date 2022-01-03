const Router = require('koa-router')
const { verifyAuth } = require('../middleware/user')
const { createDynamic, detailDynamic } = require('../controller/moment')

const momentRouter = new Router({ prefix: '/moment' })

// 发表动态
momentRouter.post('/', verifyAuth, createDynamic)

// 获取某一条动态 (获取动态id)
momentRouter.get('/:momentId', detailDynamic)

module.exports = momentRouter
