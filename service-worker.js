// Never serve a cached page or version response; hashed Unity assets keep their own URLs.
self.addEventListener('install', event => event.waitUntil(self.skipWaiting()));
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));
self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method === 'GET' && url.origin === self.location.origin &&
      (request.mode === 'navigate' || url.pathname === new URL('version.json', self.registration.scope).pathname)) {
    event.respondWith(fetch(new Request(request, { cache: 'no-store' })));
  }
});
