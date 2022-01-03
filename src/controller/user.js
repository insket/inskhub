const {
  regUser
} = require('../service/user')

class UserController{
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
    const { name } = ctx.request.body
    ctx.body = `${name} 登陆成功`
  }
}

module.exports = new UserController()