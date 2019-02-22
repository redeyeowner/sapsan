const BadUserDataException = require('../exceptions/bad-user-data.exception');

module.exports = (exception) => {
  if (exception instanceof BadUserDataException) {
    return {
      statusCode: exception.getStatus(),
      data: {
        error: exception.message,
      },
    };
  }
  if (
    exception
    && exception.message
    && exception.message.isBadRequestException
  ) {
    return {
      statusCode: exception.getStatus(),
      data: {
        error: exception.message.message,
      },
    };
  }
  return false;
};
