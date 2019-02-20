/* eslint no-confusing-arrow: 0 */
const uuid = require('uuid');
const merge = require('lodash/merge');

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
const generateUuidString = (options) => {
  const defaultVersionGenerator = uuid.v4;
  if (!options || !options.version) {
    return defaultVersionGenerator();
  }
  const versions = {
    1: uuid.v1,
    3: uuid.v3,
    4: uuid.v4,
    5: uuid.v5,
  };
  const uuidGenerator = versions[options.version] || defaultVersionGenerator;
  return uuidGenerator();
};
const mergeObjects = (primaryObj, ...sources) => merge(primaryObj, ...sources);
const handleResponse = res => typeof res !== 'object' && res !== null
  ? res
  : JSON.stringify(res);

module.exports.validatePath = validatePath;
module.exports.trimSlashes = trimSlashes;
module.exports.getFirstHttpException = getFirstHttpException;
module.exports.getErrorMessage = getErrorMessage;
module.exports.getAutocompletedObject = getAutocompletedObject;
module.exports.generateUuidString = generateUuidString;
module.exports.mergeObjects = mergeObjects;
module.exports.handleResponse = handleResponse;
