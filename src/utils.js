// https://stackoverflow.com/a/881111/6244924
export function countChars(char, string) {
  const r = new RegExp(char, 'g');
  return (string.match(r) || []).length;
}

// https://stackoverflow.com/a/23282057/6244924
export function uniqueChars(string) {
  return Array.from(string)
    .filter((char, index, array) => array.indexOf(char) === index)
    .join('');
}

// secure only allows range of 256 between min and max
// I will improve this when more is required
// source: https://stackoverflow.com/a/18230432/6244924
export function randomBetween(min, max, secure = true) {
  const range = max - min + 1;
  const cryptoObj = window.crypto || window.msCrypto;
  if (cryptoObj != null && secure) {
    const byteArray = new Uint8Array(1);
    cryptoObj.getRandomValues(byteArray);

    const maxRange = 256;
    if (byteArray[0] >= Math.floor(maxRange / range) * range) {
      return randomBetween(min, max);
    }
    return (byteArray[0] % range) + min;
  }
  // only used for testing (jsdom doesn't have window.crypto object)
  else {
    return Math.floor(Math.random() * range) + min;
  }
}

// https://stackoverflow.com/a/2450976/6244924
// Fisher-Yates Shuffle appears to be much faster than Durstenfeld one
// see: https://jsperf.com/shuffle123123/1
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
}

// https://stackoverflow.com/a/1173319/6244924
export function selectText(element) {
  if (document.selection) {
    var range = document.body.createTextRange();
    range.moveToElementText(element);
    range.select();
  } else if (window.getSelection) {
    var range = document.createRange();
    range.selectNode(element);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
  }
}

export function getPublicPath() {
  const path = process.env.PUBLIC_URL || '';
  return path.slice(0,-1);
}

// https://stackoverflow.com/a/5344074/6244924
// NOTE: only supports String, Number, Object, Array, Boolean, null
//       but that's enough for now
export function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export function repeat(n, func) {
  for (let i=n; i>0; i--) func();
}