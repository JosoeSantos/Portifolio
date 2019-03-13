let CACHE = 'cache-v1';
self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then(function (cache) {
      cache.addAll([
        '../../index.html',
        '../../css',
        '../../svg'
      ]).catch(err => console.log(err));
    })
  );
  console.log('install')
});


self.addEventListener('fetch', function (evt) {
  console.log('The service worker is serving the asset.');
  evt.respondWith(fromCache(evt.request) || fetch(evt.request));
  evt.waitUntil(
    update(evt.request)
      .then(console.log('served'))
  );
});


function fromCache(request) {
  return caches.open(CACHE).then(function (cache) {
    return cache.match(request);
  });
}

function update(request) {
  return caches.open(CACHE).then(function (cache) {
    return fetch(request).then(function (response) {
      return cache.put(request, response.clone()).then(function () {
        console.log(response);
        console.log('cached: ', request);
        return response;
      });
    });
  });
}
