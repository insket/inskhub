const errorTypes = require('../constants/error-type')
const {
  getUserByName
} = require('../service/user')
const md5Password = require('../utils/md5-password')

// 注册 校验name 和 password
const verifyUser = async (ctx, next) => {
  // 获取用户名和密码
  const {
    name,
    password
  } = ctx.request.body

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

// 登录 校验name 和 password
const verifyLogin = async (ctx, next) => {
  // 获取用户名和密码
  const {
    name,
    password
  } = ctx.request.body

  // 判断用户名和密码是否为空
  if (!name || !password) {
    const err = new Error(errorTypes.NAME_OR_PASSWORD_REQUIRED)
    return ctx.app.emit('error', err, ctx)
  }

  // 判断用户是否存在
  const result = await getUserByName(name)
  const user = result[0]
  if (!user) {
    const err = new Error(errorTypes.USER_ISNOT_EXISTS)
    return ctx.app.emit('error', err, ctx)
  }

  // 判断密码和数据库中的密码是否一致(加密)
  if (md5Password(password) !== user.password) {
    const err = new Error(errorTypes.PASSWORD_IS_ERROR)
    return ctx.app.emit('error', err, ctx)
  }

  await next()
}

// 将参数替换为加密后的密码
const handlePassword = async (ctx, next) => {
  const {
    password
  } = ctx.request.body

  ctx.request.body.password = md5Password(password)

  await next()
}

module.exports = {
  verifyUser,
  verifyLogin,
  handlePassword
}