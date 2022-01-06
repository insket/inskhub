const Router = require('koa-router')
const { avatorHandler } = require('../middleware/file')
const { saveAvatorInfo, avatorInfo } = require('../controller/file')

const { verifyAuth } = require('../middleware/user')

const fileRouter = new Router({prefix: '/file'})

// 上传头像
fileRouter.post('/avator', verifyAuth, avatorHandler, saveAvatorInfo)

fileRouter.get('/avator/:userId', avatorInfo)

module.exports = fileRouter