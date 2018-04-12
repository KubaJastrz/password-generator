export const defaultOptions = {
  length: 8,
  small: true,
  big: true,
  numbers: true,
  symbols: true,
  punctuation: false,
  similiar: true,
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
    punctuation, similiar, duplicates, include
  } = options;

  const characters = {
    small: 'abcdefghijklmnopqrstuvwxyz',
    big: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    numbers: '0123456789',
    symbols: '@#$%^&*+=',
    punctuation: '<>[]{}()!?.,:;-_/',
    similiar: '1iIlL0Oo'
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

  if (similiar) charString = charString.replace(
    new RegExp(`[${characters.similiar}]`, 'g'),
    ''
  );

  // console.log('charString:', charString);

  if (charString.length === 0) {
    return {
      ok: false,
      value: 'No characters to choose from'
    };
  }

  if (charString.length < length && duplicates) {
    return {
      ok: false,
      value: 'Not enough characters to choose from'
    };
  }

  let password = '';
  const t0 = performance.now();

  for (let i = 0; i < length; i++) {
    
    const n = Math.floor(Math.random() * charString.length);
    const chosen = charString[n];

    if (duplicates && password.includes(chosen)) {
      i--;
      continue;
    }

    password += chosen;
    
  }

  const t1 = performance.now();

  //console.log(`generated in ${Math.ceil((t1-t0)*1000)/1000}ms`);

  return {
    ok: true,
    value: password
  };
};