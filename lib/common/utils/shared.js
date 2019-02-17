const ConfigModule = require('../config/config.module');

const isConfigModule = fn => fn instanceof ConfigModule;
const isConstructor = fn => fn === 'constructor';
const isEmpty = array => !(array && array.length > 0);
const isFunction = fn => typeof fn === 'function';
const isString = fn => typeof fn === 'string';
const isSymbol = fn => typeof fn === 'symbol';
const isUndefined = obj => typeof obj === 'undefined';
const isNil = obj => isUndefined(obj) || obj === null;
const isObject = fn => !isNil(fn) && typeof fn === 'object';
const validatePath = path => (path
  ? path.charAt(0) !== '/' && `/${path}` || path
  : '');
const trimSlashes = (path) => {
  if (['', '/'].includes(path)) {
    return '';
  }
  let resultPath = path;
  let isPathCorrect = false;
  while (!isPathCorrect) {
    resultPath = resultPath.charAt(0) === '/'
      ? resultPath.substr(1)
      : resultPath;
    resultPath = resultPath.charAt(resultPath.length - 1) === '/'
      ? resultPath.substr(0, resultPath.length - 1)
      : resultPath;
    isPathCorrect = ![
      resultPath.charAt(0),
      resultPath.charAt(resultPath.length - 1),
    ].includes('/');
  }
  return resultPath;
};
const getFirstHttpException = exceptionsList => exceptionsList
  .find(exception => exception.isHttpException);
const getErrorMessage = errorObject => errorObject.message
  || errorObject.error
  || '';

module.exports = {
  isConfigModule,
  isConstructor,
  isEmpty,
  isFunction,
  isObject,
  isNil,
  isString,
  isSymbol,
  isUndefined,
  validatePath,
  trimSlashes,
  getFirstHttpException,
  getErrorMessage,
};
