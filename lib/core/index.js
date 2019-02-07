/*!
 * sapsan
 * Copyright(c) 2018 Oleh Mushka
 * MIT Licensed
 */

 /**
  * Dependencies
  */
 const { WrongArgumentsNumberExceptions } = require('./exceptions');
 const { ConfigModule } = require('../common');

/**
 * Create an sapsan application.
 *
 * @class
 * @api public
 */

class Sapsan {
  constructor(appModule, configModule) {
    if (!appModule || !configModule) {
      throw new WrongArgumentsNumberExceptions();
    }
    const configModuleInstance = configModule instanceof ConfigModule
      ? configModule
      : new ConfigModule();
    this.initConfig(configModuleInstance);
    this.initApplication(appModule);
  }

  initConfig(configModule) {
    this._databaseConfigs = configModule.getDatabaseConfig();
    this._secretConfig = configModule.getSecretConfigs();
    this._locales = configModule.getLocales();
  }

  initApplication(appModule) {
    // todo
  }
}

module.exports.Sapsan = Sapsan;
module.exports = Sapsan;
