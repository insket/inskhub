const Router = require('koa-router')
const {
  regUser
} = require('../controller/user')
const {
  verifyUser,
  handlePassword
} = require('../middleware/user')

const userRouter = new Router({prefix: '/users'})

userRouter.post('/',verifyUser, handlePassword, regUser)

module.exports = userRouter