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
}

module.exports = new UserController()