const uuid = require('uuid');

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

module.exports.generateUuidString = generateUuidString;
module.exports.validatePath = validatePath;
module.exports.trimSlashes = trimSlashes;
