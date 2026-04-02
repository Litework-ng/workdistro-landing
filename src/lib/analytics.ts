declare global {
  interface Window {
    posthog: {
      capture: (eventName: string, properties?: Record<string, unknown>) => void
      identify: (id: string) => void
      people: {
        set: (props: Record<string, unknown>) => void
      }
    }
  }
}

export const trackEvent = (eventName: string, parameters?: Record<string, unknown>) => {
  if (typeof window !== 'undefined' && window.posthog) {
    window.posthog.capture(eventName, parameters)
  }
}
