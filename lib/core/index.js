/*!
 * sapsan
 * Copyright(c) 2019 Oleh Mushka
 * MIT Licensed
 */

 /**
  * Dependencies
  */
 const { WrongArgumentsNumberException } = require('../common/exceptions');
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
      throw new WrongArgumentsNumberException({ expectedArgsNumber: 2 });
    }
    const configModuleInstance = configModule instanceof ConfigModule
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
    // todo
  }
}

module.exports.Sapsan = Sapsan;
module.exports = Sapsan;
