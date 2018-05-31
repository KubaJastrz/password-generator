/**
 * Filters duplicates out of given string.
 *
 * @see {@link https://stackoverflow.com/a/23282057/6244924|source}
 * @param  {String} string - Raw string
 * @return {String} Filtered string
 */
export function uniqueChars(string) {
  return Array.from(string)
    .filter((char, index, array) => array.indexOf(char) === index)
    .join('');
}

/**
 * Securely generates random number from range of 0 to count using window.crypto.
 * 
 * @see {@link https://www.reddit.com/r/crypto/comments/4xe21s/|source}
 * @see {@link https://stackoverflow.com/a/18230432/6244924|alt source}
 * @param  {Number}  count - Max value (excluding)
 * @param  {Boolean} [secure=true] - Use window.crypto
 * @return {Number} Random number
 */
export function randomNumber(count, secure = true) {
  const cryptoObj = window.crypto || window.msCrypto;
  if (cryptoObj != null && secure) {
    const rand = new Uint32Array(1);
    const skip = 0x7fffffff - 0x7fffffff % count;
    let result;

    do {
      cryptoObj.getRandomValues(rand);
      result = rand[0] & 0x7fffffff;
    } while (result >= skip);

    return result % count;
  }
  // only used for testing (jsdom doesn't have window.crypto object)
  else {
    return randomBetween(0, count);
  }
}

/**
 * Generates random number between range using Math.random.
 *
 * @see {@link https://stackoverflow.com/a/1527820/6244924|source}
 * @param  {Number} min - Min value (including)
 * @param  {Number} max - Max value (excluding)
 * @return {Number} Random number
 */
export function randomBetween(min, max) {
  const range = max - min;
  return Math.floor(Math.random() * range) + min;
}

/**
 * Shuffles items in the array.
 *
 * Optimised version of Durstenfeld algorithm.
 *
 * @see {@link https://stackoverflow.com/a/12646864/6244924|source}
 * @see {@link https://jsperf.com/shuffle123123|comparison}
 * @param  {Array} array - Raw array
 * @return {Array} Processed array
 */
export function shuffleArray(array) {
  array = array.slice();

  for (let i = array.length - 1; i > 0; i--) {
    const j = randomNumber(i + 1, false);
    const t = array[i];
    array[i] = array[j];
    array[j] = t;
  }
  
  return array;
}

/**
 * Shuffles first items in the array.
 *
 * It doesn't do item checking, so it can move one item multiple times and skip others.
 *
 * @param  {Array}  array - Raw array
 * @param  {Number} amount - Amount of items to shuffle
 * @return {Array} Processed array
 */
export function shuffleFirstCharsInArray(array, amount) {
  array = array.slice();

  for (let i = amount - 1; i >= 0; i--) {
    const j = randomNumber(array.length, false);
    const t = array[i];
    array[i] = array[j];
    array[j] = t;
  }

  return array;
}

/**
 * Creates deep copy of provided object.
 *
 * Only supports String, Number, Object, Array, Boolean, null.
 * 
 * @see {@link https://stackoverflow.com/a/5344074/6244924|source}
 * @param  {Object} obj - Object to clone
 * @return {Object}
 */
export function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Repeats provided function n times.
 * 
 * @param  {Number}   n - Amount of repeats
 * @param  {Function} func - Function to repeat
 */
export function repeat(n, func) {
  for (let i=n; i>0; i--) func();
}

/**
 * Checks if given variable is a number.
 *
 * @param {any} value Variable to check
 * @return {Boolean}
 */
export const isInteger = value => /^\d+$/.test(value);