'use strict'

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const schema = new Schema({
  status: {type: String},
  userId: {type: String},
  side: String,
  fromClient: String,
  fromChannel: String,
  amount: {type: Number, required: true}
})

// options
schema.set('timestamps', true) // createAt, updatedAt -> UTC
schema.set('minimize', false)
schema.set('collection', 'orders')
schema.set('toJSON', {virtuals: true})

// plugin
// schema.plugin()

module.exports = schema

