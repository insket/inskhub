const Router = require('koa-router')
const { verifyAuth, verifyPermission } = require('../middleware/user')
const { createComment, replyComment, updateComment, removeComment } = require('../controller/comment')

const commentRouter = new Router({ prefix: '/comment' })

// 发表评论
commentRouter.post('/', verifyAuth, createComment)

// 回复评论
commentRouter.post('/reply/:commentId', verifyAuth, replyComment)

// 修改评论
commentRouter.patch('/:commentId', verifyAuth,verifyPermission, updateComment)

// 删除评论
commentRouter.delete('/:commentId', verifyAuth,verifyPermission, removeComment)


module.exports = commentRouter
