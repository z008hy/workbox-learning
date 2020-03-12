import {skipWaiting, clientsClaim, setCacheNameDetails} from 'workbox-core';
import {precacheAndRoute, cleanupOutdatedCaches} from 'workbox-precaching';
import {registerRoute} from 'workbox-routing';
import {ExpirationPlugin} from 'workbox-expiration';
import {StaleWhileRevalidate, CacheFirst, NetworkFirst, NetworkOnly, CacheOnly} from 'workbox-strategies';

cleanupOutdatedCaches();
skipWaiting();
clientsClaim();

registerRoute(/(\/|\.html)$/, new NetworkFirst());

registerRoute(/\.(?:js|css)$/, new StaleWhileRevalidate());

registerRoute('http://localhost:9999/stale-while-revalidate-random',
 new StaleWhileRevalidate({name: 'api-strategies-test'}));
registerRoute('http://localhost:9999/network-only-random',
 new NetworkOnly({name: 'api-strategies-test'}));
registerRoute('http://localhost:9999/network-first-random',
 new NetworkFirst({name: 'api-strategies-test'}));
registerRoute('http://localhost:9999/cache-first-random',
 new CacheFirst({name: 'api-strategies-test'}));

const matchImg = (name) => ({url, event}) => {
  return ~url.pathname.indexOf(name);
};
registerRoute(
  matchImg('workbox-stale-while-revalidate.png'),
  new StaleWhileRevalidate({name: 'img-strategies-test'})
);
registerRoute(
  matchImg('workbox-cache-first.png'),
  new CacheFirst({
    cacheName: 'img-strategies-test',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 20,
        maxAgeSeconds: 7 * 24 * 60 * 60,
        maxEntries: 10
      }),
    ],
  })
);
registerRoute(
  matchImg('workbox-network-first.png'),
  new NetworkFirst({cacheName: 'img-strategies-test'})
);
registerRoute(
  matchImg('workbox-network-only.png'),
  new NetworkOnly({cacheName: 'img-strategies-test'})
);
registerRoute(
  matchImg('workbox-cache-only.png'),
  new CacheOnly({cacheName: 'img-strategies-test'})
);

precacheAndRoute(self.__WB_MANIFEST || []);


