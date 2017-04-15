const bus = require('servicebus').bus()
bus.subscribe('my.event', function (event) {
  console.log(event)
})