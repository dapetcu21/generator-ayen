var _ = require('lodash');
var util = require('util');

function Store() {
}

Store.prototype.name = 'Store';

Store.prototype.handleAction = function (payload) {
  var handler = this.actionHandlers[payload.actionType];
  if (typeof(handler) === 'function') {
    handler.call(this, payload);
  }
};

Store.extend = function (name, protoProps, staticProps) {
  if ((ctor === undefined) && (typeof(name) !== 'string')) {
    staticProps = protoProps;
    protoProps = name;
    name = null;
  }

  var child, parent = this;

  if (protoProps && (protoProps.constructor !== undefined)) {
    child = protoProps.constructor;
    delete protoProps.constructor;
  } else {
    child = function () { return parent.apply(this, arguments); };
  }

  _.extend(child, parent, staticProps);

  child.__super__ = parent.prototype;
  if (!child.prototype.name) {
    child.prototype.name = name || _.uniqueId('Store');
  }

  util.inherits(child, this);

  if (protoProps) {
    _.extend(child.prototype, protoProps);
  }

  return child;
};

Store.boundTo = function (dispatcher) {
  var instance = dispatcher.storeWithName(this.prototype.name);
  if (!instance) {
    instance = new this();
    dispatcher.register(instance);
  }
  return instance;
};

module.export = Store;
