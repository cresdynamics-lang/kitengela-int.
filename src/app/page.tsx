'use client'

import { useEffect, useState } from 'react'
import Carousel from '@/components/Carousel'
import Header from '@/components/Header'
import ScrollReveal from '@/components/ScrollReveal'
import Services from '@/components/Services'
import CoreValues from '@/components/CoreValues'
import Footer from '@/components/Footer'
import { publicApi } from '@/lib/api'
import styles from './page.module.css'

interface CarouselImage {
  id: number
  title: string
  image: string
  description: string
  phoneNumbers?: string[]
  location?: string
  services?: string[]
}

interface Service {
  id: number
  name: string
  time: string
  day: string
  description: string
}

interface Sermon {
  id: string
  title: string
  description: string | null
  speaker: string | null
  date: string
  videoUrl: string | null
  audioUrl: string | null
  thumbnailUrl: string | null
  duration: number | null
}

// Default carousel images with welcoming messages
const defaultCarouselImages: CarouselImage[] = [
  {
    id: 0,
    title: "Welcome to VOSH Church International — Kitengela Branch",
    image: "/churchcorevalues.jpeg",
    description: "We are committed to teaching the Word, building strong faith, and transforming lives through Christ. May you find purpose, growth, and a place to belong here. We look forward to worshiping and serving with you."
  },
  {
    id: 1,
    title: "Voice Of Salvation And Healing Church Int'l – Kitengela",
    image: "/churchcorevalues.jpeg",
    description: "A House of Solutions — Manifesting Christ in Our Community"
  },
  {
    id: 2,
    title: "Join Us for Worship and Fellowship!",
    image: "/sundayservices.jpeg",
    description: "Experience the power of God's Word and fellowship with believers",
    location: "Along Baraka Road / Treewa Road, Next to Balozi Junior Academy, Kitengela"
  },
  {
    id: 3,
    title: "We're Here for You!",
    image: "/biblestudysundaymorning.jpeg",
    description: "A community committed to prayer, stewardship, holiness, advocacy, and unity",
    phoneNumbers: [
      "+254 722 566 399",
      "+254 720 276 162",
      "+254 720 977 189"
    ]
  },
  {
    id: 4,
    title: "Join Us This Sunday!",
    image: "/midweekservicefriday.jpeg",
    description: "Experience powerful worship and teaching",
    services: [
      "Bible Study: Sunday 8:00 AM - 9:00 AM",
      "SB1 Service: Sunday 9:00 AM - 10:30 AM",
      "Word Manifest: Sunday 10:30 AM - 1:00 PM",
      "Discipleship: Sunday 2:30 PM - 4:00 PM"
    ]
  },
  {
    id: 5,
    title: "Connect With Us Today!",
    image: "/onlineconnectthurday.jpeg",
    description: "Join us for worship, prayer, and fellowship",
    services: [
      "Bible Study: Sunday 8:00 AM - 9:00 AM",
      "SB1 Service: Sunday 9:00 AM - 10:30 AM",
      "Word Manifest: Sunday 10:30 AM - 1:00 PM",
      "Discipleship: Sunday 2:30 PM - 4:00 PM"
    ]
  }
]

