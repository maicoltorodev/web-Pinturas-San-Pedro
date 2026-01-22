"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"

// Lazy load Analytics only after initial page load and user interaction
const Analytics = dynamic(() => import("@vercel/analytics/next").then(mod => ({ default: mod.Analytics })), {
  ssr: false,
})

const SpeedInsights = dynamic(() => import("@vercel/speed-insights/next").then(mod => ({ default: mod.SpeedInsights })), {
  ssr: false,
})

export function AnalyticsLazy() {
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    // Load analytics after:
    // 1. Page is fully loaded, OR
    // 2. User interacts (click, scroll, touch), OR
    // 3. After 3 seconds (fallback)
    
    let loaded = false
    
    const loadAnalytics = () => {
      if (loaded) return
      loaded = true
      setShouldLoad(true)
    }

    // Load on user interaction
    const events: (keyof WindowEventMap)[] = ['mousedown', 'touchstart', 'scroll', 'keydown']
    const handleInteraction = () => {
      loadAnalytics()
      events.forEach(event => {
        window.removeEventListener(event, handleInteraction)
      })
    }

    events.forEach(event => {
      window.addEventListener(event, handleInteraction, { passive: true, once: true })
    })

    // Load after page is fully loaded
    if (document.readyState === 'complete') {
      // Use requestIdleCallback if available, otherwise setTimeout
      if ('requestIdleCallback' in window) {
        requestIdleCallback(loadAnalytics, { timeout: 2000 })
      } else {
        setTimeout(loadAnalytics, 2000)
      }
    } else {
      window.addEventListener('load', () => {
        if ('requestIdleCallback' in window) {
          requestIdleCallback(loadAnalytics, { timeout: 2000 })
        } else {
          setTimeout(loadAnalytics, 2000)
        }
      }, { once: true })
    }

    // Fallback: load after 3 seconds
    const fallback = setTimeout(loadAnalytics, 3000)

    return () => {
      clearTimeout(fallback)
      events.forEach(event => {
        window.removeEventListener(event, handleInteraction)
      })
    }
  }, [])

  if (!shouldLoad) return null

  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  )
}
