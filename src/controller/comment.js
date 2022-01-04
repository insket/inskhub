const { addComment } = require('../service/comment')

class CommentController {
	// 发表评论
	async createComment(ctx, next) {
		const { momentId, content } = ctx.request.body
		const { id } = ctx.user

		// 添加评论
		const result = await addComment(momentId, content, id)

		ctx.body = result
	}
}

module.exports = new CommentController()
