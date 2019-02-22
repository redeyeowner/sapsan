const assert = require('assert');
const RequestMethod = require('../../constants/request-methods.constants');
const Context = require('../context');
const {
  WrongTypeException,
  BadRequestMethodException,
} = require('../../exceptions');
const {
  isString,
  isFunction,
  trimSlashes,
  generateUuidString,
} = require('../../utils');

module.exports = class Route {
  constructor({
    method = null,
    path = null,
    controller = null,
    validators = null,
    serializers = null,
    middlewares = null,
    exceptionFilters = null,
    deserializers = null,
  }) {
    this._id = generateUuidString();
    this._method = method || RequestMethod.GET;
    this._path = Route.validatePath(path);
    this._splitedPath = Route.splitPathBySlashes(this._path);
    this._controller = controller || (req => req);
    assert.ok(isString(this._method), new WrongTypeException({
      expectedTypes: ['string'],
      givenType: typeof this._method,
    }));
    assert.ok(
      Object.values(RequestMethod).includes(this._method),
      new BadRequestMethodException({ givenMethod: this._method }),
    );
    assert.ok(isString(this._path), new WrongTypeException({
      expectedTypes: ['string'],
      givenType: typeof this._path,
    }));
    assert.ok(isFunction(this._controller), new WrongTypeException({
      expectedTypes: ['function'],
      givenType: typeof this._controller,
    }));
    this._validators = Route.getValidHandler(validators);
    this._serializers = Route.getValidHandler(serializers);
    this._middlewares = Route.getValidHandler(middlewares);
    this._exceptionFilters = Route.getValidHandler(exceptionFilters);
    this._deserializers = Route.getValidHandler(deserializers);
  }

  static getValidHandler(handlers) {
    if (Array.isArray(handlers) && handlers.every(isFunction)) {
      return handlers;
    }
    if (isFunction(handlers)) {
      return [handlers];
    }
    return [];
  }

  static splitPathBySlashes(path) {
    return path.split('/').filter(Boolean);
  }

  static validatePath(path) {
    if (!isString(path)) {
      return '';
    }
    return trimSlashes(path);
  }

  static isParams(el1, el2) {
    const paramPattern = /^:/;
    if (paramPattern.test(el1)) {
      return true;
    }
    if (paramPattern.test(el2)) {
      return true;
    }
    return false;
  }

  static isSameUrls(url1, url2) {
    if (url1.length !== url2.length) {
      return false;
    }
    return url1
      .every(
        (url1Element, i) => url1Element === url2[i]
          || Route.isParams(url1Element, url2[i]),
      );
  }

  hasProvidedId(routeId) {
    return this._id === routeId;
  }

  async handleRequest(request, action) {
    const result = {
      data: null,
      errors: null,
    };
    let context;
    try {
      context = Reflect.construct(Context, [request]);
    } catch (error) {
      result.error = error;
    }
    try {
      await action.useValidators(context);
      await action.useSerializers(context);
      await action.useMiddlewares(context);
      const controllerResult = await this._controller(context);
      result.data = await action.useDeserializers(controllerResult);
    } catch (error) {
      result.errors = error;
    }
    return result;
  }

  getRouteInstance() {
    return {
      id: this._id,
      method: this._method,
      path: this._splitedPath,
    };
  }

  getHandlers() {
    return {
      validators: this._validators,
      serializers: this._serializers,
      middlewares: this._middlewares,
      exceptionFilters: this._exceptionFilters,
      deserializers: this._deserializers,
    };
  }
};
