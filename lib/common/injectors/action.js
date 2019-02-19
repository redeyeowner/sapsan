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
};
