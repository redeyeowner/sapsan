module.exports = class BaseException extends Error {
  /**
   * @constructor
   *
   * @param {string} message
   */
  constructor(message) {
    super();
    this.message = message;
  }
};
