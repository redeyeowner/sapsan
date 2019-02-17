const HttpException = require('./http.exception');
const { SERVICE_UNAVAILABLE } =
  require('../../constants/http-statuses.constants');
const { createHttpExceptionBody } = require('./http.exception.util');

module.exports = class ServiceUnavailableException extends HttpException {
  constructor(message, error = 'Service Unavailable') {
    super(
      createHttpExceptionBody(message, error, SERVICE_UNAVAILABLE),
      SERVICE_UNAVAILABLE,
    );
  }
};
