import generatePassword, { defaultOptions } from './generatePassword';
import { uniqueChars } from '../../utils';

const positiveResult = {
  ok: true,
  value: expect.any(String)
};

const negativeResult = {
  ok: false,
  value: expect.any(String)
};

describe('generatePassword', () => {
  test('should generate password with default parameters', () => {
    const result = generatePassword();
    expect(result).toEqual(positiveResult);
  });

  test('should generate password with provided parameters', () => {
    const result = generatePassword({
      length: 5,
      small: true,
      big: true,
      numbers: true,
      symbols: true,
      punctuation: true,
      similiar: true,
      include: 'abci0'
    });
    expect(result).toEqual(positiveResult);
    expect(result.value).toEqual(expect.stringMatching(/[^1iIlL0Oo]/));
  });

  test('should fallback to default length on invalid parameter', () => {
    let result = generatePassword({ length: null });
    expect(result).toEqual(positiveResult);
    expect(result.value).toHaveLength(defaultOptions.length);

    result = generatePassword({ length: -1 });
    expect(result).toEqual(positiveResult);
    expect(result.value).toHaveLength(defaultOptions.length);

    result = generatePassword({ length: 'abc' });
    expect(result).toEqual(positiveResult);
    expect(result.value).toHaveLength(defaultOptions.length);
  });

  test('should return an error on empty `charString`', () => {
    let result = generatePassword({
      small: false,
      big: false,
      numbers: false,
      symbols: false,
      punctuation: false
    });
    expect(result).toEqual(negativeResult);
  });

  test('should generate password with no duplicates', () => {
    const setup = {
      small: false,
      big: false,
      numbers: false,
      symbols: false,
      punctuation: false,
      duplicates: true,
      length: 2,
      include: 'ab'
    };
    for (let i=10; i>0; i--) {
      const result = generatePassword(setup);
      expect(result).toEqual(positiveResult);
      expect(result.value).toBe(uniqueChars(result.value));
    }
  });
});