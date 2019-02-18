const HttpException = require('./http.exception');
const { INTERNAL_SERVER_ERROR } =
  require('../../constants/http-statuses.constants');
const { createHttpExceptionBody } = require('./http.exception.util');

module.exports = class InternalServerErrorException extends HttpException {
  constructor(message, error = 'Internal Server Error') {
    super(
      createHttpExceptionBody(message, error, INTERNAL_SERVER_ERROR),
      INTERNAL_SERVER_ERROR,
    );
  }
};
