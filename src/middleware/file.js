const multer = require('koa-multer')
const { AVATOR_PATH } = require('../constants/file-path')

const avatorUpload = multer({
  dest: AVATOR_PATH
})

const avatorHandler = avatorUpload.single('avator')

module.exports = {
  avatorHandler
}