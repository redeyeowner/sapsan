const { ignoreActions } = require('./injectors.constants');
const {
  isObject,
  isString,
} = require('../utils/shared');
const { WrongTypeException } = require('../exceptions');
const Router = require('./router');

module.exports = class Module {
  constructor({
    prefix = null,
    routes = null,
  }) {
    this._prefix = prefix || '';
    this._routes = new Router(routes || {});
    this._includedModules = [];
    if (!isString(this._prefix)) {
      throw new WrongTypeException({
        expectedTypes: ['string'],
        givenType: typeof this._prefix,
      });
    }
  }

  getPrefix() {
    return this._prefix;
  }

  _getUnresolvedRoutes() {
    if (!isObject(this._routes)) {
      throw new WrongTypeException({
        expectedTypes: ['object'],
        givenType: typeof this._routes,
      });
    }
    const routeActionNames = Object.keys(this._routes) || [];
    const classInstanceActionNames = this._getActions() || [];
    return routeActionNames
      .filter(name => !classInstanceActionNames.includes(name));
  }

  _getActions() {
    return Object
      .getOwnPropertyNames(Object.getPrototypeOf(this))
      .filter(prop => !ignoreActions.includes(prop));
  }
};
