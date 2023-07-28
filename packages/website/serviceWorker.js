const cacheKey = 'tybalt-docs-site-v1';
const assets = [
    '/',
    '/index.html',
    '/css/base.css',
    '/css/index.css',
    '/css/page.css',
    '/img/favico.png',
    '/js/tybalt-out.js',
    '/pages/cli.html',
    '/pages/core.html',
    '/pages/eleventy-plugin.html',
    '/pages/esbuild-plugin.html',
    '/pages/eslint-plugin.html',
    '/pages/test-utils.html',
    '/pages/validator.html',
];

self.addEventListener('install', (installEvent) => {
    installEvent.waitUntil(
        caches.open(staticDevCoffee).then((cache) => {
            cache.addAll(assets);
        }),
    );
});
