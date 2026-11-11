const CACHE="fluentiq-c033da3f0890";
const CORE=["./","./index.html","./icon.svg","./manifest.webmanifest","./privacy.html","./icons/icon-192.png","./icons/icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()));});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith("fluentiq-")&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener("fetch",e=>{const u=new URL(e.request.url);if(e.request.method!=="GET"||u.origin!==self.location.origin||!u.href.startsWith(self.registration.scope))return;
if(e.request.mode==="navigate"){e.respondWith(fetch(e.request).then(r=>{if(r.ok){const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));}return r;}).catch(()=>caches.match(e.request).then(r=>r||caches.match(new URL("./index.html",self.registration.scope).href))));return;}
if(CORE.some(p=>new URL(p,self.registration.scope).href===u.href)){e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));}});
