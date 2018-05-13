import { randomBetween } from '../utils';

const messages = {
  noCharacters: 'No characters to choose from',
  notEnoughCharacters: 'Not enough characters to choose from (consider allowing duplicates)',
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

async function generatePassword(options) {
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

  const characters = options._characters;

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

  if (similar) charString = charString.replace(
    new RegExp(`[${characters.similar}]`, 'g'),
    ''
  );

  charString = charString.replace(/\s/g, '');

  // console.log('charString:', charString);

  if (charString.length === 0) {
    throw messages.noCharacters;
  }

  if ((charString.length < length) && duplicates) {
    throw messages.notEnoughCharacters;
  }

  return generateString({ length, required, charString, duplicates });
}

function generateString({ length, required, charString, duplicates }) {
  const characters = defaultOptions._characters;

  let password = new Array(length).fill(null);

  // console.log(required)

  let requiredEmpty = false;

  for (let i = 0; i < length; i++) {
    const index = randomBetween(0, length - 1);

    // FIXME: this is bad
    if (password[index] != null) {
      i--;
      continue;
    }

    if (!requiredEmpty) {
      required = required.filter(item => {
        return item.value > 0;
      })

      if (required.length === 0) requiredEmpty = true;
    }

    let c, char;

    if (requiredEmpty) {
      c = randomBetween(0, charString.length - 1);
      char = charString.charAt(c);
    } else {
      const t = randomBetween(0, required.length - 1);
      const type = required[t].type;

      c = randomBetween(0, characters[type].length - 1);
      char = characters[type].charAt(c);

      if (required[t].value > 0) required[t].value--;
    }

    if (duplicates) {
      charString = charString.replace(char, '');
    }

    password[index] = char;
  }

  return password.join('');
}

export { 
  defaultOptions,
  generatePassword as default,
  messages
};