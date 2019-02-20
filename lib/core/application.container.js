const url = require('url');
const Route = require('../common/injectors/router/route');
const { NotFoundException } = require('../common/exceptions/http.exceptions');
const HttpStatuses = require('../common/constants/http-statuses.constants');
const {
  handleResponse,
} = require('../common/utils');
const Logger = require('./services/logger');
const { ROUTE_DOES_NOT_EXIST } = require('./errors/messages');
const { LABELS } = require('./constants');

const getSplitedPathnameFromRequest = (request) => {
  const { pathname } = url.parse(request.url, true);
  return Route.splitPathBySlashes(
    Route.validatePath(pathname),
  );
};

module.exports = class ApplicationContainer {
  constructor(appControllerInstance) {
    this._appControllerInstance = appControllerInstance;
    this._routes = appControllerInstance.getControllerRoutes();
    this._loggerApi = Reflect.construct(Logger, [LABELS.SAPSAN_API]);
  }

  getRouterIdByRequest(request) {
    const { method } = request;
    const splitedPathname = getSplitedPathnameFromRequest(request);
    const matchedUrls = this._routes
      .filter(route => Route.isSameUrls(route.path, splitedPathname)
        && route.method === method);
    if (matchedUrls.length === 0) {
      return null;
    }
    return matchedUrls[0].id;
  }

  getActionByRequestAndId(request, routeId) {
    const splitedPath = getSplitedPathnameFromRequest(request);
    return this._appControllerInstance
      .getActionBySplitedPathAndRouteId(splitedPath, routeId);
  }

  getApplication() {
    return async (req, res) => {
      let returnInResponse;
      let action;
      let exception;
      const reqUrl = url.parse(req.url, true);
      const requestName = `${req.method} ${reqUrl.pathname}`;
      this._loggerApi.log(requestName);
      const routeId = this.getRouterIdByRequest(req);
      try {
        if (!routeId) {
          throw new NotFoundException(ROUTE_DOES_NOT_EXIST(requestName));
        }
        const route = this._appControllerInstance.getRouteById(routeId);
        if (!route) {
          throw new NotFoundException(ROUTE_DOES_NOT_EXIST(requestName));
        }
        // TODO apply action to handle request
        action = await this.getActionByRequestAndId(req, routeId).action;
        const response = await route.handleRequest(req, action);
        returnInResponse = response.data;
        if (response.errors) {
          throw response.errors;
        }
        res.end(handleResponse(returnInResponse));
      } catch (error) {
        exception = error;
      }
      try {
        const {
          data: exceptionResponse,
        } = await action.handleExceptions(exception);
        res.statusCode = exceptionResponse.statusCode;
        res.end(handleResponse(exceptionResponse.data));
      } catch (error) {
        res.statusCode = HttpStatuses.INTERNAL_SERVER_ERROR;
        res.end({ error });
      }
    };
  }
};
