const staticWeather = "Weather-page"
const assets = [
  "index.html",
  "styles.css",
  "main.js",
  "img/circle.ico",
]

self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
      caches.open(staticWeather).then(cache => {
        cache.addAll(assets)
      })
    )
  })

  self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
      caches.match(fetchEvent.request).then(res => {
        return res || fetch(fetchEvent.request)
      })
    )
  })