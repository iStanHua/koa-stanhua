
const router = require('koa-router')()

const weather = require('./weather')
const user = require('./user')

router.prefix('/api')

router.use(weather.routes(), weather.allowedMethods())
router.use(user.routes(), user.allowedMethods())

module.exports = router