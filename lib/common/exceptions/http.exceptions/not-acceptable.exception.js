const HttpException = require('./http.exception');
const { NOT_ACCEPTABLE } = require('../../constants/http-statuses.constants');
const { createHttpExceptionBody } = require('./http.exception.util');

module.exports = class NotAcceptableException extends HttpException {
  constructor(message, error = 'Not Acceptable') {
    super(
      createHttpExceptionBody(message, error, NOT_ACCEPTABLE),
      NOT_ACCEPTABLE,
    );
  }
};
