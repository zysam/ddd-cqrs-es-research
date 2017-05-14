const bus = require('servicebus').bus()
let count = 0
setInterval(function () {
  bus.send('my.event', { my: 'event', count: count++, time: new Date() })
  console.log('count: %d', count)
}, 1000)
