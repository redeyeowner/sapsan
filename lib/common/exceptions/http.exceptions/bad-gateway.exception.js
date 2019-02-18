const HttpException = require('./http.exception');
const { BAD_GATEWAY } = require('../../constants/http-statuses.constants');
const { createHttpExceptionBody } = require('./http.exception.util');

module.exports = class BadGatewayException extends HttpException {
  constructor(message, error = 'Bad Gateway') {
    super(
      createHttpExceptionBody(message, error, BAD_GATEWAY),
      BAD_GATEWAY,
    );
  }
};
