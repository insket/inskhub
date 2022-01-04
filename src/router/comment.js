const Router = require('koa-router')
const { verifyAuth } = require('../middleware/user')
const { createComment, replyComment } = require('../controller/comment')

const commentRouter = new Router({ prefix: '/comment' })

// 发表评论
commentRouter.post('/', verifyAuth, createComment)

// 回复评论
commentRouter.post('/reply/:commentId', verifyAuth, replyComment)

module.exports = commentRouter
