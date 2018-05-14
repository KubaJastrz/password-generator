import { getPublicPath } from '../utils';

export function register(config) {
  if ('serviceWorker' in navigator) {
    const swUrl = `${getPublicPath()}/sw.js`;

    registerServiceWorker(swUrl, config);
  }
}

function registerServiceWorker(swUrl, config) {
  navigator.serviceWorker
    .register(swUrl)
    .then(registration => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              console.log('New content is available; please refresh');

              if (config.onUpdate) {
                config.onUpdate(registration);
              }
            } else {
              console.log('Content is cached for offline use');

              if (config.onSuccess) {
                config.onSuccess(registration);
              }
            }
          }
        }
      }
    })
    .catch(error => {
      console.error('Error during service worker registration: ', error);
    });
}