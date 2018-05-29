import {
  default as generatePassword,
  defaultOptions,
  messages
} from '../src/app/generatePassword';
import { uniqueChars, repeat } from '../src/utils/lang';

const positiveResult = expect.any(String);

describe('generatePassword', () => {
  it('should return password with default parameters', () => {
    const result = generatePassword();
    expect(result).toEqual(positiveResult);
    expect(result).toHaveLength(defaultOptions.length);
  });

  it('should return password with provided parameters', () => {
    const result = generatePassword({
      length: 5,
      small: { checked: true, min: 1 },
      big: { checked: true, min: 1 },
      numbers: { checked: true, min: 1 },
      symbols: { checked: true, min: 1 },
      punctuation: { checked: true, min: 1 },
      similar: true,
      duplicates: true,
      include: 'abci0'
    });
    expect(result).toEqual(positiveResult);
    expect(result).toHaveLength(5);
  });

  it.skip('should return really long password', () => {
    const length = 200000;
    const result = generatePassword({
      length: length,
      duplicates: false,
      similar: false
    });
    expect(result).toEqual(positiveResult);
    expect(result).toHaveLength(length)
  });

  it('should fallback to default length on invalid parameter', () => {
    let result = generatePassword({ length: null });
    expect(result).toEqual(positiveResult);
    expect(result).toHaveLength(defaultOptions.length);

    result = generatePassword({ length: -1 });
    expect(result).toEqual(positiveResult);
    expect(result).toHaveLength(defaultOptions.length);

    result = generatePassword({ length: 'abc' });
    expect(result).toEqual(positiveResult);
    expect(result).toHaveLength(defaultOptions.length);
  });

  it('should return password with included characters', () => {
    const result = generatePassword({
      small: { checked: false },
      big: { checked: false },
      numbers: { checked: true, min: 0 },
      symbols: { checked: false },
      punctuation: { checked: false },
      duplicates: false,
      length: 5,
      include: 'ab'
    });
    repeat(10, () => {
      expect(result).toEqual(positiveResult);
      expect(result).toEqual(expect.stringContaining('a'));
      expect(result).toEqual(expect.stringContaining('b'));
    });
  });

  it('should return password with excluded characters', () => {
    const setup = {
      small: { checked: false },
      big: { checked: false },
      numbers: { checked: false },
      symbols: { checked: false },
      punctuation: { checked: false },
      duplicates: false,
      length: 5,
      include: 'abc',
      exclude: 'c'
    };
    repeat(10, () => {
      const result = generatePassword(setup);
      expect(result).toEqual(positiveResult);
      expect(result).not.toEqual(expect.stringContaining('c'));
    });
  });

  it('should return password with no duplicates', () => {
    let setup = {
      small: { checked: false },
      big: { checked: false },
      numbers: { checked: false },
      symbols: { checked: false },
      punctuation: { checked: false },
      duplicates: true,
      length: 2,
      include: 'ab'
    };
    repeat(10, () => {
      const result = generatePassword(setup);
      expect(result).toEqual(positiveResult);
      expect(result).toBe(uniqueChars(result));
      expect(result).toHaveLength(2);
    });
    setup = {
      small: { checked: false },
      big: { checked: false },
      numbers: { checked: true, min: 10 },
      symbols: { checked: false },
      punctuation: { checked: false },
      duplicates: true,
      similar: false,
      length: 10
    };
    repeat(10, () => {
      const result = generatePassword(setup);
      expect(result).toEqual(positiveResult);
      expect(result).toBe(uniqueChars(result));
      expect(result).toHaveLength(10);
    });
  });

  it('should return password with no similar characters', () => {
    const setup = {
      length: 12,
      small: { checked: true },
      big: { checked: true },
      big: { checked: true },
      symbols: { checked: false },
      punctuation: { checked: false },
      similar: true,
      duplicates: false,
      include: 'ai0bl'
    };
    const result = generatePassword(setup);
    expect(result).toEqual(positiveResult);
    expect(result).toHaveLength(12);
    expect(result).toEqual(expect.stringMatching(
      new RegExp(`[^${defaultOptions._characters.similar}]`)
    ));
  });

  it('should return password with given constraints', () => {
    const setup = {
      length: 7,
      small: { checked: true, min: 2 },
      numbers: { checked: true, min: 3 },
      big: { checked: true, min: 0 },
      symbols: { checked: false },
      punctuation: { checked: false },
      similar: false,
      duplicates: false
    };
    repeat(10, () => {
      const result = generatePassword(setup);
      expect(result).toEqual(positiveResult);
      expect(result).toHaveLength(7);
    });
  });

  it('should throw an error on failed constraints', () => {
    expect.assertions(1);
    try {
      generatePassword({
        length: 5,
        small: { checked: true, min: 6 }
      });
    } catch (err) {
      expect(err).toBe(messages.failedConstraints);
    }
  });

  it('should throw an error on empty `charString`', () => {
    expect.assertions(1);
    try {
      generatePassword({
        small: { checked: false },
        big: { checked: false },
        numbers: { checked: false },
        symbols: { checked: false },
        punctuation: { checked: false }
      });
    } catch (err) {
      expect(err).toBe(messages.noCharacters);
    }
  });

  it('should throw an error when not enough characters', () => {
    expect.assertions(3);

    try {
      generatePassword({
        small: { checked: false },
        big: { checked: false },
        numbers: { checked: false },
        symbols: { checked: false },
        punctuation: { checked: false },
        length: 5,
        include: 'abc',
        duplicates: true
      });
    } catch (err) {
      expect(err).toBe(messages.notEnoughCharactersDuplicates);
    }

    try {
      generatePassword({
        length: 12,
        small: { checked: false },
        big: { checked: false },
        numbers: { checked: true, min: 10 },
        symbols: { checked: false },
        punctuation: { checked: false },
        similar: true,
        duplicates: true
      });
    } catch (err) {
      expect(err).toBe(messages.notEnoughCharactersDuplicates);
    }

    try {
      generatePassword({
        small: { checked: false },
        big: { checked: false },
        numbers: { checked: false },
        symbols: { checked: false },
        punctuation: { checked: false },
        length: 5,
        include: 'abcdef',
        duplicates: false
      });
    } catch (err) {
      expect(err).toBe(messages.notEnoughCharacters);
    }
  });
});