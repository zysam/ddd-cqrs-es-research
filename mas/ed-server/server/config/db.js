'use strict'

const mongoose = require('mongoose')
// mongoose.set('debug', true)
mongoose.Promise = require('bluebird')
const config = require('../config')

const options = {
  db: {
    native_parser: true
  },

  // This block gets run for a non replica set connection string (eg. localhost with a single DB)
  server: {
    poolSize: 5,
    reconnectTries: 10,
    ssl: false,
    sslValidate: false,
    socketOptions: {
      keepAlive: 1000,
      connectTimeoutMS: 30000
    }
  },

  // This block gets run when the connection string indicates a replica set (comma seperated connections)
  replset: {
    auto_reconnect: false,
    poolSize: 10,
    connectWithNoPrimary: true,
    ssl: true,
    sslValidate: false,
    socketOptions: {
      keepAlive: 1000,
      connectTimeoutMS: 30000
    }
  }
}

function create (uri) {
  const db = mongoose.createConnection(uri, options)
  db.on('connected', function () {
    console.info('%s mongo connected: %s!!!', db.name, uri)
  })

  db.on('error', function (err) {
    console.error('%s mongo Error: %s', uri, err)
  })
  return db
}

exports.main = create(config.mongo.uri)
// exports.second = create(config.mongo_second.uri)
