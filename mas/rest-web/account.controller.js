
'use strict'

// const uuid = require('node-uuid')
const bus = require('./bus')

// custom
exports.create = async (ctx) => {
  const data = ctx.request.body

  bus.send('account.created', data, {ack: true})
  ctx.body = 'account accept created!'
}

// admin
exports.update = async (ctx) => {
  const id = ctx.params.id
  const data = ctx.request.body

  bus.send('account.updated', Object.assign(data, {id}), {ack: true})
  ctx.body = 'account accept updated!'
}
