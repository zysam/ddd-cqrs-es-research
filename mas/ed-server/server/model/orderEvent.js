'use strict'

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const schema = new Schema({
  aggregateId: String,
  cmdId: String,
  command: String,
  version: {type: Number},
  payload: {type: Object, required: true}
})

// options
schema.set('timestamps', true) // createAt, updatedAt -> UTC
schema.set('minimize', false)
schema.set('collection', 'orderEvents')
schema.set('toJSON', {virtuals: true})

// plugin
// schema.plugin()

module.exports = schema

