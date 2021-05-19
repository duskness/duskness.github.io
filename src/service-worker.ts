import { timestamp, build } from '$service-worker';
// workbox-precaching
const name = `cache-${timestamp}`;

console.log('build', build);

interface SWEvent extends Event {
    waitUntil(fn: Promise<unknown>): void;
}

interface FetchSWEvent extends SWEvent {
    request: Request,
    respondWith(response: Promise<Response>|Response): Promise<Response>;
}


self.addEventListener('install', (event: SWEvent) => {
        event.waitUntil(caches.open(name).then((cache) => cache.addAll(build)));
});

self.addEventListener('activate', (event: SWEvent) => {
        event.waitUntil(
                caches.keys().then(async (keys) => {
                        for (const key of keys) {
                                if (!key.includes(timestamp.toString())) caches.delete(key);
                        }
                })
        );
});
self.addEventListener('fetch', (event: FetchSWEvent) => {
        const { request } = event;

        if (request.method !== 'GET' || request.headers.has('range')) return;

        const url = new URL(request.url);
        const cached = caches.match(request);

        if (url.origin === location.origin && build.includes(url.pathname)) {
                // always return build files from cache
                event.respondWith(cached);
        } else if (url.protocol === 'https:' || location.hostname === 'localhost') {
                // hit the network for everything else...
                const promise = fetch(request);

                // ...and cache successful responses...
                promise.then((response) => {
                        // cache successful responses
                        if (response.ok && response.type === 'basic') {
                                const clone = response.clone();
                                caches.open(name).then((cache) => {
                                        cache.put(request, clone);
                                });
                        }
                });

                // ...but if it fails, fall back to cache if available
                event.respondWith(promise.catch(() => cached || promise));
        }
});