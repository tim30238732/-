// service-worker.js
const CACHE_NAME = "static-cache-v1";
const urlsToCache = [
   "/path/to/index.html",
   "/path/to/style.css",
   "/path/to/script.js",
   "/path/to/image.jpg"
];

// 安裝 Service Worker 並快取文件
self.addEventListener("install", (event) => {
   event.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
         return cache.addAll(urlsToCache);
      })
   );
});

// 攔截請求並從快取中回應
self.addEventListener("fetch", (event) => {
   event.respondWith(
      caches.match(event.request).then((response) => {
         return response || fetch(event.request);
      })
   );
});

// 更新快取，刪除過期的快取
self.addEventListener("activate", (event) => {
   event.waitUntil(
      caches.keys().then((cacheNames) => {
         return Promise.all(
            cacheNames.map((cacheName) => {
               if (cacheName !== CACHE_NAME) {
                  return caches.delete(cacheName);
               }
            })
         );
      })
   );
});
