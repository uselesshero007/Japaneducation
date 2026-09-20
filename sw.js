var CACHE_NAME = 'japan-education-v9';
var APP_SHELL = [
  './', './index.html', './alphabet.html', './lessons.html', './quiz.html', './profile.html', './levels.html',
  './app.js', './manifest.webmanifest', './assets/logo.png', './assets/kanji-data.json', './DESIGN.md', './README.md'
];

self.addEventListener('install', function (event) {
  event.waitUntil(caches.open(CACHE_NAME).then(function (cache) { return cache.addAll(APP_SHELL); }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener('activate', function (event) {
  event.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (key) { return key !== CACHE_NAME; }).map(function (key) { return caches.delete(key); }));
  }).then(function () { return self.clients.claim(); }));
});

self.addEventListener('fetch', function (event) {
  if (event.request.method !== 'GET') return;
  event.respondWith(fetch(event.request).then(function (response) {
    var copy = response.clone();
    caches.open(CACHE_NAME).then(function (cache) { cache.put(event.request, copy); });
    return response;
  }).catch(function () {
    return caches.match(event.request).then(function (cached) {
      return cached || (event.request.mode === 'navigate' ? caches.match('./index.html') : Response.error());
    });
  }));
});
