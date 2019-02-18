const HttpException = require('./http.exception');
const { I_AM_A_TEAPOT } = require('../../constants/http-statuses.constants');
const { createHttpExceptionBody } = require('./http.exception.util');

module.exports = class ImATeapotException extends HttpException {
  constructor(message, error = 'I\'m a teapot') {
    super(
      createHttpExceptionBody(message, error, I_AM_A_TEAPOT),
      I_AM_A_TEAPOT,
    );
  }
};
