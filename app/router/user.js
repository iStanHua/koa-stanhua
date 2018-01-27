const router = require('koa-router')()
const User = require('../controller/user')

router.prefix('/user')

router.get('/list', User.list.bind(User))
router.get('/detail/:id', User.detail.bind(User))

router.post('/add', User.add.bind(User))
router.post('/login', User.login.bind(User))
router.post('/register', User.register.bind(User))
router.put('/update/:id', User.update.bind(User))

module.exports = router 