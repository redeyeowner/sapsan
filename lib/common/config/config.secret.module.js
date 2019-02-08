const ConfigBase = require('./config-base');

module.exports = class SecretConfigModule extends ConfigBase {
  constructor() {
    // todo
  }

  isDefault() {
    return true;
  }
};
