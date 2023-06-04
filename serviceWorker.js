const staticWeather = "Weather-page"
const assets = [
  "/",
  "/index.html",
  "/styles.css",
  "/main.js",
  "/img/circle.ico",
]

self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
      (async () => {
        const cache = await caches.open(staticWeather);
        await cache.addAll(assets);
      })()
    );
});