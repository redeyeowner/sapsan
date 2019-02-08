module.exports.isUndefined = obj => typeof obj === 'undefined';
module.exports.isFunction = fn => typeof fn === 'function';
module.exports.isObject = fn => !isNull(fn) && typeof fn === 'object';
module.exports.isString = fn => typeof fn === 'string';
module.exports.isConstructor = fn => fn === 'constructor';
module.exports.validatePath = path =>
  path
    ? path.charAt(0) !== '/' ? '/' + path : path
    : '';
module.exports.isNull = obj => isUndefined(obj) || obj === null;
module.exports.isEmpty = array => !(array && array.length > 0);
module.exports.isSymbol = fn => typeof fn === 'symbol';
