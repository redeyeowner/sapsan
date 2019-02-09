const RequestMethod = require('../constants/request-methods.constants');
const { isString, isFunction } = require('../utils/shared');
const {
  WrongTypeException,
  BadRequestMethodException,
} = require('../exceptions');

module.exports = class Route {
  constructor({
    method = null,
    path = null,
    controller = null,
  }) {
    this._method = method || RequestMethod.GET;
    this._path = path || '/';
    this._controller = controller || this._getDefaultController();
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

  _getDefaultController() {
    return (req, res) => '';
  }
}
