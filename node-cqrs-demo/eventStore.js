const { EventStore } = require('node-cqrs')
const MongoEventStorage = require('node-cqrs-mongo')

const MONGO_URI = 'mongodb://localhost:27017/cqrs-demo'
const storage = new MongoEventStorage({
  connectionString: MONGO_URI,
  eventsCollection: 'events'
})

const eventStore = new EventStore({ storage })

eventStore.commit([
  { aggregateId: 1, aggregateVersion: 1, type: 'somethingHappened', payload: {} }
])
