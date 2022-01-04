const { addComment, replyCom, updateCom, removeCom } = require('../service/comment')

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

	// 修改评论
	async updateComment(ctx, next) {
		const { commentId } = ctx.params
		const { content } = ctx.request.body

		const result = await updateCom(commentId, content)

		ctx.body = result
	}

	// 删除评论
	async removeComment(ctx, next) {
		const { commentId } = ctx.params
		const result = await removeCom(commentId)
		ctx.body = result
	}
}

module.exports = new CommentController()
