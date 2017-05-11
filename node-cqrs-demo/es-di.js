const { EventStore, Container } = require('node-cqrs')
const MongoEventStorage = require('node-cqrs-mongo')

const MONGO_URI = 'mongodb://localhost:27017/cqrs-demo'
// create container instance
const container = new Container()

// register MongoEventStorage as "storage"
container.registerInstance({ connectionString: MONGO_URI }, 'mongoConfig')
container.register(MongoEventStorage, 'storage')

// register EventStore as "eventStore"
container.register(EventStore, 'eventStore')

// commit events to eventStore
container.eventStore.commit([
  { aggregateId: 2, aggregateVersion: 2, type: 'somethingHappened', payload: {_id: 1, state: 'open'} }
])
