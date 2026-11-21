const CACHE_NAME = "zspm-community-shell-v162";
const APP_SHELL = [
  "./",
  "./index.html",
  "./download.html",
  "./nota-prawna.html",
  "./polityka-prywatnosci.html",
  "./polityka-bezpieczenstwa.html",
  "./public/modern.css?v=101",
  "./public/app.js?v=93",
  "./public/support-config.js?v=2",
  "./public/supabase-config.js",
  "./manifest.webmanifest",
  "./public/zspm-community-icon-192.png",
  "./public/zspm-community-icon-512.png",
  
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
        keys.filter(key => key.startsWith("zspm-community-shell-") && key !== CACHE_NAME).map(key => caches.delete(key))
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
      icon: "./public/zspm-community-icon-192.png",
      badge: "./public/zspm-community-icon-192.png",
      tag: payload.tag || "zspm-notification",
      data: { url: payload.data?.url || "./" },
      renotify: false
    });
  })());
});

self.addEventListener("notificationclick", event => {
  event.notification.close();
  event.waitUntil((async () => {
    const scopeUrl = new URL(self.registration.scope);
    let target = new URL("./", scopeUrl).href;
    try {
      const requested = new URL(event.notification.data?.url || "./", scopeUrl);
      const isInsideApp = requested.origin === scopeUrl.origin &&
        requested.pathname.startsWith(scopeUrl.pathname);
      if (isInsideApp) target = requested.href;
    } catch {
      // Keep the safe in-app fallback for malformed notification URLs.
    }
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
        .catch(async () => {
          const cache = await caches.open(CACHE_NAME);
          return (await cache.match(request)) || (await cache.match("./index.html"));
        })
    );
    return;
  }

  const isAppAsset = APP_SHELL.some(path => new URL(path, self.registration.scope).href === url.href);
  if (!isAppAsset) return;

  event.respondWith(
    caches.open(CACHE_NAME).then(async cache => {
      const cached = await cache.match(request);
      if (cached) return cached;
      const response = await fetch(request);
      if (response.ok) {
        const copy = response.clone();
        await cache.put(request, copy);
      }
      return response;
    })
  );
});