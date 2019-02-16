const uuidv4 = require('uuid/v4');
const RequestMethod = require('../../constants/request-methods.constants');
const {
  WrongTypeException,
  BadRequestMethodException,
} = require('../../exceptions');
const {
  isString,
  isFunction,
  trimSlashes,
} = require('../../utils/shared');

module.exports = class Route {
  constructor({
    method = null,
    path = null,
    controller = null,
  }) {
    this._id = uuidv4();
    this._method = method || RequestMethod.GET;
    this._path = Route.validatePath(path);
    this._splitedPath = Route.splitPathBySlashes(this._path);
    this._controller = controller || (req => req);
    if (!isString(this._method)) {
      throw new WrongTypeException({
        expectedTypes: ['string'],
        givenType: typeof this._method,
      });
    }
    if (!Object.values(RequestMethod).includes(this._method)) {
      throw new BadRequestMethodException({ givenMethod: this._method });
    }
    if (!isString(this._path)) {
      throw new WrongTypeException({
        expectedTypes: ['string'],
        givenType: typeof this._path,
      });
    }
    if (!isFunction(this._controller)) {
      throw new WrongTypeException({
        expectedTypes: ['function'],
        givenType: typeof this._controller,
      });
    }
  }

  static splitPathBySlashes(path) {
    return path.split('/');
  }

  static validatePath(path) {
    if (!isString(path)) {
      return '';
    }
    return trimSlashes(path);
  }

  static isParams(el1, el2) {
    const paramPattern = /^:/;
    if (paramPattern.test(el1)) {
      return true;
    }
    if (paramPattern.test(el2)) {
      return true;
    }
    return false;
  }

  static isSameUrls(url1, url2) {
    if (url1.length !== url2.length) {
      return false;
    }
    return url1
      .every(
        (url1Element, i) => url1Element === url2[i]
          || Route.isParams(url1Element, url2[i]),
      );
  }

  hasProvidedId(routeId) {
    return this._id === routeId;
  }

  handleRequest(...args) {
    return this._controller(...args);
  }

  getRouteInstance() {
    return {
      id: this._id,
      method: this._method,
      path: this._splitedPath,
      controller: this._controller,
    };
  }
};
