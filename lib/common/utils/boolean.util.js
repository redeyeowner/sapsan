const ConfigModule = require('../config/config.module');

const isConfigModule = fn => fn instanceof ConfigModule;
const isEmpty = array => !(Array.isArray(array) && array.length > 0);
const isFunction = fn => typeof fn === 'function';
const isString = fn => typeof fn === 'string';
const isSymbol = fn => typeof fn === 'symbol';
const isUndefined = obj => typeof obj === 'undefined';
const isNil = obj => isUndefined(obj) || obj === null;
const isObject = fn => !isNil(fn) && !isFunction(fn) && typeof fn === 'object';

module.exports.isConfigModule = isConfigModule;
module.exports.isEmpty = isEmpty;
module.exports.isFunction = isFunction;
module.exports.isString = isString;
module.exports.isSymbol = isSymbol;
module.exports.isUndefined = isUndefined;
module.exports.isNil = isNil;
module.exports.isObject = isObject;
