const {
  isConfigModule,
  isEmpty,
  isFunction,
  isString,
  isSymbol,
  isUndefined,
  isNil,
  isObject,
} = require('../../../../lib/common/utils/type.util');
const ConfigModule = require('../../../../lib/common/config/config.module');
const {
  WrongConfigModule,
} = require('../../../mocks/common/configs/config.module');

describe('Type checking utils tests', () => {
  test('isConfigModule tests', () => {
    const configModuleInstance = Reflect.construct(ConfigModule, []);
    const wrongConfigModuleInstance = Reflect.construct(WrongConfigModule, []);
    expect(isConfigModule(configModuleInstance)).toBe(true);
    expect(isConfigModule(wrongConfigModuleInstance)).toBe(false);
    expect(isConfigModule(null)).toBe(false);
    expect(isConfigModule(undefined)).toBe(false);
    expect(isConfigModule(10)).toBe(false);
    expect(isConfigModule('string')).toBe(false);
    expect(isConfigModule('10')).toBe(false);
    expect(isConfigModule({ test: null })).toBe(false);
  });
  test('isEmpty tests', () => {
    const filledArray = Array(10).fill(10);
    const emptyArray = [];
    expect(isEmpty(filledArray)).toBe(false);
    expect(isEmpty(emptyArray)).toBe(true);
    expect(isEmpty(null)).toBe(true);
    expect(isEmpty(undefined)).toBe(true);
    expect(isEmpty(10)).toBe(true);
    expect(isEmpty('10')).toBe(true);
    expect(isEmpty('qwerty')).toBe(true);
    expect(isEmpty({ test: null })).toBe(true);
  });
  test('isFunction tests', () => {
    const goodFunction = () => {};
    expect(isFunction(goodFunction)).toBe(true);
    expect(isFunction(null)).toBe(false);
    expect(isFunction(undefined)).toBe(false);
    expect(isFunction(10)).toBe(false);
    expect(isFunction('10')).toBe(false);
    expect(isFunction('qwerty')).toBe(false);
    expect(isFunction({ test: null })).toBe(false);
  });
  test('isString tests', () => {
    const emptyString = '';
    const goodString = 'qwerty';
    expect(isString(emptyString)).toBe(true);
    expect(isString(goodString)).toBe(true);
    expect(isString(Symbol(goodString))).toBe(false);
    expect(isString(null)).toBe(false);
    expect(isString(undefined)).toBe(false);
    expect(isString(10)).toBe(false);
    expect(isString({ test: null })).toBe(false);
    expect(isString(() => {})).toBe(false);
  });
  test('isSymbol tests', () => {
    const symbol = Symbol('symbol');
    expect(isSymbol(symbol)).toBe(true);
    expect(isSymbol('qwerty')).toBe(false);
    expect(isSymbol('10')).toBe(false);
    expect(isSymbol(null)).toBe(false);
    expect(isSymbol(undefined)).toBe(false);
    expect(isSymbol(10)).toBe(false);
    expect(isSymbol({ test: null })).toBe(false);
    expect(isSymbol(() => {})).toBe(false);
  });
  test('isUndefined tests', () => {
    expect(isUndefined(undefined)).toBe(true);
    expect(isUndefined(Symbol('symbol'))).toBe(false);
    expect(isUndefined('qwerty')).toBe(false);
    expect(isUndefined('10')).toBe(false);
    expect(isUndefined(null)).toBe(false);
    expect(isUndefined(10)).toBe(false);
    expect(isUndefined({ test: null })).toBe(false);
    expect(isUndefined(() => {})).toBe(false);
  });
  test('isNil tests', () => {
    expect(isNil(undefined)).toBe(true);
    expect(isNil(null)).toBe(true);
    expect(isNil(Symbol('symbol'))).toBe(false);
    expect(isNil('qwerty')).toBe(false);
    expect(isNil('10')).toBe(false);
    expect(isNil(10)).toBe(false);
    expect(isNil({ test: null })).toBe(false);
    expect(isNil(() => {})).toBe(false);
  });
  test('isObject tests', () => {
    expect(isObject({ test: null })).toBe(true);
    expect(isObject(() => {})).toBe(false);
    expect(isObject(undefined)).toBe(false);
    expect(isObject(null)).toBe(false);
    expect(isObject(Symbol('symbol'))).toBe(false);
    expect(isObject('qwerty')).toBe(false);
    expect(isObject('10')).toBe(false);
    expect(isObject(10)).toBe(false);
  });
});
