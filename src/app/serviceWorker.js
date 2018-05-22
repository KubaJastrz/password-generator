import { getPublicPath } from '../utils/app';

export function register(config) {
  if ('serviceWorker' in navigator) {
    const swUrl = `${getPublicPath()}/sw.js`;

    window.addEventListener('load', () => {
      registerServiceWorker(swUrl, config);
    });
  }
}

function registerServiceWorker(swUrl, config) {
  navigator.serviceWorker.register(swUrl)
    .then(registration => {
      registration.addEventListener('updatefound', () => {
        const installingWorker = registration.installing;
        
        installingWorker.addEventListener('statechange', () => {
          if (installingWorker.state === 'installed') {

            // updateServiceWorker(registration);
            
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
        });
      });
    })
    .catch(error => {
      console.error('Error during service worker registration: ', error);
    });
}

function updateServiceWorker(registration) {
  registration.update();
}