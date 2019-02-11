const RuntimeException = require('./exceptions/runtime.exception');
const Logger = require('../services/logger');

module.exports = class ExceptionHandler {
  constructor() {
    this._logger = new Logger(ExceptionHandler.name);
  }

  handle(exception) {
    if (!(exception instanceof RuntimeException)) {
      this._logger.error(exception.message, exception.stack);
      return;
    }
    this._logger.error(exception.what(), exception.stack);
  }
};
