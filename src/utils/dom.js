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
 * NOTE: selectAllChildren method seems to have fixed whitespace issue
 * 
 * @see {@link https://stackoverflow.com/a/20079910/6244924|source}
 * @param {HTMLElement} element - HTMLElement to select
 */
export function selectText(element) {
  window.getSelection().selectAllChildren(element);
}