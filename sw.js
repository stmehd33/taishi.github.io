const C='fs-expo-2026-v42';
const FILES=['./','index.html','data-2026.js','route-2026.js','perks-2026.js','schedule-2026.js','map.jpg','entrance-area.png','apple-touch-icon.png','manifest.webmanifest'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>Promise.all(FILES.map(f=>fetch(new Request(f,{cache:'reload'})).then(r=>{if(r.ok)return c.put(f,r)})))))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
/* 通信できる時は必ずサーバーの最新版を取る（ブラウザの一時保存は使わない）。4秒たっても来なければ保存済みを使う */
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
 const net=fetch(r,{cache:'no-store'}).then(res=>{if(res.ok){const cp=res.clone();caches.open(C).then(c=>c.put(r,cp))}return res});
 const fb=()=>caches.match(r,{ignoreSearch:true}).then(m=>m||caches.match('index.html'));
 e.respondWith(new Promise(ok=>{let done=false;const t=setTimeout(()=>{fb().then(m=>{if(m&&!done){done=true;ok(m)}})},4000);
  net.then(res=>{if(!done){done=true;clearTimeout(t);ok(res)}}).catch(()=>{clearTimeout(t);if(!done){fb().then(m=>{done=true;ok(m||Response.error())})}})}))});
