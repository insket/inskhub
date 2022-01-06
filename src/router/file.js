const Router = require('koa-router')
const { avatorHandler, picHandler } = require('../middleware/file')
const { saveAvatorInfo, avatorInfo, savaPicInfo, picInfo } = require('../controller/file')

const { verifyAuth } = require('../middleware/user')

const fileRouter = new Router({prefix: '/file'})

// 上传头像
fileRouter.post('/avator', verifyAuth, avatorHandler, saveAvatorInfo)

// 查看头像
fileRouter.get('/avator/:userId', avatorInfo)

// 动态图片
fileRouter.post('/pic', verifyAuth, picHandler, savaPicInfo)

// 查看动态图片
fileRouter.get('/pic/:filename', picInfo)

module.exports = fileRouter