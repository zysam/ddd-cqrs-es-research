'use strict'

const { AbstractAggregate } = require('node-cqrs')

class UserAggregateState {
  _userSignedUp (payload) {
    this.profile = payload.profile
    this.passwordHash = payload.passwordHash
  }
}

class UserAggregate extends AbstractAggregate {
  static get handles () {
    return ['signupUser']
  }
  constructor ({ id, events, someService }) {
    super({ id, events, state: new UserAggregateState() })
    this._someService = someService
  }
  signupUser (payload, context) {
    if (this.version !== 0) throw new Error('user already signed up')
    const {passwordHash} = payload

    this._someService.doSth()

    this.emit('userSignedUp', { payload, passwordHash })
  }

}
