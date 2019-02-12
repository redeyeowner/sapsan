const http = require('http');
const { isApplicationConfig } = require('../common/utils/shared');
const { WrongTypeException } = require('../common/exceptions');
const { LABELS } = require('./constants');
const Logger = require('./services/logger');

module.exports = class HttpServer {
  constructor(application, applicationConfig) {
    if (!isApplicationConfig(applicationConfig)) {
      throw new WrongTypeException({
        expectedTypes: 'ApplicationConfigModule:class',
        givenType: typeof applicationConfig,
      });
    }
    this._logger = new Logger(LABELS.SAPSAN_APP);
    this._port = applicationConfig.getPort();
    this._env = applicationConfig.getEnviroment();
    this._server = http.createServer(application);
  }

  run() {
    this._server.listen(this._port, () => {
      const appRunMessage = 'Run Sapsan application on';
      const portMessage = `${appRunMessage} ${this._port} port.`;
      const envMessage = `${appRunMessage} ${this._env} enviroment`;
      this._logger(portMessage);
      this._logger(envMessage);
    });
  }
};
