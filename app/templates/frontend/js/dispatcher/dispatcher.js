var W = require('when');
var _ = require('lodash');

var Dispatcher = function () {
  this._storesHash = {};
  this._stores = [];
  this._promises = [];
};

Dispatcher.prototype.register = function (store) {
  this._storesHash[store.name] = store;
  this._stores.push(store);
};

Dispatcher.prototype.storeWithName = function (name) {
  return this._storesHash[name];
};

Dispatcher.prototype.waitFor = function (stores) {
  var self = this;

  if (!(stores instanceof Array)) {
    stores = [stores];
  }

  return W.all(_.map(stores, function (store) {
    if (typeof(store) === 'string') {
      store = self._storesHash[store];
    }
    return self._promises[store._promiseIndex];
  }));
};

Dispatcher.prototype.dispatch = function (payload) {
  var self = this;
  var _resolves = [];
  var _rejects = [];

  self._promises = [];

  _.each(self._stores, function (store, index) {
    store._promiseIndex = index;
    self._promises.push(W.promise(function (resolve, reject) {
      _resolves.push(resolve);
      _rejects.push(reject);
    }));
  });

  _.each(self._stores, function (store, index) {
    W.try(store.handleAction.bind(store, payload)).then(
      _resolves[index],
      _rejects[index]
    );
  });
};

