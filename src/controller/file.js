const fs = require('fs')
const { saveAvator, avatorInfoSer, savePic,picTypeSer} = require('../service/file')
const { AVATOR_PATH, PIC_PATH } = require('../constants/file-path')
const { updateAvatorUrlById } = require('../service/user')

class FileController {
	// 将头像图片保存到数据库
	async saveAvatorInfo(ctx, next) {
		// 获取图片相关信息
		//  console.log(ctx.req.file);
		const { mimetype, filename, size } = ctx.req.file
		const { id } = ctx.user

		// 将图像信息保存到数据库中
		const result = await saveAvator(mimetype, filename, size, id)

		// 将图片地址保存到users中
		const avatorUrl = `${APP_HOST}:${APP_PORT}/file/avator/${id}`
		await updateAvatorUrlById(avatorUrl, id)

		ctx.body = '上传头像成功'
	}

	// 查看用户头像
	async avatorInfo(ctx, next) {
		const { userId } = ctx.params
		const result = await avatorInfoSer(userId)

		// 提供图片信息
		const avator = fs.createReadStream(`${AVATOR_PATH}/${result.filename}`)
		ctx.response.set('content-type', result.mimetype)
		ctx.body = avator
	}

	// 动态头像
	async savaPicInfo(ctx, next) {
		// 获取图片信息
		const { files } = ctx.req
		const { id } = ctx.user
    const {momentId} = ctx.query

		// 将图片信息放到数据库
		for (const file of files) {
			const { filename, mimetype, size} = file
      const result = await savePic(filename, mimetype, size, id, momentId)
		}

    ctx.body = '动态图片上传完成'
	}

  // 查看动态图片
  async picInfo(ctx, next) {
    const { filename} = ctx.params
    const pictype = await picTypeSer(filename)
    ctx.response.set('content-type', pictype.mimetype)
    ctx.body = fs.createReadStream(`${PIC_PATH}/${filename}`)
  }
}

module.exports = new FileController()
