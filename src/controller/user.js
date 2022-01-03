const {
  regUser
} = require('../service/user')
const jwt = require('jsonwebtoken')
const {
  PRIVATE_KEY
} = require('../app/config')

class UserController {
  // 注册用户的逻辑
  async regUser(ctx, next) {
    // 获取用户请求传递的参数
    const user = ctx.request.body

    // 查询数据
    const data = await regUser(user)

    // 返回数据
    ctx.body = data
  }

  // 用户登录的逻辑
  async logUser(ctx, next) {
    // 从ctx.user中拿到用户信息
    const {
      id,
      name
    } = ctx.user
    const token = jwt.sign({
      id,
      name
    }, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24 * 7,
      algorithm: 'RS256'
    })

    ctx.body = {
      id,
      name,
      token
    }
  }

  async success(ctx, next) {
    console.log('asdad');
    ctx.body = '有效的token'
  }
}

module.exports = new UserController()