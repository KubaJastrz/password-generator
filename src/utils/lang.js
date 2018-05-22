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
};

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
};

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
};

/**
 * Creates shuffled array.
 *
 * It uses Fisher-Yates algorithm as it appears to be faster than Durstenfeld.
 *
 * @see {@link https://stackoverflow.com/a/2450976/6244924|source}
 * @see {@link https://jsperf.com/shuffle123123/1|comparison}
 * @param  {Array} array - Raw array
 * @return {Array} Processed array
 */
export function shuffleArray(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

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
};

/**
 * Repeats provided function n times.
 * 
 * @param  {Number}   n - Amount of repeats
 * @param  {Function} func - Function to repeat
 */
export function repeat(n, func) {
  for (let i=n; i>0; i--) func();
};