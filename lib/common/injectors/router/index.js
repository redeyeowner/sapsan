const Route = require('./route');
const {
  WrongArgumentsNumberException,
  WrongTypeException,
} = require('../../exceptions');

const isNil = fn => [undefined, null].includes(fn);

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

  getRoutesInstances() {
    return this._routes.map(route => route.getRouteInstance());
  }
};
