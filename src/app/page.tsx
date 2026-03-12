import Link from 'next/link'

export default function Home() {
  return (
    <div
      style={{
        padding: '2rem',
        fontFamily: 'system-ui, sans-serif',
        background: '#1a1a2e',
        color: '#fff',
        minHeight: '100vh',
        textAlign: 'center',
      }}
    >
      <h1 style={{ marginBottom: '1rem' }}>Voice Of Salvation And Healing Church Int&apos;l – Kitengela</h1>
      <p style={{ marginBottom: '1.5rem', opacity: 0.9 }}>A House of Solutions — Manifesting Christ</p>
      <Link
        href="/home"
        style={{
          display: 'inline-block',
          padding: '0.75rem 1.5rem',
          background: '#DC143C',
          color: '#fff',
          textDecoration: 'none',
          borderRadius: '6px',
          fontWeight: 600,
        }}
      >
        Enter site →
      </Link>
    </div>
  )
}
