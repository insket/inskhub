const Router = require('koa-router')
const {
  regUser,
  logUser
} = require('../controller/user')
const {
  verifyUser,
  verifyLogin,
  handlePassword
} = require('../middleware/user')

const userRouter = new Router({prefix: '/users'})

// 注册
userRouter.post('/',verifyUser, handlePassword, regUser)

// 登录
userRouter.post('/login',verifyLogin, logUser)

module.exports = userRouter