const { isObject } = require('../../utils/shared');

module.exports.createHttpExceptionBody = (message, error, statusCode) => {
  const isHttpException = true;
  if (!message) {
    return {
      error,
      isHttpException,
      statusCode,
    };
  }
  return isObject(message)
    ? message
    : {
      error,
      isHttpException,
      message,
      statusCode,
    };
};
