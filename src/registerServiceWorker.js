if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register(
      '/service-worker.js'
    ).then((registration) => {
      console.log(registration);
    }).catch((registrationError) => {
      console.error(registrationError);
    })
  });
}