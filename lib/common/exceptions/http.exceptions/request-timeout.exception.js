const HttpException = require('./http.exception');
const { REQUEST_TIMEOUT } = require('../../constants/http-statuses.constants');
const { createHttpExceptionBody } = require('./http.exception.util');

module.exports = class RequestTimeoutException extends HttpException {
  constructor(message, error = 'Request Timeout') {
    super(
      createHttpExceptionBody(message, error, REQUEST_TIMEOUT),
      REQUEST_TIMEOUT,
    );
  }
};
