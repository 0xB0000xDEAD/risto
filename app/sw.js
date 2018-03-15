const myCache = 'risto_v2';
// request url baseDir +'/blabla/foo.css
const assetsToCache = [
  '/',
  '/scripts/dbhelper.js',
  '/scripts/main.js',
  '/scripts/restaurant_info.js',

  '/data/restaurants.json',

  '/images/1.jpg',
  '/images/2.jpg',
  '/images/3.jpg',
  '/images/4.jpg',
  '/images/5.jpg',
  '/images/6.jpg',
  '/images/7.jpg',
  '/images/8.jpg',
  '/images/9.jpg',
  '/images/10.jpg',

  '/styles/css/main.css',
  // 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBJoqpzXmAlOuZ2e-eKP4wDe9YfLpnWhiY&libraries=places&callback=initMap'
];
// console.log(assetsToCache);



self.addEventListener('install', function (event) {
  console.log('\'nstalling');

  event.waitUntil(
    caches.open(myCache).then(function (cache) {
      console.log('cache created');

      return cache.addAll(assetsToCache);
    }).catch(function (err) {
      console.log('something went wrong with the cache.', err);
    }));
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.filter(function (cacheName) {
          return cacheName.startsWith('risto') &&
            cacheName != myCache;
        }).map(function (cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

// Stale-while-revalidate

self.addEventListener('fetch', function (event) {
  // console.log(event.request);
  // take care of browsersync post request
  if (event.request.url.startsWith("http://localhost:9000/browser-sync/") == true && event.request.method === 'POST') {
    console.log('[Browsersync POST request]', event.request.url);

    console.log('POST is a invalid method for a service worker, the request will be passed through the service worker transparently ');
    event.respondWith(fetch(event.request).then(function (response) {
      return response;
    }).catch(function (err) {
      console.log('Something went wrong', err);
    }))
  } else {
    event.respondWith(
      caches.open(myCache).then(function (cache) {
        return cache.match(event.request).then(function (response) {
          var fetchPromise = fetch(event.request).then(function (networkResponse) {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          })
          return response || fetchPromise;
        })
      })
    );
  }

});
