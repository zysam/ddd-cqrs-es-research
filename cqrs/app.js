'use strict'

const UserService = require('./userService')
const DenormalizerService = require('./denormalizerService')

const userId = 'A123'
const log = console.log

log('Running...')
run()

async function run () {
  await UserService.createUser({id: userId, name: 'Sam Lam', state: 'default'})
  await UserService.updateUser({id: userId, state: 'churn'})
  await UserService.updateUser({id: userId, name: 'Sam Mal'})
  setTimeout(() => {
    log('User in user service database', UserService.getUserById(userId))
    log('User in Reporting Database', DenormalizerService.getUserById(userId))

    process.exit()
  }, 1000)
}
