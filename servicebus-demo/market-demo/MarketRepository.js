var Promise = require('bluebird');
var sourcedRepoMongo = require('sourced-repo-mongo');
var MongoRepository  = sourcedRepoMongo.Repository;
var Market = require('./market');
var util = require('util');

function MarketRepository () {
  this.cache = {};
  MongoRepository.call(this, Market);
}

util.inherits(MarketRepository, MongoRepository);

MarketRepository.prototype.get = function (id, cb) {
  var self = this;
  var promise = new Promise(function (resolve, reject) {
    var market = self.cache[id];
    if(!market) {
      // rebuild from event snapshots and store
      MarketRepository.super_.prototype.get.call(self, id, function (err, market) {
        self.cache[id] = market;
        resolve(market);
      });
    } else {
      resolve(market);
    }
  });

  promise.done(function (market) {
    cb(null, market);
  });
};

module.exports = MarketRepository;