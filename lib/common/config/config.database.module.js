const ConfigBase = require('./config-base');

module.exports = class DatabaseConfigModule extends ConfigBase {
  isDefault() {
    this._isDefault = true;
    return true;
  }
};
