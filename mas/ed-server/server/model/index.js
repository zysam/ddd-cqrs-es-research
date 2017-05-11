'use strict'

const DB = require('../config/db')

exports.Order = DB.main.model('Order', require('./order'))
exports.OrderEvent = DB.main.model('OrderEvent', require('./orderEvent'))
exports.OrderEventSnapshot = DB.main.model('OrderEventSnapshot', require('./orderEventSnapshot'))
