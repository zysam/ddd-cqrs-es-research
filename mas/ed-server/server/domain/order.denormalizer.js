'use strict'

const {Order} = require('../model')
exports.update = async (order) => {
  const doc = {
    status: order.status,
    userId: order.userId,
    side: order.side,
    fromClient: order.fromClient,
    fromChannel: order.fromChannel,
    amount: order.amount
  }
  const r = await Order
    .update({_id: order._id}, {$set: doc}, {upsert: true})
  console.log('order update: ', r)
}
