import { randomNumber, shuffleArray, deepClone } from '../utils/lang';

const messages = {
  noCharacters: 'No characters to choose from',
  notEnoughCharacters: 'Not enough characters to choose from (consider allowing duplicates or similar characters)',
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
    length, small, big, numbers, symbols, 
    punctuation, similar, duplicates, include
  } = options;

  let required = [
    { type: 'small', value: +(small.checked && small.min) },
    { type: 'big', value: +(big.checked && big.min) },
    { type: 'numbers', value: +(numbers.checked && numbers.min) },
    { type: 'symbols', value: +(symbols.checked && symbols.min) },
    { type: 'punctuation', value: +(punctuation.checked && punctuation.min) },
  ].filter(item => item.value > 0);

  let sum = 0;
  required.forEach(item => { sum += item.value });

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

  if (include.length > 0) {
    for (let char of include) {
      if (!charString.includes(char)) charString += char;
    }
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
      throw messages.notEnoughCharacters;
    }
  })

  charString = charString.replace(/\s/g, '');
  // console.log('charString:', charString);

  if (charString.length === 0) {
    throw messages.noCharacters;
  }

  if ((charString.length < length) && duplicates) {
    throw messages.notEnoughCharacters;
  }

  // let n1 = performance.now();
  const password = generateString({
    length, required, charString, characters, duplicates
  });
  // let n2 = performance.now();
  // console.log(n2 - n1);

  return password;
}

function generateString({ 
  length, required, charString, characters, duplicates
}) {
  let password = [];

  let requiredEmpty = false;

  for (let i = 0; i < length; i++) {
    if (!requiredEmpty) {
      required = required.filter(item => {
        return item.value > 0;
      });

      if (required.length === 0) requiredEmpty = true;
    }

    let c, char;

    if (requiredEmpty) {
      c = randomNumber(charString.length);
      char = charString.charAt(c);
    } else {
      const t = randomNumber(required.length);
      const type = required[t].type;

      c = randomNumber(characters[type].length);
      char = characters[type].charAt(c);

      if (duplicates) {
        characters[type] = characters[type].replace(char, '');
      }

      if (required[t].value > 0) required[t].value--;
    }

    if (duplicates) {
      charString = charString.replace(char, '');
    }

    password[i] = char;
  }

  password = shuffleArray(password).join('');

  return password;
}

export { 
  defaultOptions,
  generatePassword as default,
  messages
};