var Order = require('./order');
var Entity = require('sourced').Entity;
var util = require('util');

function Market () {
  this.id = null;
  this.orders = [];
  this.trades = [];
  Entity.call(this);
}
util.inherits(Market, Entity);

Market.prototype.initialize = function(id, cb) {
    this.id = id;
    if(cb) cb();
};

Market.prototype.createOrder = function(o, cb) {
    // tell sourced to automatically digest the event and params
    this.digest('createOrder', o);
    
    this.orders.push(new Order(o));
    
    if(cb) cb();
};

module.exports = Market;