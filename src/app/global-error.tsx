'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en">
      <body style={{
        margin: 0,
        fontFamily: 'system-ui, sans-serif',
        padding: '2rem',
        background: '#1a1a2e',
        color: '#fff',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}>
        <h1 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Something went wrong</h1>
        <p style={{ marginBottom: '1.5rem', opacity: 0.9 }}>{error.message}</p>
        <button
          onClick={reset}
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            cursor: 'pointer',
            background: '#DC143C',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
          }}
        >
          Try again
        </button>
      </body>
    </html>
  )
}
