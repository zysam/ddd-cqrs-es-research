
class Aggregate {
  constructor (state = {}) {
    this.version = state.version || 0 + 1
    this._state = state
  }
  get state () {
    this._update()
    return this._state
  }
  set state (state) {
    this._state = state
  }
  
  get id () {
    return this._state.aggregateId
  }
  update (cmd) {
    this.version = this.version + 1
    Object.assign(this.state, cmd.payload)
    return this.state
  }
  _update () {
    this._state.version = this.version
  }
}

module.exports = Aggregate
