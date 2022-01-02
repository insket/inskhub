const errorTypes = require('../constants/error-type')
const {getUserByName} = require('../service/user')

const verifyUser = async (ctx, next ) => {
  // 获取用户名和密码
  const { name, password } = ctx.request.body

  // name password 不能为空、
  if (!name || !password) {
    const err = new Error(errorTypes.NAME_OR_PASSWORD_REQUIRED)
    return ctx.app.emit('error', err, ctx)
  }

  // 判断是否注册
  const result = await getUserByName(name)
  if (result.length) {
    const err = new Error(errorTypes.USER_ISEXISTS)
    return ctx.app.emit('error', err, ctx)
  }

  await next()
}

module.exports = {
  verifyUser
}