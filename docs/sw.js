/* Service worker: deja ROUND funcionar sin internet. Sube VERSION al publicar cambios. */
const VERSION='round-v1';
const FILES=["./", "index.html", "fonts.css", "manifest.webmanifest", "icon-192.png", "icon-512.png", "apple-touch-icon.png", "fonts/ibm-plex-mono-latin-400-normal.woff2", "fonts/ibm-plex-mono-latin-500-normal.woff2", "fonts/ibm-plex-mono-latin-600-normal.woff2", "fonts/inter-latin-400-normal.woff2", "fonts/inter-latin-500-normal.woff2", "fonts/inter-latin-600-normal.woff2", "fonts/inter-latin-700-normal.woff2", "fonts/newsreader-latin-400-italic.woff2", "fonts/newsreader-latin-400-normal.woff2", "fonts/newsreader-latin-500-italic.woff2", "fonts/newsreader-latin-500-normal.woff2", "fonts/newsreader-latin-600-italic.woff2", "fonts/newsreader-latin-600-normal.woff2"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(VERSION).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==VERSION).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET') return;
  e.respondWith(fetch(e.request).then(r=>{ if(r&&r.ok){ const cp=r.clone(); caches.open(VERSION).then(c=>c.put(e.request,cp)); } return r; }).catch(()=>caches.match(e.request,{ignoreSearch:true}).then(m=>m||caches.match('index.html'))));
});
