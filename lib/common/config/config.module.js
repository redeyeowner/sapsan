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
    this._locales = Reflect.construct(LocalesConfigModule, []);
    this._database = Reflect.construct(DatabaseConfigModule, []);
    this._secret = Reflect.construct(SecretConfigModule, []);
    this._application = Reflect.construct(ApplicationConfigModule, []);
  }

  _initializeLocales(locales = {}) {
    this._locales = Reflect.construct(LocalesConfigModule, [locales]);
  }

  _initializeDatabaseConfig(databaseConfigs = {}) {
    this._database = Reflect.construct(
      DatabaseConfigModule,
      [databaseConfigs],
    );
  }

  _initializeSecretConfig(secretConfigs = {}) {
    this._secret = Reflect.construct(SecretConfigModule, [secretConfigs]);
  }

  _initializeApplicationConfig(applicationConfig) {
    this._application = Reflect.construct(
      ApplicationConfigModule,
      [applicationConfig],
    );
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
