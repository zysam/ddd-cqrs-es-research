// from sourced-repo-mongo.js

Repository.prototype.get = function get (id, cb) {
  var self = this;
  log('getting %s for id %s', this.entityType.name, id);
  this.initialized.done(function () {
    self.snapshots
      .find({ id: id })
      .sort({ version: -1 })
      .limit(-1)
      .toArray(function (err, docs) {
        if (err) return cb(err);
        var snapshot = docs[0];
        var criteria = (snapshot) ? { id: id, version: { $gt: snapshot.version } } : { id: id };
        self.events.find(criteria)
          .sort({ version: 1 })
          .toArray(function (err, events) {
            if (err) return cb(err);
            if (snapshot) delete snapshot._id;
            return self.deserialize(id, snapshot, events, cb);
          });
    });
  });
};