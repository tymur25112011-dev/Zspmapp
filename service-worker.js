const CACHE_NAME = "zspm-community-shell-v139";
const APP_SHELL = [
  "./",
  "./index.html",
  "./download.html",
  "./public/modern.css?v=91",
  "./public/app.js?v=80",
  "./public/support-config.js?v=2",
  "./public/supabase-config.js",
  "./manifest.webmanifest",
  "./public/zspm-community-icon.svg?v=2",
  
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("push", event => {
  event.waitUntil((async () => {
    let payload = {};
    try {
      payload = event.data ? event.data.json() : {};
    } catch (error) {
      payload = { body: event.data ? event.data.text() : "" };
    }
    const title = String(payload.title || "ZSPM Community").slice(0, 100);
    await self.registration.showNotification(title, {
      body: String(payload.body || "Masz nowe powiadomienie.").slice(0, 220),
      icon: "./public/zspm-community-icon.svg?v=2",
      badge: "./public/zspm-community-icon.svg?v=2",
      tag: payload.tag || "zspm-notification",
      data: { url: payload.data?.url || "./" },
      renotify: false
    });
  })());
});

self.addEventListener("notificationclick", event => {
  event.notification.close();
  event.waitUntil((async () => {
    const target = new URL(event.notification.data?.url || "./", self.registration.scope).href;
    const clientsList = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
    for (const client of clientsList) {
      if ("focus" in client) {
        await client.focus();
        if ("navigate" in client) await client.navigate(target);
        return;
      }
    }
    if (self.clients.openWindow) await self.clients.openWindow(target);
  })());
});

self.addEventListener("fetch", event => {
  const request = event.request;
  const url = new URL(request.url);

  if (request.method !== "GET" || url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then(response => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
          }
          return response;
        })
        .catch(async () => (await caches.match(request)) || caches.match("./index.html"))
    );
    return;
  }

  const isAppAsset = APP_SHELL.some(path => new URL(path, self.registration.scope).href === url.href);
  if (!isAppAsset) return;

  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;
      return fetch(request).then(response => {
        if (response.ok) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
        }
        return response;
      });
    })
  );
});