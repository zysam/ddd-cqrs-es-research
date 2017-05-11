'use strict'

const Koa = require('koa')
const logger = require('koa-logger')
const bodyParser = require('koa-bodyParser')
const app = new Koa()
const router = require('./router')

app.use(bodyParser())
app.use(logger())
app.use(router.routes())

// app.use(ctx => {
//   console.log(`path: ${ctx.path}`)
//   ctx.body = 'Mas Mal'
// })

app.listen(3001)
console.info('server listening port 3001!')
