'use client'

import { useEffect } from 'react'

export default function PostHog() {
  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_POSTHOG_KEY
    const apiHost = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com'

    if (!apiKey) {
      console.warn('PostHog: missing NEXT_PUBLIC_POSTHOG_KEY')
      return
    }

    // Initialize posthog as a queue if not already done
    if (!window.posthog) {
      window.posthog = []
    }

    // Load PostHog script dynamically
    const script = document.createElement('script')
    script.src = `${apiHost}/static/recorders.js`
    script.async = true
    script.onload = () => {
      // Once loaded, initialize
      if (window.posthog && Array.isArray(window.posthog)) {
        ;(window.posthog as any).push([
          'init',
          apiKey,
          {
            api_host: apiHost,
            autocapture: true,
            session_recording: { sample_rate: 0 },
          },
        ])
      }
    }
    script.onerror = () => {
      console.warn('PostHog: failed to load recorder script')
    }
    document.head.appendChild(script)

    return () => {
      // Cleanup
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
    }
  }, [])

  return null
}