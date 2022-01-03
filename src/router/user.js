const Router = require('koa-router')
const {
  regUser,
  logUser,
  success
} = require('../controller/user')
const {
  verifyUser,
  verifyLogin,
  verifyAuth,
  handlePassword
} = require('../middleware/user')

const userRouter = new Router({prefix: '/users'})

// 注册
userRouter.post('/',verifyUser, handlePassword, regUser)

// 登录
userRouter.post('/login',verifyLogin, logUser)
userRouter.get('/test', verifyAuth, success)

module.exports = userRouter