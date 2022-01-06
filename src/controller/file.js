const fs = require('fs')
const { saveAvator, avatorInfoSer } = require('../service/file')
const { AVATOR_PATH } = require('../constants/file-path')
const { updateAvatorUrlById} = require('../service/user')

class FileController{
  // 将头像图片保存到数据库
  async saveAvatorInfo(ctx, next) {
    // 获取图片相关信息
    //  console.log(ctx.req.file);
    const {mimetype, filename, size} =  ctx.req.file
    const {id} = ctx.user

    // 将图像信息保存到数据库中
    const result = await saveAvator(mimetype, filename, size, id)

    // 将图片地址保存到users中
    const avatorUrl = `${APP_HOST}:${APP_PORT}/file/avator/${id}`
    await updateAvatorUrlById(avatorUrl, id)

    ctx.body = '上传头像成功'
  }

  // 用户头像
  async avatorInfo(ctx, next) {
    const {userId} = ctx.params
    const result = await avatorInfoSer(userId)

    // 提供图片信息
    const avator = fs.createReadStream(`${AVATOR_PATH}/${result.filename}`)
    ctx.response.set('content-type', result.mimetype)
    ctx.body = avator
  }
}

module.exports = new FileController()