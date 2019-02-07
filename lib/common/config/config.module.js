const LocalesConfigModule = require('./config.locales.module');
const DatabaseConfigModule = require('./config.database.module');
const SecretConfigModule = require('./config.secret.module');
const ApplicationConfigModule = require('./config.application.module');

/**
 * @class
 */
module.exports = class ConfligModule {
  constructor({
    locales,
    database,
    secret,
    application,
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
    if (application) {
      this._initializeApplicationConfig(application);
    }
  }

  _initializeDefault() {
    this._locales = new LocalesConfigModule();
    this._database = new DatabaseConfigModule();
    this._secret = new SecretConfigModule();
    this._application = new ApplicationConfigModule();
  }

  _initializeLocales(locales = {}) {
    this._locales = new LocalesConfigModule(locales);
  }

  _initializeDatabaseConfig(databaseConfigs = {}) {
    this._database = new DatabaseConfigModule(databaseConfigs);
  }

  _initializeSecretConfig(secretConfigs = {}) {
    this._secret = new SecretConfigModule(secretConfigs);
  }

  _initializeApplicationConfig(applicationConfig) {
    this._application = new ApplicationConfigModule(applicationConfig);
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

  getApplicationConfig() {
    return this._application;
  }
};
