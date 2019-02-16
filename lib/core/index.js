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
const ExceptionsZone = require('./errors/exception-zone');
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
    const container = new ApplicationContainer(appControllerInstance);
    this._server = new HttpServer(
      container.getApplication(),
      this._applicationConfig,
    );
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
