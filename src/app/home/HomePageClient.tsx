'use client'

import dynamic from 'next/dynamic'

const HomeClient = dynamic(() => import('../HomeClient'), {
  ssr: false,
  loading: () => (
    <div style={{ padding: '2rem', textAlign: 'center', background: '#1a1a2e', color: '#fff', minHeight: '200px' }}>
      Loading…
    </div>
  ),
})

export default function HomePageClient() {
  return <HomeClient />
}
