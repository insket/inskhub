const { insertDynamic, getMomentById, getMomentLIst, updateMoment, removeMoment } = require('../service/moment')

class MomentController {
	// 发表动态
	async createDynamic(ctx, next) {
		// 获取数据(user_id, content)
		const userId = ctx.user.id
		const { content } = ctx.request.body

		// 将数据插入到数据库
		const result = await insertDynamic(userId, content)

		ctx.body = result
	}

	// 查询某一条动态
	async detailDynamic(ctx, next) {
		// 获取
		const { momentId } = ctx.params

		// 从数据库中查询动态
		const result = await getMomentById(momentId)

		ctx.body = result
	}

	// 查询多条动态
	async listDynamic(ctx, next) {
		// 获取offset / limit
		const { offset, limit } = ctx.query
		// 从数据库中查询动态
		const result = await getMomentLIst(offset, limit)

		ctx.body = result
	}

	// 更新动态
	async updateDynamic(ctx, next) {
		// 获取动态id  修改内容
		const { momentId } = ctx.params
		const { content } = ctx.request.body

		const result = await updateMoment(content, momentId)

		ctx.body = result
	}

	// 删除动态
	async removeDynamic(ctx, next) {
		const { momentId } = ctx.params

		const result = await removeMoment(momentId)
		ctx.body = result
	}
}

module.exports = new MomentController()
