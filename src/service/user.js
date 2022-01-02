const conn = require('../app/database')

class UserService{ 
  // 用户注册
  async regUser(user) {
    // 拿到当前请求参数
    const {name, password} = user
    const statement = `INSERT INTO users (name, password) VALUES (?, ?);`

    const result = await conn.execute(statement, [name, password])

    return result
  }

  // 得到用户的名字
  async getUserByName(name) {
    const statement = `SELECT * FROM users WHERE name = ?;`
    const result = await conn.execute(statement, [name])
    return result[0]
  }
}

module.exports = new UserService()