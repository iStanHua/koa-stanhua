const router = require('koa-router')()
const Weather = require('../controller/weather')

router.prefix('/weather')

router.get('/query', Weather.query.bind(Weather))
router.get('/query/:code', Weather.query.bind(Weather))

module.exports = router