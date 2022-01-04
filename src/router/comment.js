const Router = require('koa-router')
const { verifyAuth } = require('../middleware/user')
const { createComment } = require('../controller/comment')

const commentRouter = new Router({ prefix: '/comment' })

// 发表评论
commentRouter.post('/', verifyAuth, createComment)

module.exports = commentRouter
