const Router = require('koa-router')
const { verifyAuth, verifyPermission } = require('../middleware/user')
const { createDynamic, detailDynamic, listDynamic, updateDynamic } = require('../controller/moment')

const momentRouter = new Router({ prefix: '/moment' })

// 发表动态
momentRouter.post('/', verifyAuth, createDynamic)

// 获取某一条动态 (获取动态id)
momentRouter.get('/:momentId', detailDynamic)

// 查询多条动态
momentRouter.get('/', listDynamic)

// 修改动态
momentRouter.patch('/:momentId', verifyAuth, verifyPermission, updateDynamic)

module.exports = momentRouter
