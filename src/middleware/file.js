const multer = require('koa-multer')
const { AVATOR_PATH, PIC_PATH } = require('../constants/file-path')

const avatorUpload = multer({
  dest: AVATOR_PATH
})

const avatorHandler = avatorUpload.single('avator')

const picUpload = multer({
  dest: PIC_PATH
})

const picHandler = picUpload.array('picture', 9)

module.exports = {
  avatorHandler,
  picHandler
}