const {
  RequestMethod,
} = require('../../../../lib/common');
const ApplicationController =
  require('../../../../lib/common/injectors/application.controller');
const FacebookAuthController =
  require('./facebook.auth/facebook.auth.controller');


module.exports = class AuthController extends ApplicationController {
  constructor() {
    super({
      controllers: [FacebookAuthController],
      prefix: '/auth',
      routes: {
        signIn: {
          method: RequestMethod.POST,
          path: '/sign_in',
        },
        signOut: {
          method: RequestMethod.POST,
          path: '/sign_out',
        },
      },
    });
    this._name = 'auth';
  }

  signIn() {
    return {
      method: 'sign-in',
      name: this._name,
    };
  }

  signOut() {
    return {
      method: 'sign-out',
      name: this._name,
    };
  }
};
