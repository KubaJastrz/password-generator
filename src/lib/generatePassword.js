import { randomBetween } from '../utils';

const messages = {
  noCharacters: 'No characters to choose from',
  notEnoughCharacters: 'Not enough characters to choose from (consider allowing duplicates)'
};

const defaultOptions = {
  length: 8,
  small: { checked: true, set: 'more', setValue: 0 },
  big: { checked: true, set: 'more', setValue: 0 },
  numbers: { checked: true, set: 'more', setValue: 0 },
  symbols: { checked: true, set: 'more', setValue: 0 },
  punctuation: { checked: false, set: 'more', setValue: 0 },
  similar: true,
  duplicates: true,
  include: ''
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

  const characters = {
    small: 'abcdefghijklmnopqrstuvwxyz',
    big: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    numbers: '0123456789',
    symbols: '@#$%^&*+=',
    punctuation: '<>[]{}()!?.,:;-_/',
    similar: '1iIlL0Oo'
  };

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
    throw new Error(messages.noCharacters);
  }

  if (charString.length < length && duplicates) {
    throw new Error(messages.notEnoughCharacters);
  }

  let password = '';

  for (let i = 0; i < length; i++) {
    
    // const n = Math.floor(Math.random() * charString.length);
    const n = randomBetween(0, charString.length - 1);
    const chosen = charString[n];

    if (duplicates && password.includes(chosen)) {
      i--;
      continue;
    }

    password += chosen;
    
  }

  return password;
}

export { 
  defaultOptions,
  generatePassword as default
};