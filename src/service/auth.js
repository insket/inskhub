const conn = require('../app/database')

class AuthService{
  // 校验是否具有修改权限
  async checkMoment(momentId, userId) {
    const statement =`SELECT * FROM moment WHERE id = ? AND user_id = ?;`
    const [result] = await conn.execute(statement, [momentId, userId])
    return result.length === 0 ? false : true
  }
}

module.exports = new AuthService()