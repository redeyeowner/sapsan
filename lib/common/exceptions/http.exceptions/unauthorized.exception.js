const HttpException = require('./http.exception');
const { UNAUTHORIZED } = require('../../constants/http-statuses.constants');
const { createHttpExceptionBody } = require('./http.exception.util');

module.exports = class UnauthorizedException extends HttpException {
  constructor(message, error = 'Unauthorized') {
    super(
      createHttpExceptionBody(message, error, UNAUTHORIZED),
      UNAUTHORIZED,
    );
  }
};
