/**
 * Returns publicPath from env.
 * 
 * @return {String} publicPath
 */
export function getPublicPath() {
  const path = process.env.PUBLIC_URL || '';
  return path.slice(0,-1);
}