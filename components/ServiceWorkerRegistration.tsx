"use client"

import { useEffect } from "react"

export function ServiceWorkerRegistration() {
  useEffect(() => {
    // Only register in production and if service workers are supported
    if (
      typeof window !== 'undefined' &&
      'serviceWorker' in navigator &&
      process.env.NODE_ENV === 'production'
    ) {
      // Register after page load to avoid blocking initial render
      const registerSW = () => {
        navigator.serviceWorker
          .register('/sw.js', { scope: '/' })
          .then((registration) => {
            // Check for updates periodically
            setInterval(() => {
              registration.update()
            }, 60 * 60 * 1000) // Check every hour
          })
          .catch((error) => {
            // Silently fail - service worker is optional
            console.debug('Service Worker registration failed:', error)
          })
      }

      // Register after page is fully loaded or on idle
      if (document.readyState === 'complete') {
        if ('requestIdleCallback' in window) {
          requestIdleCallback(registerSW, { timeout: 3000 })
        } else {
          setTimeout(registerSW, 2000)
        }
      } else {
        window.addEventListener('load', () => {
          if ('requestIdleCallback' in window) {
            requestIdleCallback(registerSW, { timeout: 3000 })
          } else {
            setTimeout(registerSW, 2000)
          }
        }, { once: true })
      }
    }
  }, [])

  return null
}
