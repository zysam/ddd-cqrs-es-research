
const cacheKey = Symbol('cacheKey')

class Repository {
  constructor (event, snapshot, cmdHandle) {
    this.cmdHandle = cmdHandle
    this._eventStore = event
    this._snapshotStore = snapshot
    this[cacheKey] = new Map()
    this._id = null
    this.replay = false
  }
  _getEntity (id) {
    return this[cacheKey].get(id)
  }
  _setEntity (id, data) {
    return this[cacheKey].set(id, data)
  }

  clear () {
    return this[cacheKey].clear()
  }
  del (id) {
    return this[cacheKey].del(id)
  }
  // agg 搞错了
  async save (aggregate) {
    const cmd = aggregate.state
    if (!this.replay) {
      await this._eventStore.create(cmd)
    }
    const id = cmd.aggregateId
    const data = Object.assign({}, cmd.payload, {version: cmd.version})
    this._setEntity(id, data)
    return data
  }

  async get (id) {
    const entity = this._getEntity(id)
    if (entity) return entity

    const query = {aggregateId: id}
    const snap = await this._snapshotStore.findOne(query).sort('-version').lean()
    const eQuery = snap ? Object.assign({}, query, {version: {$gt: snap.version}}) : query
    const events = await this._eventStore.find(eQuery).sort('version').lean()
    const newEntity = this._rebuild(id, snap, events)
    this._setEntity(id, newEntity)
    return newEntity
  }
  _rebuild (id, snapshot, events) {
    this.replay = true
    const agg = this.save(snapshot.data)
    events.map(evt => {
      agg[evt.command](evt.payload)
    })
    this.replay = false
    return agg.entity
  }
}

module.exports = Repository

