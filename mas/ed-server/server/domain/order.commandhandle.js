'use strict'

const {OrderEvent, OrderEventSnapshot} = require('../model')
const bus = require('../config/bus')
const Repo = require('../lib/repository')
const Aggregate = require('../lib/aggregate')

const repo = new Repo(OrderEvent, OrderEventSnapshot)
const Handler = module.exports
// 幂等 使用 insert
Handler.create = async function (data, rebuild = false) {
  const doc = {
    cmdId: data.cmdId,
    command: 'create',
    aggregateId: data.aggregateId,
    payload: data.payload
  }
  // aggregate status
  // save event
  const agg = new Aggregate()
  agg.update(doc)
  const _order = await repo.save(agg)

  console.log(_order)
  // publish event TODO: 加队列
  // bus.publish('event.order.updated', _order)
}

Handler.chageStatus = async function (data) {
  let event = {
    cmdId: data.cmdId,
    command: 'changeStatus',
    version: data.version || 0,
    aggregateId: data.aggregateId,
    payload: data.payload
  }
  // aggregate status
  // save event
  const lastState = await repo.get(event.aggregateId)
  const agg = new Aggregate(lastState)
  event.version = agg.version
  const _order = await repo.save(event)
  console.log(_order)
  // publish event
  bus.publish('event.order.updated', _order)
}
