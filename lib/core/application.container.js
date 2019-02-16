const url = require('url');
const Route = require('../common/injectors/router/route');

module.exports = class ApplicationContainer {
  constructor(routes) {
    this._routes = routes;
  }

  getRouterIdByRequest(req) {
    const { method } = req;
    const { pathname } = url.parse(req.url, true);
    const splitedPathname = Route.splitPathBySlashes(
      Route.validatePath(pathname),
    );
    const matchedUrls = this._routes
      .filter(route => Route.isSameUrls(route.path, splitedPathname)
        && route.method === method);
    if (matchedUrls.length === 0) {
      return null;
    }
    return matchedUrls[0].id;
  }
};
