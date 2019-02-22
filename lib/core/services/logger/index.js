const moment = require('moment');
const assert = require('assert');
const {
  DASTETIME_FORMAT,
  SEPARATOR,
  MESSAGES,
  COLORS,
} = require('./constants');
const { isString } = require('../../../common/utils');

module.exports = class Logger {
  constructor(label) {
    assert.ok(isString(label), 'Label must be string.');
    this._getTimeMethod = moment;
    this._separator = SEPARATOR;
    this._label = label;
    this._successColor = COLORS.FgGreen;
    this._errorColor = COLORS.FgRed;
    this._resetColor = COLORS.Reset;
  }

  _wrapSuccess(text) {
    return `${this._successColor}${text}${this._resetColor}`;
  }

  _wrapError(text) {
    return `${this._errorColor}${text}${this._resetColor}`;
  }

  log(...args) {
    const timestamp = this._getTimeMethod().format(DASTETIME_FORMAT);
    const messageParts = [
      timestamp,
      MESSAGES.INFO,
      `[${this._label}]`,
    ];
    const prefixLog = this._wrapSuccess(
      `${messageParts.join(this._separator)}${this._separator}`,
    );
    process.stdout.write(
      `${prefixLog}${args}\n`,
    );
  }

  error(...args) {
    const timestamp = this._getTimeMethod().format(DASTETIME_FORMAT);
    const messageParts = [
      timestamp,
      MESSAGES.ERROR,
      `[${this._label}]`,
    ];
    const prefixLog = this._wrapError(
      `${messageParts.join(this._separator)}${this._separator}`,
    );
    process.stdout.write(
      `${prefixLog}${args}\n`,
    );
  }
};
