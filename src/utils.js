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