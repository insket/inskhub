const conn = require('../app/database')

class CommentService {
	// 发表评论
	async addComment(momentId, content, id) {
		const statement = `INSERT INTO comment (content,moment_id,user_id) VALUES (?,?,?);`
		const [result] = await conn.execute(statement, [content, momentId, id])
		return result
	}

	// 回复评论
	async replyCom(momentId, content, commentId, id) {
		const statement = `INSERT INTO comment (content,moment_id,user_id, comment_id) VALUES (?, ?, ?, ?);`
		const [result] = await conn.execute(statement, [content, momentId, id, commentId])
		return result
	}

	// 修改评论
	async updateCom(commentId, content) {
		const statement = `UPDATE comment SET content = ? WHERE id = ?;`

		const [result] = await conn.execute(statement, [content, commentId])
		return result
	}

	// 删除评论
	async removeCom(commentId) {
		const statement = `DELETE FROM comment WHERE id = ?`

		const [result] = await conn.execute(statement, [commentId])
		return result
	}
}

module.exports = new CommentService()
