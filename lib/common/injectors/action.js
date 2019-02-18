const { isFunction, isObject } = require('../utils/shared');

/**
 * @class
 */
module.exports = class Action {
  /**
   * @constructor
   * @param {object} handlersArg
   * @param {function} handlersArg.mainHandler
   * @param {function} handlersArg.exceptionFilters
   */
  constructor(handlersArg) {
    const handlers = isObject(handlersArg)
      ? handlersArg
      : {};
    this._validators = []; // TODO: develop validators
    this._serializers = []; // TODO: develop serializers
    this._middlewares = []; // TODO: develop middlewares
    this._mainHandler = Action.validateAction(handlers.mainHandler);
    this._exceptionFilters = []; // TODO: develop exceptionFilters
    this._deserializers = []; // TODO: develop deserializers
  }

  static validateAction(action) {
    if (isFunction(action)) {
      return action;
    }
    return () => ({});
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
};
