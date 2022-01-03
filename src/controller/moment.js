const { insertDynamic } = require('../service/moment')

class MomentController{
  // 发表动态
  async createDynamic(ctx, next) {
    // 获取数据(user_id, content)
    const userId = ctx.user.id
    const content = ctx.request.body.content

    // 将数据插入到数据库
    const result = await insertDynamic(userId, content)

    ctx.body = result

  }
}

module.exports = new MomentController()