const errorTypes = require('../constants/error-type')

const errHandler = (err, ctx) => {
  let code, message

  switch (err.message) {
    case errorTypes.NAME_OR_PASSWORD_REQUIRED:
      code = 400  // Bad Request
      message = '用户名或密码为空'
      break;
    case errorTypes.USER_ISEXISTS:
      code = 409 // Conflict Request  冲突
      message = '用户已存在'
      break;
    case errorTypes.USER_ISNOT_EXISTS:
      code = 400 // 参数错误
      message = '用户不存在'
      break;
    case errorTypes.PASSWORD_IS_ERROR:
      code = 400 // 参数错误
      message = '用户名或密码错误'
      break;
    default:
      code = 404
      message = 'NOT FOUND'
  }
  ctx.status = code
  ctx.body = message
}

module.exports = errHandler