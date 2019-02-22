const { Exceptions: { BadRequestException } } = require('../../../../index');

module.exports = class BadUserDataException extends BadRequestException {
  constructor() {
    super('Bad User Data');
  }
};
