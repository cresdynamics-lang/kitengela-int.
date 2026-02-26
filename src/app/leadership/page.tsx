'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollReveal from '@/components/ScrollReveal'
import { publicApi } from '@/lib/api'
import styles from './leadership.module.css'

interface Leader {
  id: string
  name: string
  title: string
  bio: string | null
  imageUrl: string | null
  orderIndex: number
}

const defaultLeaders: Leader[] = [
  {
    id: 'evans-kochoo',
    name: 'Rev. Evans O. Kochoo',
    title: 'Senior Pastor',
    bio: 'I am Evans O. Kochoo, fondly known as The Eagle, a passionate servant of God driven by a dynamic apostolic mandate to disseminate the pure and unadulterated Gospel of Jesus Christ.',
    imageUrl: '/Rev.Evans1.jpeg',
    orderIndex: 1
  },
  {
    id: 'pastor-nancy-sai',
    name: 'Pastor Nancy Sai',
    title: 'Assistant Pastor',
    bio: 'Pastor Nancy Sai serves as the Assistant Pastor at Kitengela VOSH International Church. She is passionate about advancing God\'s Kingdom through sound teaching, servant leadership, and community impact. With a heart for people and excellence in ministry, Pastor Sai is committed to nurturing spiritual growth and empowering believers to fulfill their God-given purpose.',
    imageUrl: '/PastorNancySai.jpeg',
    orderIndex: 2
  }
]

export default function LeadershipPage() {
  const [leaders, setLeaders] = useState<Leader[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLeaders = async () => {
      try {
        const response = await publicApi.getLeaders()
        if (response.success && response.data && Array.isArray(response.data)) {
          const apiLeaders = response.data as Leader[]
          const hasEvans = apiLeaders.some((l) => l.id === 'evans-kochoo' || (l.name && l.name.toLowerCase().includes('evans')))
          const hasNancy = apiLeaders.some((l) => l.id === 'pastor-nancy-sai' || (l.name && l.name.toLowerCase().includes('nancy')))
          if (hasEvans && hasNancy && apiLeaders.length >= 2) {
            setLeaders(apiLeaders)
            return
          }
        }
        setLeaders(defaultLeaders)
      } catch {
        setLeaders(defaultLeaders)
      } finally {
        setLoading(false)
      }
    }

    fetchLeaders()
  }, [])

  return (
    <main>
      <Header />
      <div className={styles.container}>
        <ScrollReveal direction="left">
          <div className={styles.hero}>
            <h1 className={styles.title}>Our Leadership</h1>
            <p className={styles.subtitle}>
              Meet the dedicated leaders serving our church community
            </p>
          </div>
        </ScrollReveal>

        {loading ? (
          <div className={styles.loading}>Loading...</div>
        ) : (
          <ScrollReveal direction="right">
          <div className={styles.leadersGrid}>
            {leaders.length > 0 ? (
              leaders.map((leader) => {
                const slug = leader.name.toLowerCase().includes('evans') ? 'evans-kochoo'
                  : (leader.id === 'pastor-nancy-sai' || leader.name.toLowerCase().includes('nancy')) ? 'pastor-nancy-sai'
                  : leader.id
                const displayImageUrl = !leader.imageUrl
                  ? (leader.name.toLowerCase().includes('evans') ? '/Rev.Evans1.jpeg' : leader.name.toLowerCase().includes('nancy') ? '/PastorNancySai.jpeg' : null)
                  : leader.imageUrl
                return (
                <Link
                  key={leader.id}
                  href={`/leadership/${slug}`}
                  className={styles.leaderCard}
                >
                  <div className={styles.imageContainer}>
                    {displayImageUrl ? (
                      <Image
                        src={displayImageUrl}
                        alt={leader.name}
                        width={300}
                        height={300}
                        className={styles.leaderImage}
                      />
                    ) : (
                      <div className={styles.placeholderImage}>
                        <span className={styles.placeholderText}>
                          {leader.name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className={styles.leaderInfo}>
                    <h3 className={styles.leaderName}>{leader.name}</h3>
                    <p className={styles.leaderTitle}>{leader.title}</p>
                    {leader.bio && (
                      <p className={styles.leaderBio}>
                        {leader.bio.length > 150
                          ? `${leader.bio.substring(0, 150)}...`
                          : leader.bio}
                      </p>
                    )}
                    <span className={styles.readMore}>Read More →</span>
                  </div>
                </Link>
              )
              })
            ) : (
              <div className={styles.empty}>
                <p>Leadership information coming soon.</p>
              </div>
            )}
          </div>
          </ScrollReveal>
        )}
      </div>
      <Footer />
    </main>
  )
}