export default function Home() {
  const [carouselImages, setCarouselImages] = useState<CarouselImage[]>(defaultCarouselImages)
  const [services, setServices] = useState<Service[]>([])
  const [sundaySermon, setSundaySermon] = useState<Sermon | null>(null)
  const [loading, setLoading] = useState(true)
  const [liveStreamUrl, setLiveStreamUrl] = useState<string | null>(null)

  useEffect(() => {
    const fetchLiveUrl = async () => {
      try {
        const response = await publicApi.getLive()
        if (response.success && response.data) {
          const data = response.data as { 
            youtubeLiveUrl?: string | null
            facebookLiveUrl?: string | null
            googleMeetUrl?: string | null
          }
          // Priority: YouTube > Facebook > Google Meet
          setLiveStreamUrl(
            data.youtubeLiveUrl || 
            data.facebookLiveUrl || 
            data.googleMeetUrl || 
            null
          )
        }
      } catch (error) {
        console.error('Error fetching live stream:', error)
      }
    }
    fetchLiveUrl()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch sermons for Sunday Sermon section (latest = first from API)
        try {
          const sermonsRes = await publicApi.getSermons()
          if (sermonsRes.success && Array.isArray(sermonsRes.data) && sermonsRes.data.length > 0) {
            setSundaySermon(sermonsRes.data[0])
          }
        } catch (e) {
          console.error('Error fetching sermons:', e)
        }

        // Use public API for programs (services) — same-origin, always JSON
        try {
          const programsRes = await publicApi.getWeeklyPrograms()
          if (programsRes.success && Array.isArray(programsRes.data)) {
            setServices(
              (programsRes.data as any[])
                .filter((prog: any) => prog.isActive !== false)
                .map((prog: any) => ({
                  id: prog.id,
                  name: prog.title || prog.name || '',
                  time: prog.startTime && prog.endTime
                    ? `${prog.startTime} - ${prog.endTime}`
                    : prog.startTime || prog.time || '',
                  day: prog.day || '',
                  description: prog.description || ''
                }))
            )
          }
        } catch (e) {
          console.error('Error fetching programs:', e)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <main>
      <Header />
      <Carousel images={carouselImages} />

      {/* Sunday Sermon section - from admin (latest sermon) */}
      {sundaySermon && (
        <ScrollReveal direction="left">
        <section className={styles.sundaySermonSection}>
          <div className={styles.sundaySermonInner}>
            <div className={styles.sundaySermonContent}>
              <h1 className={styles.sundaySermonHeading}>{sundaySermon.title}</h1>
              {sundaySermon.description && (
                <p className={styles.sundaySermonParagraph}>{sundaySermon.description}</p>
              )}
              {sundaySermon.speaker && (
                <p className={styles.sundaySermonSpeakers}>
                  {sundaySermon.speaker.includes(',') ? 'Speakers: ' : 'Speaker: '}
                  {sundaySermon.speaker}
                </p>
              )}
              <div className={styles.sundaySermonActions}>
                <a
                  href={liveStreamUrl || '/sermons'}
                  target={liveStreamUrl ? '_blank' : undefined}
                  rel={liveStreamUrl ? 'noopener noreferrer' : undefined}
                  className={styles.sundaySermonBtn}
                >
                  Join Us Live
                </a>
                <a href="/sermons" className={styles.sundaySermonBtnOutline}>All Sermons</a>
              </div>
            </div>
            {sundaySermon.thumbnailUrl && (
              <div className={styles.sundaySermonPoster}>
                <img src={sundaySermon.thumbnailUrl} alt={sundaySermon.title} />
              </div>
            )}
          </div>
        </section>
        </ScrollReveal>
      )}
      
      {/* Watch Live & Join Prayer Section */}
      <ScrollReveal direction="right">
      <section className={styles.joinSection}>
        <div className={styles.joinInner}>
          <h2 className={styles.joinTitle}>Join Us Online</h2>
          <p className={styles.joinSubtitle}>
            Experience worship and prayer from anywhere
          </p>
          <div className={styles.joinButtons}>
            <a
              href={liveStreamUrl || '/sermons'}
              target={liveStreamUrl ? '_blank' : undefined}
              rel={liveStreamUrl ? 'noopener noreferrer' : undefined}
              className={`${styles.joinButton} ${styles.joinButtonRed}`}
            >
              <span>▶️</span>
              Watch Live
            </a>
            <a
              href={liveStreamUrl || '/sermons'}
              target={liveStreamUrl ? '_blank' : undefined}
              rel={liveStreamUrl ? 'noopener noreferrer' : undefined}
              className={`${styles.joinButton} ${styles.joinButtonGold}`}
            >
              <span>🙏</span>
              Join Prayer
            </a>
          </div>
          <a href="/services" className={styles.planVisitLink}>
            Plan Your Visit / Join Us This Sunday →
          </a>
        </div>
      </section>
      </ScrollReveal>

      {loading ? (
        <div className={styles.loadingText}>
          Loading services...
        </div>
      ) : (
        <ScrollReveal direction="left">
          <Services services={services} />
        </ScrollReveal>
      )}
      <ScrollReveal direction="right">
        <CoreValues />
      </ScrollReveal>
      <Footer />
    </main>
  )
}
