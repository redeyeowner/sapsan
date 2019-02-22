const HttpException = require('./http.exception');
const { FORBIDDEN } = require('../../constants/http-statuses.constants');
const { createHttpExceptionBody } = require('./http.exception.util');

module.exports = class ForbiddenException extends HttpException {
  constructor(message, error = 'Forbidden') {
    super(
      createHttpExceptionBody(message, error, FORBIDDEN),
      FORBIDDEN,
    );
  }
};
