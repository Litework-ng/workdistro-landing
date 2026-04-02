import Script from 'next/script'

export default function PostHog() {
  const apiKey = process.env.NEXT_PUBLIC_POSTHOG_KEY
  const apiHost = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com'

  if (!apiKey) {
    console.warn('PostHog key missing (NEXT_PUBLIC_POSTHOG_KEY)')
    return null
  }

  return (
    <>
      <Script src={`${apiHost}/static/array.js`} strategy="afterInteractive" />
      <Script id="posthog-init" strategy="afterInteractive">
        {`
          window.posthog = window.posthog || [];
          window.posthog['capture'] = window.posthog['capture'] || function() { (window.posthog.q = window.posthog.q || []).push(['capture'].concat(Array.prototype.slice.call(arguments, 0))); };
          window.posthog['identify'] = window.posthog['identify'] || function() { (window.posthog.q = window.posthog.q || []).push(['identify'].concat(Array.prototype.slice.call(arguments, 0))); };
          window.posthog.init('${apiKey}', { api_host: '${apiHost}' });
        `}
      </Script>
    </>
  )
}