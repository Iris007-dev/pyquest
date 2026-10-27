/* PyQuest offline shell. Increment both cache names when packaged files change. */
const SHELL_CACHE = 'pyquest-shell-v1';
const RUNTIME_CACHE = 'pyquest-runtime-v1';
const SHELL_FILES = [
  './', 'index.html', 'style.css', 'theory.css', 'pdf.css',
  'pdf-deep.css', 'pdf-textbook.css', 'practice200.css', 'public.css',
  'deep-foundation.js', 'deep-advanced.js', 'pdf-course.js',
  'pdf-textbook-foundation.js', 'pdf-textbook-advanced.js',
  'pdf-topic-examples.js', 'practice200-data.js', 'practice200.js',
  'py-runner.js', 'public-course.js', 'app.js', 'offline.js',
  'py-worker.mjs', 'manifest.webmanifest', 'icon.svg'
];

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(SHELL_CACHE);
    await cache.addAll(SHELL_FILES.map(path => new URL(path, self.registration.scope).href));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key.startsWith('pyquest-') &&
      key !== SHELL_CACHE && key !== RUNTIME_CACHE).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  const scope = new URL(self.registration.scope);
  if (request.method !== 'GET' || url.origin !== scope.origin ||
      !url.pathname.startsWith(scope.pathname)) return;

  event.respondWith((async () => {
    const cached = await caches.match(request, {ignoreSearch: true});
    if (cached) return cached;
    try {
      const response = await fetch(request);
      if (response.ok) {
        const cache = await caches.open(
          url.pathname.includes('/pyodide/') ? RUNTIME_CACHE : SHELL_CACHE
        );
        await cache.put(request, response.clone());
      }
      return response;
    } catch (error) {
      if (request.mode === 'navigate') {
        const fallback = await caches.match(new URL('index.html', scope).href);
        if (fallback) return fallback;
      }
      throw error;
    }
  })());
});
