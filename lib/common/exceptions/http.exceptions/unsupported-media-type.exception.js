const HttpException = require('./http.exception');
const { UNSUPPORTED_MEDIA_TYPE } =
  require('../../constants/http-statuses.constants');
const { createHttpExceptionBody } = require('./http.exception.util');

module.exports = class UnsupportedMediaTypeException extends HttpException {
  constructor(message, error = 'Unsupported Media Type') {
    super(
      createHttpExceptionBody(
        message,
        error,
        UNSUPPORTED_MEDIA_TYPE,
      ),
      UNSUPPORTED_MEDIA_TYPE,
    );
  }
};
