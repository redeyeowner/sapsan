const HttpException = require('./http.exception');
const { GATEWAY_TIMEOUT } = require('../../constants/http-statuses.constants');
const { createHttpExceptionBody } = require('./http.exception.util');

module.exports = class GatewayTimeoutException extends HttpException {
  constructor(message, error = 'Gateway Timeout') {
    super(
      createHttpExceptionBody(message, error, GATEWAY_TIMEOUT),
      GATEWAY_TIMEOUT,
    );
  }
};
