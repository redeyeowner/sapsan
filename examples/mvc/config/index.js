const { ConfigModule } = require('../../../index');
const locales = require('./locales');
const database = require('./database.config');
const secret = require('./secret.config');
const application = require('./application.config');

module.exports = class MainConfigModule extends ConfigModule {
  constructor() {
    super({
      locales,
      database,
      secret,
      application,
    });
  }
};
