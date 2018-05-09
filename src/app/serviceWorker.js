import { getPublicPath } from '../utils';

export function register() {
  if ('serviceWorker' in navigator) {
    const publicPath = getPublicPath();
    navigator.serviceWorker.register(`${publicPath}/sw.js`)
      .then(function(registration) {
        console.log('Service Worker Registered');
      })
      .catch(function(error) {
        console.warn('Service Worker failed to register: ' + error);
      });

    // navigator.serviceWorker.ready.then(function(registration) {
    //   console.log('Service Worker Ready');
    // });
  }
}