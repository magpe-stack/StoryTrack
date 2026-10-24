'use strict';

const CACHE = 'storytrack-v1';
const CORE = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './manifest.json',
  './icon.svg'
];
const DOCX_LIB = 'https://cdnjs.cloudflare.com/ajax/libs/html-docx-js/0.3.1/html-docx.min.js';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then(async (cache) => {
        await cache.addAll(CORE);
        // Biblioteca de exportação .docx: tenta guardar para uso offline (não bloqueia a instalação)
        try {
          const res = await fetch(new Request(DOCX_LIB, { mode: 'no-cors' }));
          await cache.put(DOCX_LIB, res);
        } catch (e) { /* segue sem a biblioteca em cache */ }
      })
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // Arquivos do próprio app: rede primeiro (pega atualizações), cache como reserva offline
  if (url.origin === self.location.origin) {
    event.respondWith(
      fetch(req)
        .then((res) => {
          if (res && res.ok) {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(req, copy));
          }
          return res;
        })
        .catch(() => caches.match(req).then((hit) => hit || caches.match('./index.html')))
    );
    return;
  }

  // Biblioteca externa (CDN): cache primeiro
  if (url.hostname === 'cdnjs.cloudflare.com') {
    event.respondWith(
      caches.match(req).then((hit) => hit || fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(req, copy));
        return res;
      }))
    );
  }
});
