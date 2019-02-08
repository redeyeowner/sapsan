const BaseException = require('./base.exception');

module.exports = class WrongArgumentsNumberException extends BaseException {
  constructor({
    expectedArgsNumber = null,
  } = {}) {
    const expectedArgsNumberAllowedTypes = ['number'];
    const commonText = 'Wrong arguments number.';
    if (expectedArgsNumberAllowedTypes.includes(typeof expectedArgsNumber)) {
      super(`${commonText} Expected is ${expectedArgsNumber}`);
    } else {
      super(commonText);
    }
  }
};
