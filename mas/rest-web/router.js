
const order = require('./order.controller')
// const user = require('./user.controller')
// const account = require('./account.controller')
const Router = require('koa-router')

const router = new Router({
  prefix: '/api/v1'
})

router.post('/orders', order.create)
router.put('/orders/:id/status', order.changeStatus)

// router.post('/users', user.create)
// router.put('/users/:id', user.update)

// router.post('/account', account.create)
// router.put('/account/:id', account.update)

module.exports = router
