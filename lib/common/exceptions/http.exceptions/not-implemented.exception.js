const HttpException = require('./http.exception');
const { NOT_IMPLEMENTED } = require('../../constants/http-statuses.constants');
const { createHttpExceptionBody } = require('./http.exception.util');

module.exports = class NotImplementedException extends HttpException {
  constructor(message, error = 'Not Implemented') {
    super(
      createHttpExceptionBody(message, error, NOT_IMPLEMENTED),
      NOT_IMPLEMENTED,
    );
  }
};
