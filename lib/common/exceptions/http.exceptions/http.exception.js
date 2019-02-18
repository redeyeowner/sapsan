module.exports = class HttpException extends Error {
  constructor(response, status) {
    super();
    this.message = response;
    this._response = response;
    this._status = status;
  }

  getResponse() {
    return this._response;
  }

  getStatus() {
    return this._status;
  }
};
