'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('App error:', error)
  }, [error])

  return (
    <div style={{
      margin: 0,
      fontFamily: 'system-ui, sans-serif',
      padding: '2rem',
      background: '#1a1a2e',
      color: '#fff',
      minHeight: '50vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
    }}>
      <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Something went wrong</h2>
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
    </div>
  )
}
