const merge = require('lodash/merge');

const getAutocompletedObject = (obj = {}) => new Proxy(obj, {
  get: (target, key, receiver) => {
    if (key === 'toJSON') {
      return () => target;
    }
    if (!Reflect.has(target, key)) {
      Reflect.set(target, key, getAutocompletedObject());
    }
    return Reflect.get(target, key, receiver);
  },
});
const mergeObjects = (primaryObj, ...sources) => merge(primaryObj, ...sources);

module.exports.getAutocompletedObject = getAutocompletedObject;
module.exports.mergeObjects = mergeObjects;
