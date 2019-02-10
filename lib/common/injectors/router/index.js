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
    this._routes = new Set();
    Object.entries(routes)
      .forEach(([actionName, routeDetails]) => {
        this._routes.add(new Route(Object.assign({}, routeDetails, {
          controller: context[actionName],
        })));
      });
  }
};
