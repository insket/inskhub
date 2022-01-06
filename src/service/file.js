const conn = require('../app/database')

class FileService {
  // 保存头像
	async saveAvator(mimetype, filename, size, userId) {
    // 判断是否有用户 有则替换 没有添加
    const hasUser = `SELECT * FROM avator WHERE user_id = ?;`
    const isHasUer = await conn.execute(hasUser, [userId])
    // console.log(isHasUer);
    if (!isHasUer[0].length) {
      const statement = `INSERT INTO avator (filename, mimetype, size, user_id) VALUES (?,?,?,?);`
      const [result] = await conn.execute(statement, [filename, mimetype, size, userId])
      return result
    } else {
      const updateAvator = `UPDATE avator SET filename = ?, mimetype = ?, size = ? WHERE user_id = ?;`
      const [result] = await conn.execute(updateAvator, [filename, mimetype, size, userId])
      return result
    }
	}

  // 查看头像
  async avatorInfoSer(userId) {
    const statement = `SELECT * FROM avator WHERE user_id = ?;`
    const [result] = await conn.execute(statement, [userId])
    return result[0]
  }
}

module.exports = new FileService()
