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

  // 查询用户的名字
  async getUserByName(name) {
    const statement = `SELECT * FROM users WHERE name = ?;`
    const result = await conn.execute(statement, [name])
    return result[0]
  }

  // 将头像保存到users表中
  async updateAvatorUrlById(avatorUrl, id) {
    const statement = `UPDATE users SET avator_url = ? WHERE id = ?;`
    const result = await conn.execute(statement, [avatorUrl, id])
    return result
  }
}

module.exports = new UserService()