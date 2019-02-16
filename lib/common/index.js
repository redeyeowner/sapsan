module.exports.ConfigModule = require('./config/config.module');
module.exports.ApplicationController =
  require('./injectors/application.controller');
module.exports.HttpStatuses = require('./constants/http-statuses.constants');
module.exports.RequestMethod = require('./constants/request-methods.constants');
module.exports.Utils = require('./utils/shared');
