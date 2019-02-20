const { BodyExtractException } = require('../exceptions');

module.exports = class Context {
  constructor(request) {
    this._originalRequest = request;
    this._request = Object.seal(this._originalRequest);
    this._cachedBody = null;
    this.state = {};
  }

  static getBodyFromRequest(request) {
    return new Promise((resolve, reject) => {
      let body = '';
      try {
        request
          .on('data', (chunk) => {
            body += chunk.toString();
          });
        request
          .on('end', () => {
            resolve(JSON.parse(body));
          });
        request
          .on('error', (error) => {
            reject(error);
          });
      } catch (error) {
        reject(error);
      }
    });
  }

  async getBody() {
    if (this._cachedBody) {
      return this._cachedBody;
    }
    try {
      const body = await Context.getBodyFromRequest(this._originalRequest);
      this._cachedBody = Object.assign({}, body);
      return body;
    } catch (error) {
      throw new BodyExtractException({ message: error });
    }
  }

  getRequest() {
    return this._request;
  }

  getState() {
    return this.state;
  }

  setState(key, value) {
    this.state[key] = value;
  }
};
