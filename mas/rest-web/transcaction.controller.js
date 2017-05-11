
'use strict'

// const uuid = require('node-uuid')
const bus = require('./bus')

// custom
exports.create = async (ctx) => {
  const data = ctx.request.body

  bus.send('transcaction.created', data, {ack: true})
  ctx.body = 'transcaction accept created!'
}
