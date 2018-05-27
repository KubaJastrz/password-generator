/**
 * Returns coordinates information about element.
 * 
 * @param {HTMLElement} element
 * @return {Object} Information about element
 */
export function getCoords(element) {
  return element.getBoundingClientRect();
}

/**
 * Selects text in a given DOM element.
 * 
 * @see {@link https://stackoverflow.com/a/1173319/6244924|source}
 * @param {HTMLElement} element - HTMLElement to select
 */
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
};