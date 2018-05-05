export function register() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('https://kubajastrz.github.io/password-generator/sw.js')
      .then(function(registration) {
        console.log('Service Worker Registered');
      });

    navigator.serviceWorker.ready.then(function(registration) {
      // console.log('Service Worker Ready');
    });
  }
}