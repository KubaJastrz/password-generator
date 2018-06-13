import generatePassword, {
  defaultOptions,
  defaultCharacters,
  messages
} from '../src/app/generatePassword';
import { countChars, uniqueChars, repeat } from '../src/utils/lang';

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
      small: { use: true, min: 1 },
      big: { use: true, min: 1 },
      numbers: { use: true, min: 1 },
      symbols: { use: true, min: 1 },
      punctuation: { use: true, min: 1 },
      similar: true,
      duplicates: true,
      include: { use: true, value: 'abci0' }
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
    expect(result).toHaveLength(length);
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
    const setup = {
      small: { use: false },
      big: { use: false },
      numbers: { use: true, min: 0 },
      symbols: { use: false },
      punctuation: { use: false },
      duplicates: false,
      length: 5,
      include: { use: true, value: 'ab' }
    };
    repeat(10, () => {
      const result = generatePassword(setup);
      expect(result).toEqual(positiveResult);
      expect(result).toHaveLength(setup.length);
      expect(result).toEqual(expect.stringContaining('a'));
      expect(result).toEqual(expect.stringContaining('b'));
    });

    const setup2 = {
      small: { use: false },
      big: { use: false },
      numbers: { use: true, min: 0 },
      symbols: { use: false },
      punctuation: { use: false },
      duplicates: true,
      length: 5,
      include: { use: true, value: 'aabbb' }
    };
    repeat(10, () => {
      const result = generatePassword(setup2);
      expect(result).toEqual(positiveResult);
      expect(result).toHaveLength(setup2.length);
      const a = countChars('a', result);
      const b = countChars('b', result);
      expect(a).toBe(2);
      expect(b).toBe(3);
    });

    const setup3 = {
      small: { use: false },
      big: { use: false },
      numbers: { use: false },
      symbols: { use: false },
      punctuation: { use: false },
      duplicates: false,
      length: 4,
      include: { use: true, value: '1i0o' }
    };
    repeat(10, () => {
      const result = generatePassword(setup3);
      expect(result).toEqual(positiveResult);
      expect(result).toHaveLength(setup3.length);
      expect(result).toEqual(expect.stringMatching('[1i0o]{4}'));
    });

    // TODO: handle this case
    /*const setup4 = {
      small: { use: false },
      big: { use: false },
      numbers: { use: true, min: 10 },
      symbols: { use: false },
      punctuation: { use: false },
      duplicates: true,
      similar: true,
      length: 10,
      include: { use: true, value: '10' }
    };
    repeat(10, () => {
      const result = generatePassword(setup4);
      expect(result).toEqual(positiveResult);
      expect(result).toHaveLength(setup4.length);
    });*/
  });

  it('should return password with excluded characters', () => {
    const setup = {
      small: { use: false },
      big: { use: false },
      numbers: { use: false },
      symbols: { use: false },
      punctuation: { use: false },
      duplicates: false,
      length: 2,
      include: { use: true, value: 'abc' },
      exclude: { use: true, value: 'c' }
    };
    repeat(10, () => {
      const result = generatePassword(setup);
      expect(result).toEqual(positiveResult);
      expect(result).toHaveLength(setup.length);
      expect(result).toEqual(expect.not.stringContaining('c'));
    });
  });

  it('should return password with no duplicates', () => {
    const setup = {
      small: { use: false },
      big: { use: false },
      numbers: { use: false },
      symbols: { use: false },
      punctuation: { use: false },
      duplicates: true,
      length: 2,
      include: { use: true, value: 'ab' }
    };
    repeat(10, () => {
      const result = generatePassword(setup);
      expect(result).toEqual(positiveResult);
      expect(result).toHaveLength(setup.length);
      expect(result).toBe(uniqueChars(result));
    });

    const setup2 = {
      small: { use: false },
      big: { use: false },
      numbers: { use: true, min: 10 },
      symbols: { use: false },
      punctuation: { use: false },
      duplicates: true,
      similar: false,
      length: 10
    };
    repeat(10, () => {
      const result = generatePassword(setup2);
      expect(result).toEqual(positiveResult);
      expect(result).toHaveLength(setup2.length);
      expect(result).toBe(uniqueChars(result));
    });

    const setup3 = {
      small: { use: false },
      big: { use: false },
      numbers: { use: true, min: 7 },
      symbols: { use: false },
      punctuation: { use: false },
      include: { use: true, value: '01' },
      duplicates: true,
      similar: false,
      length: 9
    };
    repeat(10, () => {
      const result = generatePassword(setup3);
      expect(result).toEqual(positiveResult);
      expect(result).toHaveLength(setup3.length);
      expect(result).toBe(uniqueChars(result));
    });
  });

  it('should return password with no similar characters', () => {
    const setup = {
      length: 12,
      small: { use: true },
      big: { use: true },
      numbers: { use: true },
      symbols: { use: false },
      punctuation: { use: false },
      similar: true,
      duplicates: false
    };
    repeat(100, () => {
      const result = generatePassword(setup);
      expect(result).toEqual(positiveResult);
      expect(result).toHaveLength(12);
      defaultCharacters.similar.split('').forEach(char => {
        expect(result).toEqual(expect.not.stringContaining(char));
      });
    });
  });

  it('should return password with given constraints', () => {
    const setup = {
      length: 7,
      small: { use: true, min: 2 },
      numbers: { use: true, min: 3 },
      big: { use: true, min: 0 },
      symbols: { use: false },
      punctuation: { use: false },
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
        small: { use: true, min: 6 }
      });
    } catch (err) {
      expect(err).toBe(messages.failedConstraints);
    }
  });

  it('should throw an error on empty `charString`', () => {
    expect.assertions(1);
    try {
      generatePassword({
        small: { use: false },
        big: { use: false },
        numbers: { use: false },
        symbols: { use: false },
        punctuation: { use: false }
      });
    } catch (err) {
      expect(err).toBe(messages.noCharacters);
    }
  });

  it('should throw an error when not enough characters', () => {
    expect.assertions(3);

    try {
      generatePassword({
        small: { use: false },
        big: { use: false },
        numbers: { use: false },
        symbols: { use: false },
        punctuation: { use: false },
        length: 5,
        include: { use: true, value: 'abc' },
        duplicates: true
      });
    } catch (err) {
      expect(err).toBe(messages.notEnoughCharactersDuplicates);
    }

    try {
      generatePassword({
        length: 12,
        small: { use: false },
        big: { use: false },
        numbers: { use: true, min: 10 },
        symbols: { use: false },
        punctuation: { use: false },
        similar: true,
        duplicates: true
      });
    } catch (err) {
      expect(err).toBe(messages.notEnoughCharactersDuplicates);
    }

    try {
      generatePassword({
        small: { use: false },
        big: { use: false },
        numbers: { use: false },
        symbols: { use: false },
        punctuation: { use: false },
        length: 5,
        include: { use: true, value: 'abcdef' },
        duplicates: false
      });
    } catch (err) {
      expect(err).toBe(messages.notEnoughCharacters);
    }
  });
});