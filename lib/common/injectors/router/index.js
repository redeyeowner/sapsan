const assert = require('assert');
const Route = require('./route');
const {
  WrongArgumentsNumberException,
  WrongTypeException,
} = require('../../exceptions');
const { isNil } = require('../../utils');

module.exports = class Router {
  constructor(context, routes = null) {
    assert.ok(
      arguments.length === 2,
      new WrongArgumentsNumberException({ expectedArgsNumber: 2 }),
    );
    assert.ok(
      !isNil(routes),
      new WrongTypeException({
        expectedTypes: 'object',
        givenType: typeof routes,
      }),
    );
    this._routes = [];
    Object.entries(routes)
      .forEach(([actionName, routeDetails]) => {
        this._routes.push(Reflect.construct(
          Route, [
            Object
              .assign({}, routeDetails, { controller: context[actionName] }),
          ],
        ));
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
