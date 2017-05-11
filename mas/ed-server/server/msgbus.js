'use strict'

const bus = require('./config/bus')
const OrderDenormalizer = require('./domain/order.denormalizer')
const OrderCommand = require('./domain/order.command')

// command
// order
listen('cmd.order', OrderCommand)

// denormalizer
// order
subscribe('event.order.updated', OrderDenormalizer.update)

function listen (queue, fn) {
  bus.listen(queue, {ack: true}, (msg) => {
    next(msg, fn)
  })
}

function subscribe (queue, fn) {
  bus.subscribe(queue, (msg) => {
    next(msg, fn)
  })
}

async function next (msg, fn) {
  console.log('msg:', msg)
  const data = msg.data
  try {
    await fn(data)
    msg.handle.ack()
  } catch (err) {
    console.error(err)
    msg.handle.reject()
  }
}
