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
});


self.addEventListener('fetch', function (evt) {
  evt.respondWith(fromCache(evt) || fetch(evt.request));
  evt.waitUntil(
    update(evt.request)
      .catch(err => console.warn(err))
  );
});


function fromCache(event) {
  caches.match(event.request).then((res) => {
    return res || requestBackend(event);
  })
}


function requestBackend(event) {
  let url = event.request.clone();
  return fetch(url).then((res) => {
    //if not a valid response send the error
    if (!res || res.status !== 200 || res.type !== 'basic') {
      return res;
    }
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
        return response;
      });
    });
  });
}
