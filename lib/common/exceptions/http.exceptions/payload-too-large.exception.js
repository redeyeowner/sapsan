const HttpException = require('./http.exception');
const { PAYLOAD_TOO_LARGE } =
  require('../../constants/http-statuses.constants');
const { createHttpExceptionBody } = require('./http.exception.util');

module.exports = class PayloadTooLargeException extends HttpException {
  constructor(message, error = 'Payload Too Large') {
    super(
      createHttpExceptionBody(message, error, PAYLOAD_TOO_LARGE),
      PAYLOAD_TOO_LARGE,
    );
  }
};
