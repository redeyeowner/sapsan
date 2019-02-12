const moment = require('moment');
const {
  DASTETIME_FORMAT,
  SEPARATOR,
  MESSAGES,
} = require('./constants');

module.exports = class Logger {
  constructor(label) {
    this._timestamp = moment().format(DASTETIME_FORMAT);
    this._separator = SEPARATOR;
    this._label = label;
  }

  log(...args) {
    const messageParts = [
      this._timestamp,
      `[${MESSAGES.INFO}]`,
      this._label,
    ];
    process.stdout.write(
      messageParts.join(this._separator),
      this._separator,
      ...args,
    );
  }

  error(label, ...args) {
    const messageParts = [
      this._timestamp,
      MESSAGES.ERROR,
      label,
    ];
    process.stderr.write(
      messageParts.join(this._separator),
      this._separator,
      ...args,
    );
  }
};
