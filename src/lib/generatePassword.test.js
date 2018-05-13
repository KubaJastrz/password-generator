import {
  default as generatePassword,
  defaultOptions,
  messages
} from './generatePassword';
import { uniqueChars, repeat } from '../utils';

const positiveResult = expect.any(String);

const negativeResult = {
  ok: false,
  value: expect.any(String)
};

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
    for (let i=10; i>0; i--) {
      const result = await generatePassword(setup);
      expect(result).toEqual(positiveResult);
      expect(result).toBe(uniqueChars(result));
    }
    setup = {
      small: { checked: false },
      big: { checked: false },
      numbers: { checked: true },
      symbols: { checked: false },
      punctuation: { checked: false },
      duplicates: true,
      similar: false,
      length: 10
    }
    for (let i=10; i>0; i--) {
      const result = await generatePassword(setup);
      expect(result).toEqual(positiveResult);
      expect(result).toBe(uniqueChars(result));
    }
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
    for (let i=10; i>0; i--) {
      const result = await generatePassword(setup);
      expect(result).toEqual(positiveResult);
    }
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
    expect.assertions(1);
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
  });
});