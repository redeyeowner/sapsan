const HttpException = require('./http.exception');
const { BAD_REQUEST } = require('../../constants/http-statuses.constants');
const { createHttpExceptionBody } = require('./http.exception.util');

module.exports = class BadRequestException extends HttpException {
  constructor(message, error = 'Bad Request') {
    super(
      createHttpExceptionBody(message, error, BAD_REQUEST),
      BAD_REQUEST,
    );
  }
};
