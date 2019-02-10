const ConfigModule = require('../config/config.module');
const Module = require('../injectors/module');
const Route = require('../injectors/router/route');

const isConfigModule = fn => fn instanceof ConfigModule;
const isConstructor = fn => fn === 'constructor';
const isEmpty = array => !(array && array.length > 0);
const isFunction = fn => typeof fn === 'function';
const isModule = fn => fn instanceof Module;
const isRoute = fn => fn instanceof Route;
const isString = fn => typeof fn === 'string';
const isSymbol = fn => typeof fn === 'symbol';
const isUndefined = obj => typeof obj === 'undefined';
const isNil = obj => isUndefined(obj) || obj === null;
const isObject = fn => !isNil(fn) && typeof fn === 'object';
const validatePath = path => path
  ? path.charAt(0) !== '/' && `/${path}` || path
  : '';

module.exports = {
  isConfigModule,
  isConstructor,
  isEmpty,
  isFunction,
  isModule,
  isObject,
  isRoute,
  isString,
  isSymbol,
  isUndefined,
  validatePath,
};
