const Router = require('koa-router')
const {
  regUser
} = require('../controller/user')
const {
  verifyUser
} = require('../middleware/user')

const userRouter = new Router({prefix: '/users'})

userRouter.post('/',verifyUser, regUser)

module.exports = userRouter