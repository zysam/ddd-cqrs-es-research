'use strict'

const servicebus = require('servicebus')
const {rabbitmq} = require('../config')
const bus = servicebus.bus({ url: rabbitmq.url })

bus.use(bus.package())
bus.use(bus.correlate())
bus.use(bus.logger())

module.exports = bus

