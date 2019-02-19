const { getAutocompletedObject } = require('../utils');

module.exports = class Context {
  constructor(request) {
    this._request = Object.freeze(request);
    this.state = getAutocompletedObject();
  }

  getRequest() {
    return this._request;
  }

  getState() {
    return this._request;
  }

  setState(key, value) {
    this.state[key] = value;
  }
};
