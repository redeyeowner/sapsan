const {
  RequestMethod,
} = require('../../../../lib/common');
const ApplicationController =
  require('../../../../lib/common/injectors/application.controller');
const { BadRequestException } =
  require('../../../../lib/common/exceptions/http.exceptions');

module.exports = class UserController extends ApplicationController {
  constructor() {
    super({
      prefix: '/user',
      routes: {
        create: {
          method: RequestMethod.POST,
          path: '/',
        },
        getOne: {
          method: RequestMethod.GET,
          path: '/:id',
        },
        update: {
          method: RequestMethod.PATCH,
          path: '/:id',
        },
        delete: {
          method: RequestMethod.DELETE,
          path: '/:id',
        },
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
