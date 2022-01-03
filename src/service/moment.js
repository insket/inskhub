const conn = require('../app/database')

class MomentService {
	// 插入动态
	async insertDynamic(userId, content) {
		const statement = `INSERT INTO moment (content, user_id) VALUES (?, ?);`

		const result = await conn.execute(statement, [content, userId])
		return result
	}

	// 查询动态
	async getMomentById(id) {
		const statement = `
      SELECT m.id mid, m.content content, m.createAt createTime, m.updateAt updateTime,
      JSON_OBJECT('id', u.id, 'name', u.name) author
      FROM moment m
      LEFT JOIN users u ON m.user_id = u.id
      WHERE m.id = ?;
    `
    const result = await conn.execute(statement, [id])
    return result[0]
	}
}

module.exports = new MomentService()
