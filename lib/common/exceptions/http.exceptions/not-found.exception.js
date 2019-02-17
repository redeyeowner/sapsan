const HttpException = require('./http.exception');
const { NOT_FOUND } = require('../../constants/http-statuses.constants');
const { createHttpExceptionBody } = require('./http.exception.util');

module.exports = class NotFoundException extends HttpException {
  constructor(message, error = 'Not Found') {
    super(
      createHttpExceptionBody(message, error, NOT_FOUND),
      NOT_FOUND,
    );
  }
};
