var C='mance-v5';
var F=['./','index.html','manifest.json','icon-192.png','icon-512.png'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(C).then(function(c){return c.addAll(F)}));self.skipWaiting();});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==C}).map(function(x){return caches.delete(x)}))}));self.clients.claim();});
function fb(req){return caches.match(req).then(function(m){return m||caches.match('index.html');});}
self.addEventListener('fetch',function(e){
  if(e.request.method!=='GET')return;
  e.respondWith(fetch(e.request).then(function(r){
    if(!r.ok)return fb(e.request).then(function(m){return m||r;});
    var cp=r.clone();caches.open(C).then(function(c){c.put(e.request,cp)});return r;
  }).catch(function(){return fb(e.request);}));
});
