const {
  ApplicationController,
  RequestMethod: {
    GET,
    POST,
    PATCH,
    DELETE,
  },
  Exceptions: { BadRequestException },
} = require('../../../../index');

module.exports = class UserController extends ApplicationController {
  constructor() {
    super({
      prefix: '/user',
      routes: {
        create: { method: POST, path: '/' },
        getOne: { method: GET, path: '/:id' },
        update: { method: PATCH, path: '/:id' },
        delete: { method: DELETE, path: '/:id' },
      },
    });
    this._name = 'user';
  }

  create() {
    return {
      method: 'create',
      name: this._name,
    };
  }

  getOne() {
    const qwe = 1;
    if (qwe === 1) {
      throw new BadRequestException('Guarantee error');
    }
    return {
      method: 'get-one',
      name: this._name,
    };
  }

  update() {
    return {
      method: 'update',
      name: this._name,
    };
  }

  delete() {
    return {
      method: 'delete',
      name: this._name,
    };
  }
};
