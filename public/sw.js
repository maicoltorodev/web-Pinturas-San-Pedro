const CACHE_NAME = 'pinturas-san-pedro-images-v1'
const IMAGE_CACHE_MAX_AGE = 30 * 24 * 60 * 60 * 1000 // 30 days in milliseconds

// Install event - cache critical images
self.addEventListener('install', (event) => {
  self.skipWaiting()
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      )
    })
  )
  return self.clients.claim()
})

// Fetch event - cache images
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Only cache GET requests for images
  if (request.method !== 'GET') return
  if (!url.pathname.match(/\.(webp|jpg|jpeg|png|avif|gif)$/i)) return

  event.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          // Check if cache is still valid
          const cachedDate = cachedResponse.headers.get('date')
          if (cachedDate) {
            const age = Date.now() - new Date(cachedDate).getTime()
            if (age < IMAGE_CACHE_MAX_AGE) {
              return cachedResponse
            }
          } else {
            return cachedResponse
          }
        }

        // Fetch from network and cache
        return fetch(request)
          .then((response) => {
            // Only cache successful responses
            if (response.status === 200) {
              const responseToCache = response.clone()
              cache.put(request, responseToCache)
            }
            return response
          })
          .catch(() => {
            // If network fails and we have a cached version, return it even if expired
            return cachedResponse || new Response('Image not available', { status: 404 })
          })
      })
    })
  )
})
