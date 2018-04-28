import { randomBetween } from '../../utils';

const messages = {
  noCharacters: 'No characters to choose from',
  notEnoughCharacters: 'Not enough characters to choose from (consider allowing duplicates)'
};

export const defaultOptions = {
  length: 8,
  small: true,
  big: true,
  numbers: true,
  symbols: true,
  punctuation: false,
  similar: true,
  duplicates: true,
  include: ''
};

export default (options) => {
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

  if (small) charString += characters.small;
  if (big) charString += characters.big;
  if (numbers) charString += characters.numbers;
  if (symbols) charString += characters.symbols;
  if (punctuation) charString += characters.punctuation;
  

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
    return {
      ok: false,
      value: messages.noCharacters
    };
  }

  if (charString.length < length && duplicates) {
    return {
      ok: false,
      value: messages.notEnoughCharacters
    };
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

  return {
    ok: true,
    value: password
  };
};