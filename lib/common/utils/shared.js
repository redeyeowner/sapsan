const ConfigModule = require('../config/config.module');
const Module = require('../injectors/module');
const Route = require('../injectors/route');

module.exports.isConfigModule = fn => fn instanceof ConfigModule;
module.exports.isConstructor = fn => fn === 'constructor';
module.exports.isEmpty = array => !(array && array.length > 0);
module.exports.isFunction = fn => typeof fn === 'function';
module.exports.isModule = fn => fn instanceof Module;
module.exports.isNull = obj => isUndefined(obj) || obj === null;
module.exports.isObject = fn => !isNull(fn) && typeof fn === 'object';
module.exports.isRoute = fn => fn instanceof Route;
module.exports.isString = fn => typeof fn === 'string';
module.exports.isSymbol = fn => typeof fn === 'symbol';
module.exports.isUndefined = obj => typeof obj === 'undefined';
module.exports.validatePath = path =>
  path
    ? path.charAt(0) !== '/' ? `/${path}` : path
    : '';
