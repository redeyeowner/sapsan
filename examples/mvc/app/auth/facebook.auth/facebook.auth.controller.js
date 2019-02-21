const {
  ApplicationController,
  RequestMethod: { POST },
} = require('../../../../../index');

module.exports = class FacebookAuthController extends ApplicationController {
  constructor() {
    super({
      prefix: '/facebook',
      routes: {
        signIn: { method: POST, path: '/sign_in' },
        signOut: { method: POST, path: '/sign_out' },
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
