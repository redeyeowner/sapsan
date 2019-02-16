const ApplicationController =
  require('../../../lib/common/injectors/application.controller');
const AuthController = require('./auth/auth.controller');
const UserController = require('./user/user.controller');

module.exports = class AppController extends ApplicationController {
  constructor() {
    super({
      prefix: '/api/v1',
      controllers: [
        AuthController,
        UserController,
      ],
    });
    this._name = 'root';
  }
};
