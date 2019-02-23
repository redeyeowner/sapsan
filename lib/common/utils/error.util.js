const getFirstHttpException = exceptionsList => exceptionsList
  .find(exception => exception.isHttpException);

const getErrorMessage = errorObject => errorObject.message
  || errorObject.error
  || '';

module.exports.getFirstHttpException = getFirstHttpException;
module.exports.getErrorMessage = getErrorMessage;
