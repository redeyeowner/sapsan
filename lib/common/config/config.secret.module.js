const ConfigBase = require('./config-base');

module.exports = class SecretConfigModule extends ConfigBase {
  isDefault() {
    this._isDefault = true;
    return true;
  }
};
