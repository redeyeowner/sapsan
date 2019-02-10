const BaseException = require('./base.exception');

module.exports = class WrongTypeException extends BaseException {
  constructor({
    expectedTypes = null,
    givenType = null,
  } = {}) {
    const commonText = 'Wrong type.';
    const isExpectedTypesNotEmptyArray = expectedTypes
      && Array.isArray(expectedTypes)
      && expectedTypes.length > 0;
    const expectedTypesText = isExpectedTypesNotEmptyArray
      ? `Expected type${
        expectedTypes.length === 1 ? '' : 's'
      } is ${expectedTypes.join(', ')}.`
      : '';
    const givenTypeText = givenType
      ? `But ${givenType} type is given.`
      : '';
    super(`${commonText}${expectedTypesText}${givenTypeText}`);
  }
};
