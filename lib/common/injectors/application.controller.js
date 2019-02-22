const assert = require('assert');
const { ignoreActions } = require('./injectors.constants');
const { WrongTypeException } = require('../exceptions');
const Router = require('./router');
const Route = require('./router/route');
const Action = require('./action');
const {
  isNil,
  isObject,
  isString,
} = require('../utils');

module.exports = class ApplicationController {
  constructor({
    prefix = null,
    routes = null,
    controllers = null,
    validators = null,
    serializers = null,
    middlewares = null,
    exceptionFilters = null,
    deserializers = null,
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
    assert.ok(isString(this._prefix), new WrongTypeException({
      expectedTypes: ['string'],
      givenType: typeof this._prefix,
    }));
    this._validators = Route.getValidHandler(validators);
    this._serializers = Route.getValidHandler(serializers);
    this._middlewares = Route.getValidHandler(middlewares);
    this._exceptionFilters = Route.getValidHandler(exceptionFilters);
    this._deserializers = Route.getValidHandler(deserializers);
  }

  getPrefix() {
    return this._prefix;
  }

  _getUnresolvedRoutes() {
    assert.ok(isObject(this._routes), new WrongTypeException({
      expectedTypes: ['object'],
      givenType: typeof this._routes,
    }));
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

  _getOwnHandlers() {
    return {
      validators: this._validators,
      serializers: this._serializers,
      middlewares: this._middlewares,
      exceptionFilters: this._exceptionFilters,
      deserializers: this._deserializers,
    };
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

  compareSplitedPathes(splitedPathToCompare) {
    if (
      !Array.isArray(splitedPathToCompare)
      || splitedPathToCompare.length === 0
    ) {
      return false;
    }
    return this._splitedPrefix
      .every((pathPiece, i) => pathPiece === splitedPathToCompare[i]);
  }

  cutPrefixFromSplitedPath(splitedPathToCut) {
    return splitedPathToCut.slice(this._splitedPrefix.length);
  }

  getActionBySplitedPathAndRouteId(splitedPath, routeId, highAction) {
    const result = {
      splitedPath,
      routeId,
      action: null,
      isSuccess: false,
      isFinish: false,
    };
    const isMatchedPathnames = this.compareSplitedPathes(splitedPath);
    if (!isMatchedPathnames) {
      return result;
    }
    result.isSuccess = true;
    const handlersArg = this._getOwnHandlers();
    const ownAction = Reflect.construct(Action, [handlersArg]);
    if (highAction instanceof Action) {
      highAction.mergeActionToThis(ownAction);
    }
    result.action = isNil(highAction)
      ? ownAction
      : highAction;
    const matchedRoute = this._routes.getRouteById(routeId);
    if (!isNil(matchedRoute)) {
      const routeHandlers = matchedRoute.getHandlers();
      const routeAction = Reflect.construct(Action, [routeHandlers]);
      result.action.mergeActionToThis(routeAction);
      result.isFinish = true;
      return result;
    }
    const newSplitedPath = this.cutPrefixFromSplitedPath(splitedPath);
    let includedControllerResult;
    let isFoundMatchedIncludedController = false;
    this._includedControllers.forEach((includedController) => {
      if (isFoundMatchedIncludedController) {
        return;
      }
      includedControllerResult = includedController
        .getActionBySplitedPathAndRouteId(
          newSplitedPath,
          routeId,
          result.action,
        );
      if (includedControllerResult.isFinish) {
        isFoundMatchedIncludedController = true;
      }
    });
    return includedControllerResult;
  }
};
