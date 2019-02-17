const HttpException = require('./http.exception');
const { CONFLICT } = require('../../constants/http-statuses.constants');
const { createHttpExceptionBody } = require('./http.exception.util');

module.exports = class ConflictException extends HttpException {
  constructor(message, error = 'Conflict') {
    super(
      createHttpExceptionBody(message, error, CONFLICT),
      CONFLICT,
    );
  }
};
