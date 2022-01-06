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
      JSON_OBJECT('id', u.id, 'name', u.name, 'avatorUrl', u.avator_url) userInfo,
      IF(COUNT(c.id),JSON_ARRAYAGG(JSON_OBJECT('id', c.id,'content',c.content, 'comment_id', c.comment_id, 		'user', 
        JSON_OBJECT('id', cu.id, 'name', cu.name, 'avatorUrl', cu.avator_url))) ,NULL) comments,
      IF(COUNT(l.id),JSON_ARRAYAGG(JSON_OBJECT('id', l.id, 'label', l.name)),NULL) labels,
      (SELECT JSON_ARRAYAGG(CONCAT('http://localhost:8080/file/pic/',picture.filename)) FROM picture WHERE m.id = picture.moment_id) images
      FROM moment m 
      LEFT JOIN users u ON m.user_id = u.id
      LEFT JOIN comment c ON c.moment_id = m.id
      LEFT JOIN users cu ON c.user_id = cu.id
      LEFT JOIN moment_label ml ON m.id = ml.moment_id
      LEFT JOIN label l ON ml.label_id = l.id
      WHERE m.id = ?
      GROUP BY m.id;
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
    (SELECT COUNT(*) FROM comment c WHERE c.moment_id = m.id) commentCount,
    (SELECT COUNT(*) FROM moment_label ml WHERE ml.moment_id = m.id) labelCount
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

	// 添加标签
	async AddLabelsSer(momentId, label) {
		// 查询标签对应的数据
		const statement = `SELECT * FROM label WHERE name = ?;`
		const [result] = await conn.execute(statement, [label])

		// 如果动态中含有标签不添加
		const hasLabel = `SELECT * FROM moment_label WHERE moment_id = ? AND label_id = ?;`
		const ishas = await conn.execute(hasLabel, [momentId, result[0].id])
		if (ishas[0].length) {
			return
		}
		//添加标签
		const insert = `INSERT INTO moment_label (moment_id, label_id) VALUES (?,?);`
		const [data] = await conn.execute(insert, [momentId, result[0].id])
		return data
	}
}

module.exports = new MomentService()
