
const router = require('koa-router')()

const weather = require('./weather')
const user = require('./user')
const nobel = require('./nobel')

router.prefix('/api')

router.use(weather.routes(), weather.allowedMethods())
router.use(user.routes(), user.allowedMethods())
router.use(nobel.routes(), nobel.allowedMethods())

module.exports = router