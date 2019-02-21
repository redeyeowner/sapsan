const asyncWaterfall = require('async-waterfall');
const { INTERNAL_SERVER_ERROR } =
  require('../constants/http-statuses.constants');
const { isFunction, isObject } = require('../utils');

/**
 * @class
 */
module.exports = class Action {
  /**
   * @constructor
   * @param {object} handlersArg
   * @param {function[]} handlersArg.validators
   * @param {function[]} handlersArg.serializers
   * @param {function[]} handlersArg.middlewares
   * @param {function} handlersArg.mainHandler
   * @param {function[]} handlersArg.exceptionFilters
   * @param {function[]} handlersArg.deserializers
   */
  constructor(handlersArg) {
    const handlers = isObject(handlersArg)
      ? handlersArg
      : {};
    this._validators = Action.validateHandler(handlers.validators);
    this._serializers = Action.validateHandler(handlers.serializers);
    this._middlewares = Action.validateHandler(handlers.middlewares);
    this._mainHandler = Action.validateAction(handlers.mainHandler);
    this._exceptionFilters = Action.validateHandler(handlers.exceptionFilters);
    this._deserializers = Action.validateHandler(handlers.deserializers);
  }

  static validateAction(action) {
    if (isFunction(action)) {
      return action;
    }
    return () => ({});
  }

  static validateHandler(handlers) {
    if (Array.isArray(handlers) && handlers.every(isFunction)) {
      return handlers;
    }
    if (isFunction(handlers)) {
      return [handlers];
    }
    throw new Error('handlers is not function or array of functions');
  }

  /**
   * @method applyHandler
   * @param {object} target
   * @param {function | function[]} handlersToApply
   *
   * @static
   *
   * @return {boolean}
   */
  static applyHandler(target, handlersToApply) {
    if (
      Array.isArray(handlersToApply)
      && handlersToApply.every(isFunction)
    ) {
      handlersToApply.forEach((validator) => {
        target.push(validator);
      });
      return true;
    }
    if (isFunction(handlersToApply)) {
      target.push(handlersToApply);
      return true;
    }
    return false;
  }

  static getDefaultExceptionFilter() {
    return (exception) => {
      let data;
      const statusCode = exception && isFunction(exception.getStatus)
        ? exception.getStatus()
        : INTERNAL_SERVER_ERROR;
      if (exception && isFunction(exception.getResponse)) {
        data = exception.getResponse().message;
      } else if (exception && exception.message) {
        data = exception.message;
      } else {
        data = 'Internal Server Error';
      }
      return {
        statusCode,
        data,
      };
    };
  }

  /**
   * @method applyValidators
   * @param {function | function[]} validatorsToApply
   *
   * @public
   *
   * @return {boolean}
   */
  applyValidators(validatorsToApply) {
    return Action.applyHandler(this._validators, validatorsToApply);
  }

  /**
   * @method applySerializers
   * @param {function | function[]} serializersToApply
   *
   * @public
   *
   * @return {boolean}
   */
  applySerializers(serializersToApply) {
    return Action.applyHandler(this._serializers, serializersToApply);
  }

  /**
   * @method applyMiddlewares
   * @param {function | function[]} middlewaresToApply
   *
   * @public
   *
   * @return {boolean}
   */
  applyMiddlewares(middlewaresToApply) {
    return Action.applyHandler(this._middlewares, middlewaresToApply);
  }

  /**
   * @method applyExceptionFilters
   * @param {function | function[]} exceptionFiltersToApply
   *
   * @public
   *
   * @return {boolean}
   */
  applyExceptionFilters(exceptionFiltersToApply) {
    return Action.applyHandler(
      this._exceptionFilters,
      exceptionFiltersToApply,
    );
  }

  /**
   * @method applyDeserializers
   * @param {function | function[]} deserializersToApply
   *
   * @public
   *
   * @return {boolean}
   */
  applyDeserializers(deserializersToApply) {
    return Action.applyHandler(this._deserializers, deserializersToApply);
  }

  getValidators() {
    return this._validators;
  }

  getSerializers() {
    return this._serializers;
  }

  getMiddlewares() {
    return this._middlewares;
  }

  getExceptionFilters() {
    return this._exceptionFilters;
  }

  getDeserializers() {
    return this._deserializers;
  }

  mergeActionToThis(action) {
    this.applyValidators(action.getValidators());
    this.applySerializers(action.getSerializers());
    this.applyMiddlewares(action.getMiddlewares());
    this.applyExceptionFilters(action.getExceptionFilters());
    this.applyDeserializers(action.getDeserializers());
  }

  useValidators(context) {
    const validatorsList = this._validators
      .map(validator => async (...args) => {
        const callback = args[args.length - 1];
        try {
          const result = await validator(context);
          callback(null, result);
        } catch (error) {
          callback(error);
        }
      });
    return new Promise((resolve, reject) => {
      asyncWaterfall(validatorsList, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }

  handleExceptions(error) {
    const exceptionFiltersList = [
      ...this._exceptionFilters,
      Action.getDefaultExceptionFilter(),
    ]
      .map((exceptionFilter, i) => async (...args) => {
        const callback = args[args.length - 1];
        const prevResult = i === 0
          ? {}
          : args[0];
        if (prevResult && prevResult.isFinish) {
          callback(null, prevResult);
        }
        const result = {
          isFinish: false,
          data: null,
        };
        try {
          result.data = await exceptionFilter(error);
          if (result.data) {
            result.isFinish = true;
          }
          callback(null, result);
        } catch (exceptionFilterError) {
          callback(exceptionFilterError);
        }
      });
    return new Promise((resolve, reject) => {
      asyncWaterfall(exceptionFiltersList, (exceptionFilterError, data) => {
        if (exceptionFilterError) {
          reject(exceptionFilterError);
        } else {
          resolve(data);
        }
      });
    });
  }
};
