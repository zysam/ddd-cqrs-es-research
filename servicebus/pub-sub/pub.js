
const bus = require('servicebus').bus()
let count = 0
setInterval(function () {
  bus.publish('my.event', { message: 'this is my.event', count: count++, time: new Date() })
  console.log('count: %d', count)
}, 1000)
