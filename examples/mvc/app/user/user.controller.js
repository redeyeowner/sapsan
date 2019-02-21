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
const { createUseSerializer } = require('./user.serializers');
const { createUseDeserializer } = require('./user.deserializers');
const badUserDataExceptionFilter =
  require('../exception-filters/bad-user-data.exception-filter');

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
      serializers: [createUseSerializer],
      deserializers: [createUseDeserializer],
      exceptionFilters: [badUserDataExceptionFilter],
    });
    this._name = 'user';
  }

  async create(ctx) {
    try {
      const body = await ctx.getBody();
      const { state } = ctx;
      return {
        method: 'create',
        name: this._name,
        body,
        state,
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
