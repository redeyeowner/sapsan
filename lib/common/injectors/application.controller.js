const { ignoreActions } = require('./injectors.constants');
const { WrongTypeException } = require('../exceptions');
const Router = require('./router');
const Route = require('./router/route');
const { isString, isObject } = require('../utils');

module.exports = class ApplicationController {
  constructor({
    prefix = null,
    routes = null,
    controllers = null,
  }) {
    this._prefix = Route.validatePath(prefix);
    this._splitedPrefix = Route.splitPathBySlashes(this._prefix);
    this._routes = Reflect.construct(Router, [this, routes || {}]);
    this._includedControllers = [];
    if (Array.isArray(controllers) && controllers.length > 0) {
      controllers.forEach((controller) => {
        this._includedControllers.push(Reflect.construct(controller, []));
      });
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
    const routeActionNames = Reflect.ownKeys(this._routes) || [];
    const classInstanceActionNames = this._getActions() || [];
    return routeActionNames
      .filter(name => !classInstanceActionNames.includes(name));
  }

  _getActions() {
    return Object
      .getOwnPropertyNames(Reflect.getPrototypeOf(this))
      .filter(prop => !ignoreActions.includes(prop));
  }

  _getOwnRoutes() {
    return this._routes.getRoutesInstances();
  }

  _getIncludedRoutes() {
    return this._includedControllers
      .reduce((routes, controller) => ([
        ...routes,
        ...controller.getControllerRoutes(),
      ]), []);
  }

  getRouteById(routeId) {
    const ownMatchRoute = this._routes.getRouteById(routeId);
    if (ownMatchRoute) {
      return ownMatchRoute;
    }
    const includedRoutes = this._includedControllers
      .map(controller => controller.getRouteById(routeId))
      .filter(Boolean);
    if (Array.isArray(includedRoutes) && includedRoutes.length > 0) {
      return includedRoutes[0];
    }
    return null;
  }

  getControllerRoutes() {
    const ownRoutes = this._getOwnRoutes();
    const includedControllerRoutes = this._getIncludedRoutes();
    const commonRoutes = [
      ...ownRoutes,
      ...includedControllerRoutes,
    ];
    return commonRoutes
      .map(({
        id,
        method,
        path,
      }) => ({
        id,
        method,
        path: [...this._splitedPrefix, ...path],
      }));
  }
};
