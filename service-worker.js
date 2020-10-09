const CACHE_NAME = "lovelivepwa-new";
var urlsToCache = [
  "/",
  "/nav.html",
  "/index.html",
  "/pages/aqours.html",
  "/pages/home.html",
  "/pages/muse.html",
  "/pages/nijigasaki.html",
  "/css/materialize.min.css",
  "/js/materialize.min.js",
  "/js/nav.js",
  "/assets/aqours.png",
  "/assets/ll.png",
  "/assets/muse.png",
  "/assets/nijigasaki.jpg",
  "/icons/icons-72x72.png",
  "/icons/icons-96x96.png",
  "/icons/icons-128x128.png",
  "/icons/icons-144x144.png",
  "/icons/icons-192x192.png",
  "/icons/icons-256x256.png",
  "/icons/icons-384x384.png",
  "/icons/icons-512x512.png",
  "/manifest.json"
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches
    .match(event.request, {
      cacheName: CACHE_NAME
    })
    .then(function (response) {
      if (response) {
        console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
        return response;
      }

      console.log(
        "ServiceWorker: Memuat aset dari server: ",
        event.request.url
      );
      return fetch(event.request);
    })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});