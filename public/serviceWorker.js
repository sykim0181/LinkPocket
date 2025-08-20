const VERSION = "v1.0.0";
const PRECACHE = `precache-${VERSION}`;
const RUNTIME = `runtime-${VERSION}`;

const PRECACHE_URLS = ["/", "/favicon.ico"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(PRECACHE).then((cache) => cache.addAll(PRECACHE_URLS))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      for (const key of keyList) {
        if (key !== PRECACHE && key !== RUNTIME) {
          caches.delete(key);
        }
      }
    })
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;

  const url = new URL(req.url);
  const isPrecachedRequest = PRECACHE_URLS.includes(url.pathname);

  if (isPrecachedRequest) {
    event.respondWith(cacheOnly(req));
    return;
  }

  if (["style", "script", "image", "font"].includes(req.destination)) {
    event.respondWith(cacheFirst(req));
    return;
  }

  if (req.mode === "navigate") {
    event.respondWith(staleWhileRevalidate(req));
    return;
  }

  if (req.url.includes("/api/")) {
    event.respondWith(networkFirst(req));
    return;
  }
});

async function cacheOnly(request, cacheName = PRECACHE) {
  const cache = await caches.open(cacheName);
  return cache.match(request.url);
}

async function networkOnly(request) {
  return;
}

async function cacheFirst(request, cacheName = RUNTIME) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request.url);
  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const response = await fetch(request);
    cache.put(request, response.clone());
    return response;
  } catch (err) {
    return;
  }
}

async function networkFirst(request, cacheName = RUNTIME) {
  const cache = await caches.open(cacheName);
  try {
    const response = await fetch(request.url);
    if (response) {
      cache.put(request, response.clone());
      return response;
    }
  } catch (err) {
    const cachedResponse = await cache.match(request.url);
    return cachedResponse;
  }
}

async function staleWhileRevalidate(request, cacheName = RUNTIME) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);

  const fetchResponse = async () => {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  };

  return cachedResponse || (await fetchResponse());
}
