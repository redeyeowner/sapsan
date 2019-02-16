const url = require('url');
const Route = require('../common/injectors/router/route');
const Logger = require('./services/logger');
const { ROUTE_DOES_NOT_EXIST } = require('./errors/messages');
const { LABELS } = require('./constants');

module.exports = class ApplicationContainer {
  constructor(appControllerInstance) {
    this._appControllerInstance = appControllerInstance;
    this._routes = appControllerInstance.getControllerRoutes();
    this._loggerApi = new Logger(LABELS.SAPSAN_API);
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

  getApplication() {
    return async (req, res) => {
      const response = {
        data: null,
        errors: [],
        timestamp: Date.now(),
      };
      const reqUrl = url.parse(req.url, true);
      const requestName = `${req.method} ${reqUrl.pathname}`;
      this._loggerApi.log(requestName);
      const routeId = this.getRouterIdByRequest(req);
      try {
        if (!routeId) {
          throw new Error(ROUTE_DOES_NOT_EXIST(requestName));
        }
        const route = this._appControllerInstance.getRouteById(routeId);
        if (!route) {
          throw new Error(ROUTE_DOES_NOT_EXIST(requestName));
        }
        response.data = await route.handleRequest(req);
      } catch ({ message }) {
        response.errors.push(message);
      } finally {
        response.timestamp = Date.now();
        res.end(JSON.stringify(response));
      }
    };
  }
};