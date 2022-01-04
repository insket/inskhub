const { addComment, replyCom } = require('../service/comment')

class CommentController {
	// 发表评论
	async createComment(ctx, next) {
		const { momentId, content } = ctx.request.body
		const { id } = ctx.user

		// 添加评论
		const result = await addComment(momentId, content, id)

		ctx.body = result
	}

	// 回复评论
	async replyComment(ctx, next) {
		const { momentId, content } = ctx.request.body
		const { commentId } = ctx.params
		const { id } = ctx.user

		const result = await replyCom(momentId, content, commentId, id)

		ctx.body = result
	}
}

module.exports = new CommentController()
