const { ignoreActions } = require('./injectors.constants');
const { isObject } = require('../utils/shared');
const { WrongTypeException } = require('../exceptions');

module.exports = class Module {
  constructor({
    prefix = null,
    routes = null,
  }) {
    this._prefix = prefix || '';
    this._routes = routes || {};
    this._includedModules = [];
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
      .filter(name => !classInstanceActionNames.includes(routeActionNames));
  }

  _getActions() {
    return Object
      .getOwnPropertyNames(Object.getPrototypeOf(this))
      .filter(prop => !ignoreActions.includes(prop));
  }
}