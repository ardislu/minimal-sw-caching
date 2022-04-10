const cacheName = 'v1';
const cacheChannel = new BroadcastChannel('cache');

// To simulate a short network delay
function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function revalidate(request) {
  const cachePromise = caches.match(request).then(r => r?.text());
  const responsePromise = fetch(request);
  const [cachedText, response] = await Promise.all([cachePromise, responsePromise, timeout(200)]);
  const responseClone = response.clone();
  const responseClone2 = response.clone();
  const responseText = await response.text();

  if (cachedText !== responseText) {
    const cache = await caches.open(cacheName);
    cache.put(request, responseClone);
    cacheChannel.postMessage('Cache changed.');
  }

  return responseClone2;
}

self.addEventListener('fetch', event => {
  event.respondWith(caches.match(event.request).then(cachedResponse => {
    const networkResponse = revalidate(event.request);
    return cachedResponse === undefined ? networkResponse : cachedResponse;
  }));
});
