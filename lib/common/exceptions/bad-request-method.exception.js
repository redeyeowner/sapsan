const BaseException = require('./base.exception');
const RequestMethod = require('../constants/request-methods.constants');
const { isString } = require('../utils/shared');

module.exports = class BadRequestMethodException extends BaseException {
  constructor({
    givenMethod = null,
  } = {}) {
    const allowedMethods = Object.values(RequestMethod).join(', ');
    const commonText = `Bad method. Allowed are only: ${allowedMethods}.`;
    const givenMethodText = isString(givenMethod)
      ? `But given is ${givenMethod}.`
      : '';
    super(`${commonText} ${givenMethodText}`);
  }
};
