const {
  ApplicationController,
  RequestMethod: {
    GET,
    POST,
    PATCH,
    DELETE,
  },
  Exceptions: {
    BadRequestException,
    InternalServerErrorException,
  },
} = require('../../../../index');
const { userCreateValidator } = require('./user.validators');

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
      validators: [userCreateValidator],
    });
    this._name = 'user';
  }

  async create(ctx) {
    try {
      const body = await ctx.getBody();
      return {
        method: 'create',
        name: this._name,
        body,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
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
