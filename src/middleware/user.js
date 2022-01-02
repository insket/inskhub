const errorTypes = require('../constants/error-type')
const {getUserByName} = require('../service/user')
const md5Password = require('../utils/md5-password')

// 校验name 和 password
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

  // 对密码加密
const handlePassword = async (ctx, next) => {
  const {password} = ctx.request.body

  ctx.request.body.password = md5Password(password)

  await next()
}

module.exports = {
  verifyUser,
  handlePassword
}