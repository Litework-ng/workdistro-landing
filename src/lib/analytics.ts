type PosthogClient = {
  capture?: (eventName: string, properties?: Record<string, unknown>) => void
  identify?: (id: string) => void
  push?: (args: unknown[]) => void
}

declare global {
  interface Window {
    posthog?: PosthogClient | Array<unknown[]>
  }
}

export const trackEvent = (eventName: string, parameters?: Record<string, unknown>) => {
  if (typeof window === 'undefined') return

  const posthog = window.posthog

  if (Array.isArray(posthog)) {
    // PostHog not loaded yet, queue the event
    posthog.push(['capture', eventName, parameters])
  } else if (posthog && typeof posthog.capture === 'function') {
    // PostHog ready, call directly
    posthog.capture(eventName, parameters)
  } else if (posthog && typeof posthog.push === 'function') {
    // PostHog has push but not initialized yet
    posthog.push(['capture', eventName, parameters])
  }
}
