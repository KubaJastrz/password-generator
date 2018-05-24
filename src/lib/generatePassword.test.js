import {
  default as generatePassword,
  defaultOptions,
  messages
} from './generatePassword';
import { uniqueChars, repeat } from '../utils/lang';

const positiveResult = expect.any(String);

describe('generatePassword', () => {
  it('should return password with default parameters', async () => {
    const result = await generatePassword();
    expect(result).toEqual(positiveResult);
    expect(result).toHaveLength(defaultOptions.length);
  });

  it('should return password with provided parameters', async () => {
    const result = await generatePassword({
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
    expect(result).toEqual(expect.stringMatching(
      new RegExp(`[^${defaultOptions._characters.similar}]`)
    ));
    expect(result).toHaveLength(5);
  });

  it.skip('should return really long password', async () => {
    const length = 200000;
    const result = await generatePassword({
      length: length,
      duplicates: false,
      similar: false
    });
    expect(result).toEqual(positiveResult);
    expect(result).toHaveLength(length)
  });

  it('should fallback to default length on invalid parameter', async () => {
    let result = await generatePassword({ length: null });
    expect(result).toEqual(positiveResult);
    expect(result).toHaveLength(defaultOptions.length);

    result = await generatePassword({ length: -1 });
    expect(result).toEqual(positiveResult);
    expect(result).toHaveLength(defaultOptions.length);

    result = await generatePassword({ length: 'abc' });
    expect(result).toEqual(positiveResult);
    expect(result).toHaveLength(defaultOptions.length);
  });

  it('should return password with no duplicates', async () => {
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
    repeat(10, async () => {
      const result = await generatePassword(setup);
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
    repeat(10, async () => {
      const result = await generatePassword(setup);
      expect(result).toEqual(positiveResult);
      expect(result).toBe(uniqueChars(result));
      expect(result).toHaveLength(10);
    });
  });

  it('should return password with no similar characters', async () => {
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
    const result = await generatePassword(setup);
    expect(result).toEqual(positiveResult);
    expect(result).toHaveLength(12);
    expect(result).toEqual(expect.stringMatching(
      new RegExp(`[^${defaultOptions._characters.similar}]`)
    ));
  });

  it('should return password with given constraints', async () => {
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
    repeat(10, async () => {
      const result = await generatePassword(setup);
      expect(result).toEqual(positiveResult);
      expect(result).toHaveLength(7);
    });
  });

  it('should throw an error on failed constraints', async () => {
    expect.assertions(1);
    try {
      await generatePassword({
        length: 5,
        small: { checked: true, min: 6 }
      });
    } catch (err) {
      expect(err).toBe(messages.failedConstraints);
    }
  });

  it('should throw an error on empty `charString`', async () => {
    expect.assertions(1);
    try {
      await generatePassword({
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

  it('should throw an error when not enough characters', async () => {
    expect.assertions(2);

    try {
      await generatePassword({
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
      expect(err).toBe(messages.notEnoughCharacters);
    }

    try {
      await generatePassword({
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
      expect(err).toBe(messages.notEnoughCharacters);
    }
  });
});