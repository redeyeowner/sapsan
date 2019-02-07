const { default: defaultConfigs } = require('./config.constants');

/**
 * @class
 */
module.exports = class ConfligModule {
  constructor({
    locales,
    database,
    secret,
    webServer,
  } = {}) {
    this._initializeDefault();
    if (locales) {
      this._initializeLocales(locales);
    }
    if (database) {
      this._initializeDatabaseConfig(database);
    }
    if (secret) {
      this._initializeSecretConfig(secret);
    }
    if (webServer) {
      this._initializeWebServerConfig(webServer);
    }
  }

  _initializeDefault() {
    const {
      webServer: {
        port,
        enviromental,
      },
    } = defaultConfigs;
    this._locales = {};
    this._database = {};
    this._secret = {};
    this._webServer = {
      port,
      enviromental,
    };
  }

  _initializeLocales(locales) {
    this._locales = locales;
  }

  _initializeDatabaseConfig(databaseConfigs) {
    this._database = databaseConfigs;
  }

  _initializeSecretConfig(secretConfigs) {
    this._secret = secretConfigs;
  }

  _initializeWebServerConfig(webServerConfig) {
    this._webServer = webServerConfig;
  }

  getLocales() {
    return this._locales;
  }

  getDatabaseConfig() {
    return this._database;
  }

  getSecretConfig() {
    return this._secret;
  }

  getWebServerConfig() {
    return this._webServer;
  }
};
