import {
  deepClone,
  uniqueChars,
  randomNumber,
  shuffleFirstCharsInArray
} from '../utils/lang';

const messages = {
  noCharacters: 'No characters to choose from',
  notEnoughCharacters: 'Not enough characters to choose from',
  notEnoughCharactersDuplicates: 'Not enough characters to choose from (consider allowing duplicates or similar characters)',
  failedConstraints: 'Unable to generate a password with given constraints'
};

const defaultOptions = {
  length: 8,
  small: { checked: true, min: 1 },
  big: { checked: true, min: 1 },
  numbers: { checked: true, min: 1 },
  symbols: { checked: true, min: 1 },
  punctuation: { checked: false, min: 1 },
  similar: true,
  duplicates: true,
  include: '',
  includeChecked: true,
  exclude: '',
  excludeChecked: true,
  _characters: {
    small: 'abcdefghijklmnopqrstuvwxyz',
    big: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    numbers: '0123456789',
    symbols: '@#$%^&*+=',
    punctuation: '<>[]{}()!?.,:;-_/',
    similar: '1iIlL0Oo'
  }
};

function generatePassword(options) {
  options = {
    ...defaultOptions,
    ...options,
    // fallback to default when provided value is null or invalid number
    length: options && options.length > 0
      ? options.length
      : defaultOptions.length,
  };

  const {
    length, small, big, numbers, symbols, punctuation, similar,
    duplicates, include, includeChecked, exclude, excludeChecked
  } = options;

  let required = [
    { type: 'small', value: +(small.checked && small.min) },
    { type: 'big', value: +(big.checked && big.min) },
    { type: 'numbers', value: +(numbers.checked && numbers.min) },
    { type: 'symbols', value: +(symbols.checked && symbols.min) },
    { type: 'punctuation', value: +(punctuation.checked && punctuation.min) },
  ].filter(item => item.value > 0);

  let sum = 0;
  required.forEach(item => { sum += item.value; });

  if (sum > length) {
    throw messages.failedConstraints;
  }

  const characters = deepClone(options._characters);

  let charString = '';

  if (small.checked) charString += characters.small;
  if (big.checked) charString += characters.big;
  if (numbers.checked) charString += characters.numbers;
  if (symbols.checked) charString += characters.symbols;
  if (punctuation.checked) charString += characters.punctuation;

  let includeChars = includeChecked
    ? uniqueChars(include).replace(/\s/g, '')
    : '';

  const excludeChars = excludeChecked
    ? uniqueChars(exclude).replace(/\s/g, '')
    : '';

  if (includeChars.length > 0 && includeChecked) {
    for (let char of includeChars) {
      if (!charString.includes(char)) charString += char;
    }
  }

  if (excludeChars.length > 0 && excludeChecked) {
    const clean = v => v.replace(
      new RegExp(`[${excludeChars}]`, 'g'),
      ''
    );

    includeChars = clean(includeChars);
    charString = clean(charString);

    for (let key in characters) {
      if (key === 'similar') continue;
      characters[key] = clean(characters[key]);
    }
  }

  if (includeChars.length > length) {
    throw messages.notEnoughCharacters;
  }

  if (similar) {
    const clean = v => v.replace(
      new RegExp(`[${characters.similar}]`, 'g'),
      ''
    );

    charString = clean(charString);

    for (let key in characters) {
      if (key === 'similar') continue;
      characters[key] = clean(characters[key]);
    }
  }

  required.forEach(item => {
    if (item.value > characters[item.type].length && duplicates) {
      throw messages.notEnoughCharactersDuplicates;
    }
  });

  if (charString.length === 0) {
    throw messages.noCharacters;
  }

  if ((charString.length < length) && duplicates) {
    throw messages.notEnoughCharactersDuplicates;
  }

  // let n1 = performance.now();
  const password = generateString({
    length,
    include: includeChars,
    required,
    charString,
    characters,
    duplicates
  });
  // let n2 = performance.now();
  // console.log(n2 - n1);

  return password;
}

function generateString({
  length,
  include,
  required,
  charString,
  characters,
  duplicates
}) {
  let password = [];

  password = include.split('');

  // original amount of required characters used for shuffling
  const totalRequired = required.reduce((acc, cur) => {
    return acc + cur.value;
  }, include.length);

  // all required characters included
  let requiredEmpty = false;

  for (let i = 0; i < length - include.length; i++) {
    // check whether all required characters are included
    if (!requiredEmpty) {
      required = required.filter(item => {
        return item.value > 0;
      });

      if (required.length === 0) requiredEmpty = true;
    }

    let c, char;

    // if all required characters are included
    // drwa random char from charString pool
    // else draw from appropriate characters pool
    if (requiredEmpty) {
      c = randomNumber(charString.length);
      char = charString.charAt(c);
    } else {
      const t = randomNumber(required.length);
      const type = required[t].type;

      c = randomNumber(characters[type].length);
      char = characters[type].charAt(c);

      // remove duplicates for future draws
      if (duplicates) {
        characters[type] = characters[type].replace(char, '');
      }

      // decrease required characters amount
      if (required[t].value > 0) required[t].value--;
    }

    // remove duplicates for future draws
    if (duplicates) {
      charString = charString.replace(char, '');
    }

    password.push(char);
  }

  // it's only needed to shuffle all required characters
  // as they are incluced before the rest (which is randomized already)
  password = shuffleFirstCharsInArray(password, totalRequired);

  // make it a string
  password = password.join('');

  return password;
}

export {
  defaultOptions,
  generatePassword as default,
  messages
};