'use strict'

const Tortoise = require('tortoise')
const _ = require('lodash')

const tortoise = new Tortoise('amqp://localhost')
const QUEUE_USER_CREATE = 'user_created'
const QUEUE_USER_EDIT = 'user_edited'

// 初始化数据库
const userDB = {}

exports.createUser = (user) => {
  userDB[user.id] = user

  return tortoise
    .queue(QUEUE_USER_CREATE)
    .publish({
      id: user.id,
      name: userDB[user.id].name,
      state: userDB[user.id].state
    })
}

exports.updateUser = (user) => {
  userDB[user.id] = _.merge(userDB[user.id], user)

  return tortoise
    .queue(QUEUE_USER_EDIT)
    .publish({
      id: user.id,
      name: userDB[user.id].name,
      state: userDB[user.id].state
    })
}

exports.getUserById = (userId) => {
  return userDB[userId]
}

