const app = require('./app')
const config = require('./app/config')


app.listen(config.APP_PORT,() => {
  console.log('Service running at http://localhost:8080');
})