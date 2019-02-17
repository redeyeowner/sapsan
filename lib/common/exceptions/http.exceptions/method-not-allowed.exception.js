const HttpException = require('./http.exception');
const { METHOD_NOT_ALLOWED } =
  require('../../constants/http-statuses.constants');
const { createHttpExceptionBody } = require('./http.exception.util');

module.exports = class MethodNotAllowedException extends HttpException {
  constructor(message, error = 'Method Not Allowed') {
    super(
      createHttpExceptionBody(message, error, METHOD_NOT_ALLOWED),
      METHOD_NOT_ALLOWED,
    );
  }
};
