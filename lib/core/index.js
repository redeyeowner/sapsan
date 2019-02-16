/* eslint class-methods-use-this: 0 */
/* eslint no-unused-vars: 0 */
/*!
 * sapsan
 * Copyright(c) 2019 Oleh Mushka
 * MIT Licensed
 */

/**
 * Dependencies
 */
const url = require('url');
const ExceptionsZone = require('./errors/exception-zone');
const { ROUTE_DOES_NOT_EXIST } = require('./errors/messages');
const Logger = require('./services/logger');
const HttpServer = require('./http-server');
const { MESSAGES, LABELS } = require('./constants');
const ApplicationContainer = require('./application.container');

/**
 * Create an sapsan application.
 *
 * @class
 * @api public
 */

class Sapsan {
  constructor() {
    this._loggerApp = new Logger(LABELS.SAPSAN_APP);
    this._loggerApi = new Logger(LABELS.SAPSAN_API);
    this._container = {};
  }

  initConfig(ConfigModule) {
    const configModuleInstance = new ConfigModule();
    this._databaseConfig = configModuleInstance.getDatabaseConfig();
    this._secretConfig = configModuleInstance.getSecretConfig();
    this._locales = configModuleInstance.getLocales();
    this._applicationConfig = configModuleInstance.getApplicationConfig();
  }

  initApplication(AppController) {
    const appControllerInstance = new AppController();
    const instances = appControllerInstance.getControllerRoutes();
    const container = new ApplicationContainer(instances);
    this._server = new HttpServer(async (req, res) => {
      const response = {
        data: null,
        errors: [],
        timestamp: Date.now(),
      };
      const reqUrl = url.parse(req.url, true);
      const requestName = `${req.method} ${reqUrl.pathname}`;
      this._loggerApi.log(requestName);
      const routeId = container.getRouterIdByRequest(req);
      try {
        if (!routeId) {
          throw new Error(ROUTE_DOES_NOT_EXIST(requestName));
        }
        const route = appControllerInstance.getRouteById(routeId);
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
    }, this._applicationConfig);
  }

  async start() {
    try {
      this._loggerApp.log(MESSAGES.APPLICATION_START);
      const exceptionZoneInstance = new ExceptionsZone();
      await exceptionZoneInstance.asyncRun(async () => {
        this._server.run();
      });
    } catch (e) {
      process.abort();
    }
  }
}

module.exports.Sapsan = Sapsan;
module.exports = Sapsan;
