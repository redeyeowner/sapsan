const BaseException = require('./base.exception');

module.exports = class BodyExtractException extends BaseException {
  constructor({ message } = {}) {
    super(message);
  }
};
