const conn = require('../app/database')

// sql相同的片段
const sqlFragment = `
  SELECT m.id mid, m.content content, m.createAt createTime, m.updateAt updateTime,
  JSON_OBJECT('id', u.id, 'name', u.name) userInfo
  FROM moment m
  LEFT JOIN users u ON m.user_id = u.id
`

class MomentService {
	// 插入动态
	async insertDynamic(userId, content) {
		const statement = `INSERT INTO moment (content, user_id) VALUES (?, ?);`

		const [result] = await conn.execute(statement, [content, userId])
		return result
	}

	// 根据id查询动态
	async getMomentById(id) {
		const statement = `${sqlFragment}WHERE m.id = ?;`
		const [result] = await conn.execute(statement, [id])
		return result[0]
	}

	// 查询多条动态
	async getMomentLIst(offset, limit) {
		const statement = `${sqlFragment}LIMIT ?,?;`

		const [result] = await conn.execute(statement, [offset, limit])
		return result
	}
}

module.exports = new MomentService()
