const C="ara-tv-v1",A=["./","./index.html","./manifest.webmanifest","./icon-192.png","./icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(A)).catch(()=>{}));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{
 const r=e.request,u=new URL(r.url);
 // only the app's own files; streams, Google Sheets and CDN files always go straight to the network
 if(r.method!=="GET"||u.origin!==location.origin)return;
 e.respondWith(fetch(r).then(res=>{
  if(res&&res.status===200){const cp=res.clone();caches.open(C).then(c=>c.put(r,cp)).catch(()=>{})}
  return res;
 }).catch(()=>caches.match(r).then(m=>m||caches.match("./index.html"))));
});
