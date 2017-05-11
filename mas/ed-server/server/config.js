'use strict'

const path = require('path')
const pkg = require('../package.json')

const NODE_ENV = process.env.NODE_ENV || 'development'
const root = path.resolve(__dirname, '..')

const baseConfig = {
  app: {
    name: pkg.name,
    version: pkg.version,
    root: root,
    env: NODE_ENV,
    isDev: NODE_ENV === 'development',
    isProd: NODE_ENV === 'production',
    keys: ['mas', 'secret@@mas!!!!'],
    secret: process.env.SECRET || 'mas&&&&&&secret!',
    debugMode: process.env.DEBUG_MODE === 'on',
    limit: 50, // filter limit default
    worker: {
      numCPUs: 1,
      limit: 20
    },
    log: {
      dir: process.env.LOG_DIR || path.resolve(root, 'log'),
      level: process.env.LOG_LEVEL || 'debug',
      colorize: process.env.LOG_COLORIZE ? process.env.LOG_COLORIZE === 'on' : true,
      size: process.env.LOG_SIZE || 1024 * 1024 * 128
    }
  },
  redis: {
    port: process.env.REDIS_PORT || 6379,
    host: process.env.REDIS_HOST || 'localhost',
    family: 4
  },
  rabbitmq: {
    url: process.env.RABBITMQ_HOST || 'amqp://localhost:5672'
  }
}

const platformConfig = {
  development: {
    app: {
      port: 8001,
      token: '123456'
    },
    mongo: {
      uri: process.env.MONGO_URI_DEV || 'mongodb://localhost:27017/mas-dev'
    },
    mongo_second: {
      uri: process.env.MONGO_SECOND_DEV || 'mongodb://localhost:27017/mas2-dev'
    }
  },
  test: {
    app: {
      port: 8002,
      token: '123456'
    },
    mongo: {
      uri: process.env.MONGO_URI_TEST || 'mongodb://localhost:27017/mas-test'
    },
    mongo_second: {
      uri: process.env.MONGO_SECOND_TEST || 'mongodb://localhost:27017/mas2-test'
    }
  },
  production: {
    app: {
      port: process.env.PORT || 8001,
      token: process.env.TOKEN || 'df3cfe17f5467b31b7b307c4802637b9'
    },
    mongo: {
      uri: process.env.MONGO_URI || 'mongodb://localhost:27017/mas'
    },
    mongo_second: {
      uri: process.env.MONGO_SECOND || 'mongodb://localhost:27017/mas2'
    }
  }
}

module.exports = Object.assign({}, baseConfig, platformConfig[NODE_ENV])
