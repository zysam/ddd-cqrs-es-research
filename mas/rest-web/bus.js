'use strict'

const servicebus = require('servicebus')
// const {rabbitmq} = require('../config')
const rabbitmq = 'amqp://localhost:5672'
const bus = servicebus.bus({url: rabbitmq})

bus.use(bus.package())
bus.use(bus.correlate())
bus.use(bus.logger())

module.exports = bus
