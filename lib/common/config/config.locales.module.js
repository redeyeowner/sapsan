const ConfigBase = require('./config-base');

module.exports = class LocalesConfigModule extends ConfigBase {
  isDefault() {
    this._isDefault = true;
    return true;
  }
};
