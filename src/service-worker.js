import {skipWaiting, clientsClaim} from 'workbox-core';
import {precacheAndRoute} from 'workbox-precaching';
import {registerRoute} from 'workbox-routing';
import {StaleWhileRevalidate, CacheFirst, NetworkFirst, NetworkOnly, CacheOnly} from 'workbox-strategies';

skipWaiting();
clientsClaim();

precacheAndRoute(self.__WB_MANIFEST);

registerRoute(
  new RegExp('/assets/images/workbox-stale-while-revalidate.png'),
  new StaleWhileRevalidate({
    cacheName: 'image-cache',
  })
);
registerRoute(
  new RegExp('/assets/images/workbox-cache-first.png'),
  new CacheFirst()
);
registerRoute(
  new RegExp('/assets/images/workbox-network-first.png'),
  new NetworkFirst({
    cacheName: 'image-cache',
  })
);
registerRoute(
  new RegExp('/assets/images/workbox-network-only.png'),
  new NetworkOnly()
);
registerRoute(
  new RegExp('/assets/images/workbox-cache-only.png'),
  new CacheOnly()
);

