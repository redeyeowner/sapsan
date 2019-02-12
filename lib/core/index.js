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
const {
  WrongArgumentsNumberException,
  WrongTypeException,
} = require('../common/exceptions');
const {
  ConfigModule,
  Utils,
} = require('../common');

/**
 * Create an sapsan application.
 *
 * @class
 * @api public
 */

class Sapsan {
  constructor(appModule, configModule) {
    if (!appModule || !configModule) {
      throw new WrongArgumentsNumberException({ expectedArgsNumber: 2 });
    }
    if (!Utils.isAppController(appModule)) {
      throw new WrongTypeException({
        expectedTypes: 'ApplicationController class instance',
      });
    }
    this._logger = new Logger(LABELS.SAPSAN_APP);
    this._container = {};
    const configModuleInstance = Utils.isConfigModule(configModule)
      ? configModule
      : new ConfigModule();
    this.initConfig(configModuleInstance);
    this.initApplication(appModule);
  }

  initConfig(configModule) {
    this._databaseConfig = configModule.getDatabaseConfig();
    this._secretConfig = configModule.getSecretConfigs();
    this._locales = configModule.getLocales();
    this._applicationConfig = configModule.getApplicationConfig();
  }

  initApplication(appModule) {
    this._server = new HttpServer(() => {}, this._applicationConfig);
  }

  async start() {
    try {
      this.logger.log(MESSAGES.APPLICATION_START);
      await ExceptionsZone.asyncRun(async () => {
        this._server.run();
      });
    } catch (e) {
      process.abort();
    }
  }
}

module.exports.Sapsan = Sapsan;
module.exports = Sapsan;
