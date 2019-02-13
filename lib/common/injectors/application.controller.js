const { ignoreActions } = require('./injectors.constants');
const { WrongTypeException } = require('../exceptions');
const { trimSlashes, validatePath } = require('../utils/shared');
const Router = require('./router');

const isString = fn => typeof fn === 'string';
const isObject = fn => fn !== null && typeof fn === 'object';
const flattenDeep = arr => arr
  .reduce((acc, val) => Array.isArray(val)
      && acc.concat(flattenDeep(val))
      || acc.concat(val), []);

module.exports = class ApplicationController {
  constructor({
    prefix = null,
    routes = null,
    controllers = null,
  }) {
    this._prefix = prefix || '';
    this._routes = new Router(this, routes || {});
    this._includedControllers = [];
    if (Array.isArray(controllers) && controllers.length > 0) {
      for (let i = 0; i < controllers.length; i += 1) {
        this._includedControllers.push(new controllers[i]());
      }
    }
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

  _getOwnRoutes() {
    return this._routes.getRoutesInstances();
  }

  getControllerRoutes() {
    const ownRoutes = this._getOwnRoutes();
    const includedControllerRoutes = this._includedControllers
      .map(includedController => includedController.getControllerRoutes());
    const commonRoutes = [
      ...ownRoutes,
      ...flattenDeep(includedControllerRoutes),
    ];
    return commonRoutes
      .map(({ method, path }) => ({
        path: validatePath(trimSlashes(`${this._prefix}${path}`)),
        method,
      }));
  }
};
