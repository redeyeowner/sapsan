const {
  getAutocompletedObject,
} = require('../../../../lib/common/utils/object.util');

describe('Object utils tests', () => {
  test('getAutocompletedObject tests', () => {
    const originalObj = { test1: true, test2: true };
    const emptyAutocompleteObj = getAutocompletedObject();
    const filledAutocompleteObj = getAutocompletedObject(originalObj);
    emptyAutocompleteObj.test1.test2.test3 = 3;
    expect(emptyAutocompleteObj.test1.test2.test3).toBe(3);
    expect(Reflect.ownKeys(originalObj))
      .toEqual(Reflect.ownKeys(filledAutocompleteObj));
  });
});
