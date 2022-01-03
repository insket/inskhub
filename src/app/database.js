const mysql = require('mysql2')

const config = require('./config')

const conn = mysql.createPool({
	host: config.MYSQL_HOST,
	port: config.MYSQL_PORT,
	database: config.MYSQL_DATABASE,
	user: config.MYSQL_ROOT,
	password: config.MYSQL_PASSWORD,
})

conn.getConnection((err, con) => {
	con.connect((err) => {
		if (err) {
			console.log('数据库连接失败')
		} else {
			console.log('数据库连接成功')
		}
	})
})

module.exports = conn.promise()
