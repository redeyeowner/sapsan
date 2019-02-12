const { UNHANDLED_RUNTIME_EXCEPTION } = require('./messages');
const ExceptionHandler = require('./exception-handler');

module.exports = class ExceptionsZone {
  constructor() {
    this.exceptionHandler = new ExceptionHandler();
  }

  static run(fn) {
    try {
      fn();
    } catch (e) {
      this.exceptionHandler.handle(e);
      throw UNHANDLED_RUNTIME_EXCEPTION;
    }
  }

  static async asyncRun(fn) {
    try {
      await fn();
    } catch (e) {
      this.exceptionHandler.handle(e);
      throw UNHANDLED_RUNTIME_EXCEPTION;
    }
  }
};
