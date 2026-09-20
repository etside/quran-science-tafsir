const CACHE = "tafsir-v2";
const ASSETS = [
  "./",
  "./index.html",
  "./assets/css/style.css",
  "./assets/js/app.js",
  "./assets/js/tts.js",
  "./assets/js/builder.js",
  "./assets/data/chapters.js",
  "./assets/data/surah_knowledge.js",
  "./assets/data/deep_research.js",
  "./manifest.json"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(()=>self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET" || !url.pathname.includes("/quran-science-tafsir/")) return;
  e.respondWith(
    caches.match(e.request).then(cached => {
      const fetched = fetch(e.request).then(res=>{
        if(res.ok) caches.open(CACHE).then(c=>c.put(e.request, res.clone()));
        return res;
      }).catch(()=>cached);
      return cached || fetched;
    })
  );
});

// Notifications & periodic tasks
self.addEventListener("push", e => {
  const data = e.data ? e.data.json() : {};
  const title = data.title || "Scientific Tafsir — Today's Ayah";
  const opts = {
    body: data.body || "আজকের আয়াত পড়ুন · Today's ayah is ready",
    icon: "./assets/icon-192.png",
    badge: "./assets/icon-192.png",
    data: { url: data.url || "./" }
  };
  e.waitUntil(self.registration.showNotification(title, opts));
});
self.addEventListener("notificationclick", e => {
  e.notification.close();
  const url = (e.notification.data && e.notification.data.url) || "./";
  e.waitUntil(clients.matchAll({type:"window"}).then(list=>{
    for(const c of list) if(c.url.includes("/quran-science-tafsir/")) return c.focus();
    return clients.openWindow(url);
  }));
});
self.addEventListener("periodicsync", e => {
  if(e.tag === "research-daily") e.waitUntil(fetch("./assets/data/alt_meanings.json").then(r=>r.ok && caches.open(CACHE).then(c=>c.put("./assets/data/alt_meanings.json", r))));
});