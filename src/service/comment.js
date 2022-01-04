const conn = require('../app/database')

class CommentService{
  async addComment(momentId, content, id) {
    const statement = `INSERT INTO comment (content,moment_id,user_id) VALUES (?,?,?);`
    const [result] = await conn.execute(statement, [content, momentId, id])
    return result
  }
}

module.exports = new CommentService()
