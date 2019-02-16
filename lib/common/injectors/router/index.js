const Route = require('./route');
const {
  WrongArgumentsNumberException,
  WrongTypeException,
} = require('../../exceptions');
const { isNil } = require('../../utils/shared');

module.exports = class Router {
  constructor(context, routes = null) {
    if (arguments.length !== 2) {
      throw new WrongArgumentsNumberException({ expectedArgsNumber: 2 });
    }
    if (isNil(routes)) {
      throw new WrongTypeException({
        expectedTypes: 'object',
        givenType: typeof routes,
      });
    }
    this._routes = [];
    Object.entries(routes)
      .forEach(([actionName, routeDetails]) => {
        this._routes.push(new Route(Object.assign({}, routeDetails, {
          controller: context[actionName],
        })));
      });
  }

  getRouteById(routeId) {
    const routes = this._routes.filter(route => route.hasProvidedId(routeId));
    if (routes.length === 0) {
      return null;
    }
    return routes[0];
  }

  getRoutesInstances() {
    return this._routes.map(route => route.getRouteInstance());
  }
};
