const {
  generateUuidString,
  validatePath,
  trimSlashes,
} = require('../../../../lib/common/utils/string.util');

describe('String utils tests', () => {
  test('generateUuidString tests', () => {
    const generatedString = generateUuidString();
    const secondGeneratedString = generateUuidString();
    expect(typeof generatedString).toBe('string');
    expect(generatedString.length).toBeGreaterThanOrEqual(1);
    expect(generatedString).not.toEqual(secondGeneratedString);
  });

  test('validatePath tests', () => {
    const slashedUrl = '/some-url';
    const unslashedUrl = 'some-url';
    expect(validatePath(unslashedUrl)).toEqual(slashedUrl);
    expect(validatePath(slashedUrl)).toEqual(slashedUrl);
    expect(validatePath(null)).toEqual('');
    expect(validatePath(undefined)).toEqual('');
  });

  test('trimSlashes tests', () => {
    const slashedUrl1 = '/some-url';
    const slashedUrl2 = '/some-url/';
    const slashedUrl3 = '//some-url/';
    const slashedUrl4 = '//some-url//';
    const slashedUrl5 = 'some-url//';
    const innerSlashedUrl1 = '/some-url/another-url';
    const innerSlashedUrl2 = '/some-url/another-url/';
    const innerSlashedUrl3 = '//some-url/another-url/';
    const innerSlashedUrl4 = '//some-url/another-url//';
    const innerSlashedUrl5 = 'some-url/another-url//';
    const unslashedUrl = 'some-url';
    const innerUnslashedUrl = 'some-url/another-url';
    expect(trimSlashes(slashedUrl1)).toEqual(unslashedUrl);
    expect(trimSlashes(slashedUrl2)).toEqual(unslashedUrl);
    expect(trimSlashes(slashedUrl3)).toEqual(unslashedUrl);
    expect(trimSlashes(slashedUrl4)).toEqual(unslashedUrl);
    expect(trimSlashes(slashedUrl5)).toEqual(unslashedUrl);
    expect(trimSlashes(innerSlashedUrl1)).toEqual(innerUnslashedUrl);
    expect(trimSlashes(innerSlashedUrl2)).toEqual(innerUnslashedUrl);
    expect(trimSlashes(innerSlashedUrl3)).toEqual(innerUnslashedUrl);
    expect(trimSlashes(innerSlashedUrl4)).toEqual(innerUnslashedUrl);
    expect(trimSlashes(innerSlashedUrl5)).toEqual(innerUnslashedUrl);
  });
});
