const conn = require('../app/database')

class MomentService{
  // 插入动态
  async insertDynamic(userId, content) {
    const statement = `INSERT INTO moment (content, user_id) VALUES (?, ?);`

    const result = await conn.execute(statement, [content, userId])
    return result
  }
}

module.exports = new MomentService()