
'use strict'

// const uuid = require('node-uuid')
const bus = require('./bus')

// custom
exports.create = async (ctx) => {
  const data = ctx.request.body

  bus.send('user.created', data, {ack: true})
  ctx.body = 'user accept created!'
}

// admin
exports.update = async (ctx) => {
  const id = ctx.params.id
  const data = ctx.request.body

  bus.send('user.updated', Object.assign(data, {id}), {ack: true})
  ctx.body = 'user accept updated!'
}
