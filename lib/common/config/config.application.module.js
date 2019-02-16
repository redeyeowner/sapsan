const ConfigBase = require('./config-base');
const { default: { application } } = require('./config.constants');

module.exports = class ApplicationConfigModule extends ConfigBase {
  constructor({
    port,
    enviroment,
  } = {}) {
    super();
    this._port = port || application.port;
    this._enviroment = enviroment || application.enviroment;
  }

  getPort() {
    return this._port;
  }

  getEnviroment() {
    return this._enviroment;
  }

  isDefault() {
    return this._port === application.port
      && this._enviromental === application.enviromental;
  }
};
