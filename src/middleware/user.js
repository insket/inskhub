const errorTypes = require('../constants/error-type')
const { getUserByName } = require('../service/user')
const { checkMoment } = require('../service/auth')
const md5Password = require('../utils/md5-password')
const jwt = require('jsonwebtoken')
const { PUBLIC_KEY } = require('../app/config')

// 注册 校验name 和 password
const verifyUser = async (ctx, next) => {
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

// 登录 校验name 和 password
const verifyLogin = async (ctx, next) => {
	// 获取用户名和密码
	const { name, password } = ctx.request.body

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

	// 向ctx中添加user
	ctx.user = user

	await next()
}

// 校验token
const verifyAuth = async (ctx, next) => {
	// 获取token
	const authorization = ctx.headers.authorization
	if (!authorization) {
		const err = new Error(errorTypes.UNAUTHTOKEN)
		return ctx.app.emit('error', err, ctx)
	}
	const token = authorization.replace('Bearer ', '')

	// 验证token
	try {
		const result = jwt.verify(token, PUBLIC_KEY, {
			algorithms: ['RS256'],
		})
		// 将用户信息存储到ctx.user中
		ctx.user = result
		await next()
	} catch (error) {
		const err = new Error(errorTypes.UNAUTHTOKEN)
		ctx.app.emit('error', err, ctx)
	}
}

// 将参数替换为加密后的密码
const handlePassword = async (ctx, next) => {
	const { password } = ctx.request.body

	ctx.request.body.password = md5Password(password)

	await next()
}

// 校验修改动态是不是本人
const verifyPermission = async (ctx, next) => {
	// 获取参数
	const { momentId } = ctx.params
	const { id } = ctx.user

  // 查询是否具有修改权限
  const isPermission  = await checkMoment(momentId, id)
  if (!isPermission) {
    const err = new Error(errorTypes.UNPERMISSION)
    return ctx.app.emit('error', err, ctx)
  }

	await next()
}

module.exports = {
	verifyUser,
	verifyLogin,
	handlePassword,
	verifyAuth,
	verifyPermission,
}
