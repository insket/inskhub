const conn = require('../app/database')

// sql相同的片段
// const sqlFragment = `
//   SELECT m.id mid, m.content content, m.createAt createTime, m.updateAt updateTime,
//   JSON_OBJECT('id', u.id, 'name', u.name) userInfo,
//   (SELECT COUNT(*) FROM comment c WHERE c.moment_id = m.id) commentCount
//   FROM moment m
//   LEFT JOIN users u ON m.user_id = u.id
// `

class MomentService { 
	// 插入动态
	async insertDynamic(userId, content) {
		const statement = `INSERT INTO moment (content, user_id) VALUES (?, ?);`

		const [result] = await conn.execute(statement, [content, userId])
		return result
	}

	// 根据id查询动态
	async getMomentById(id) {
    const statement = `
      SELECT m.id mid, m.content content, m.createAt createTime, m.updateAt updateTime,
      JSON_OBJECT('id', u.id, 'name', u.name) userInfo,
      JSON_ARRAYAGG(JSON_OBJECT('id', c.id,'content',c.content, 'comment_id', c.comment_id, 'user', 
      JSON_OBJECT('id', cu.id, 'name', cu.name))) comment
      FROM moment m
      LEFT JOIN users u ON m.user_id = u.id
      LEFT JOIN comment c ON c.moment_id = m.id
      LEFT JOIN users cu ON c.user_id = cu.id
      WHERE m.id = ?;
    `
    // JSON_OBKECT('id', u.createAt, 'name', u.updateAt) author
		const [result] = await conn.execute(statement, [id])
		return result[0]
	}

	// 查询多条动态
	async getMomentLIst(offset, limit) {

  const statement = `
    SELECT m.id mid, m.content content, m.createAt createTime, m.updateAt updateTime,
    JSON_OBJECT('id', u.id, 'name', u.name) userInfo,
    (SELECT COUNT(*) FROM comment c WHERE c.moment_id = m.id) commentCount
    FROM moment m
    LEFT JOIN users u ON m.user_id = u.id LIMIT ?,?;
  `

		const [result] = await conn.execute(statement, [offset, limit])
		return result
	}

	// 修改动态
	async updateMoment(content, momentId) {
		const statement = `UPDATE moment SET content = ? WHERE id = ?;`

		const [result] = await conn.execute(statement, [content, momentId])
		return result
	}

	// 删除动态
	async removeMoment(id) {
		const statement = `DELETE FROM moment WHERE id = ?;`
		const [result] = await conn.execute(statement, [id])
		return result
	}
}

module.exports = new MomentService()
