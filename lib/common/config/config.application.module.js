const ConfigBase = require('./config-base');
const { default: { application } } = require('./config.constants');

module.exports = class ApplicationConfigModule extends ConfigBase {
  constructor({
    port,
    enviromental,
  } = {}) {
    this.port = port || application.port;
    this.enviromental = enviromental || application.enviromental;
  }

  isDefault() {
    return this.port === application.port
      && this.enviromental === application.enviromental;
  }
};
