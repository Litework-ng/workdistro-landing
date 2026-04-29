import posthog from 'posthog-js'

export const trackEvent = (eventName: string, parameters?: Record<string, unknown>) => {  
  if (typeof window === 'undefined') return  // still needed for SSR safety  
  posthog.capture(eventName, parameters)  
}  