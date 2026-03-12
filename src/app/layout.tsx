import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: "Voice Of Salvation And Healing Church Int'l – Kitengela",
  description: "Voice Of Salvation And Healing Church Int'l – Kitengela. A House of Solutions, Manifesting Christ. Join us for worship, prayer, and fellowship.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body>
        <noscript>
          <div style={{ padding: '2rem', background: '#1a1a2e', color: '#fff', fontFamily: 'system-ui', textAlign: 'center' }}>
            Voice Of Salvation And Healing Church – Kitengela. Please enable JavaScript to view the full site.
          </div>
        </noscript>
        {children}
      </body>
    </html>
  )
}
