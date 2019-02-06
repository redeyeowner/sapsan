/*!
 * sapsan
 * Copyright(c) 2018 Oleh Mushka
 * MIT Licensed
 */

 /**
  * Dependencies
  */
 const { WrongArgumentsNumberExceptions } = require('../common/exceptions');

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
    this.initConfig(configModule);
    this.initApplication(appModule);
  }

  initConfig(configModule) {
    // todo
  }

  initApplication(appModule) {
    // todo
  }
}

module.exports.Sapsan = Sapsan;
module.exports = Sapsan;
