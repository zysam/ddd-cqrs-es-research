'use strict'

const uuid = require('node-uuid')
const bus = require('./bus')

// custom
exports.create = async (ctx) => {
  const data = ctx.request.body

  // do sth: send command
  const cmd = genCmd('create', data)
  bus.send('cmd.order', cmd, {ack: true})
  ctx.body = 'order accept created!'
}

// admin
exports.changeStatus = async (ctx) => {
  const id = ctx.params.id
  const data = ctx.request.body

  // do sth: send command
  const cmd = genCmd('changeStatus', Object.assign(data, {id}))
  bus.send('cmd.order', cmd, {ack: true})
  ctx.body = 'order accept updated!'
}

function genCmd (cmd, data) {
  return {
    cmdId: uuid(),
    aggregateName: 'order',
    aggregateId: uuid(),
    command: cmd,
    payload: data
  }
}
