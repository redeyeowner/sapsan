const HttpException = require('./http.exception');
const { UNPROCESSABLE_ENTITY } =
  require('../../constants/http-statuses.constants');
const { createHttpExceptionBody } = require('./http.exception.util');

module.exports = class UnprocessableEntityException extends HttpException {
  constructor(message, error = 'Unprocessable Entity') {
    super(
      createHttpExceptionBody(message, error, UNPROCESSABLE_ENTITY),
      UNPROCESSABLE_ENTITY,
    );
  }
};
