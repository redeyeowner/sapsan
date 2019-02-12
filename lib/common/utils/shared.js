const ConfigModule = require('../config/config.module');
const ApplicationController = require('../injectors/application.controller');
const Route = require('../injectors/router/route');

const isConfigModule = fn => fn instanceof ConfigModule;
const isConstructor = fn => fn === 'constructor';
const isEmpty = array => !(array && array.length > 0);
const isFunction = fn => typeof fn === 'function';
const isAppController = fn => fn instanceof ApplicationController;
const isRoute = fn => fn instanceof Route;
const isString = fn => typeof fn === 'string';
const isSymbol = fn => typeof fn === 'symbol';
const isUndefined = obj => typeof obj === 'undefined';
const isNil = obj => isUndefined(obj) || obj === null;
const isObject = fn => !isNil(fn) && typeof fn === 'object';
const validatePath = path => (path
  ? path.charAt(0) !== '/' && `/${path}` || path
  : '');

module.exports = {
  isConfigModule,
  isConstructor,
  isEmpty,
  isFunction,
  isAppController,
  isObject,
  isRoute,
  isString,
  isSymbol,
  isUndefined,
  validatePath,
};
