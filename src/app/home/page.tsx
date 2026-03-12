import HomePageClient from './HomePageClient'

export default function HomePage() {
  return (
    <>
      <div
        style={{
          background: '#1a1a2e',
          color: '#fff',
          padding: '1rem 1.5rem',
          fontFamily: 'system-ui, sans-serif',
          textAlign: 'center',
          borderBottom: '1px solid #333',
        }}
      >
        <h1 style={{ margin: 0, fontSize: '1.25rem' }}>
          Voice Of Salvation And Healing Church Int&apos;l – Kitengela
        </h1>
        <p style={{ margin: '0.25rem 0 0', fontSize: '0.9rem', opacity: 0.9 }}>
          A House of Solutions — Manifesting Christ
        </p>
      </div>
      <HomePageClient />
    </>
  )
}
