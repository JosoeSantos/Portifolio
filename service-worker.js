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
  console.log(evt);
  evt.respondWith(fromCache(evt) || fetch(evt.request));
  evt.waitUntil(
    update(evt.request)
      .then(console.log('served'))
  );
});


function fromCache(request) {
  caches.match(event.request).then(function (res) {
    return res || requestBackend(res);
  })
}


function requestBackend(event) {
  let url = event.request.clone();
  return fetch(url).then(function (res) {
    //if not a valid response send the error
    if (!res || res.status !== 200 || res.type !== 'basic') {
      return res;
    }
    console.log(res.type);
    let response = res.clone();
    caches.open(CACHE_VERSION).then(function (cache) {
      cache.put(event.request, response);
    });

    return res;
  })
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
