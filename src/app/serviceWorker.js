export function register() {
  if ('serviceWorker' in navigator) {
    const publicPath = process.env.PUBLIC_URL;
    navigator.serviceWorker.register(`${publicPath}sw.js`)
      .then(function(registration) {
        console.log('Service Worker Registered');
      });

    // navigator.serviceWorker.ready.then(function(registration) {
    //   console.log('Service Worker Ready');
    // });
  }
}