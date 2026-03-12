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

const defaultCarouselImages: CarouselImage[] = [
  { id: 0, title: "Welcome to VOSH Church International — Kitengela Branch", image: "/Carousel1.jpg", description: "We are committed to teaching the Word, building strong faith, and transforming lives through Christ. May you find purpose, growth, and a place to belong here. We look forward to worshiping and serving with you." },
  { id: 1, title: "Voice Of Salvation And Healing Church Int'l – Kitengela", image: "/Carousel2.jpg", description: "A House of Solutions — Manifesting Christ in Our Community" },
  { id: 2, title: "Join Us for Worship and Fellowship!", image: "/Carousell3.jpeg", description: "Experience the power of God's Word and fellowship with believers", location: "Along Baraka Road / Treewa Road, Next to Balozi Junior Academy, Kitengela" },
  { id: 3, title: "We're Here for You!", image: "/Carousel4.jpg", description: "A community committed to prayer, stewardship, holiness, advocacy, and unity", phoneNumbers: ["+254 722 566 399", "+254 720 276 162", "+254 720 977 189"] },
  { id: 4, title: "Join Us This Sunday!", image: "/midweekservicefriday.jpeg", description: "Experience powerful worship and teaching", services: ["Bible Study: Sunday 8:00 AM - 9:00 AM", "SB1 Service: Sunday 9:00 AM - 10:30 AM", "Word Manifest: Sunday 10:30 AM - 1:00 PM", "Discipleship: Sunday 2:30 PM - 4:00 PM"] },
  { id: 5, title: "Connect With Us Today!", image: "/onlineconnectthurday.jpeg", description: "Join us for worship, prayer, and fellowship", services: ["Bible Study: Sunday 8:00 AM - 9:00 AM", "SB1 Service: Sunday 9:00 AM - 10:30 AM", "Word Manifest: Sunday 10:30 AM - 1:00 PM", "Discipleship: Sunday 2:30 PM - 4:00 PM"] }
]

export default function HomeClient() {
  const [carouselImages] = useState<CarouselImage[]>(defaultCarouselImages)
  const [services, setServices] = useState<Service[]>([])
  const [sundaySermon, setSundaySermon] = useState<Sermon | null>(null)
  const [loading, setLoading] = useState(true)
  const [liveStreamUrl, setLiveStreamUrl] = useState<string | null>(null)

  useEffect(() => {
    const fetchLiveUrl = async () => {
      try {
        const response = await publicApi.getLive()
        if (response.success && response.data) {
          const data = response.data as { youtubeLiveUrl?: string | null; facebookLiveUrl?: string | null; googleMeetUrl?: string | null }
          setLiveStreamUrl(data.youtubeLiveUrl || data.facebookLiveUrl || data.googleMeetUrl || null)
        }
      } catch (e) {
        console.error('Error fetching live stream:', e)
      }
    }
    fetchLiveUrl()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        try {
          const sermonsRes = await publicApi.getSermons()
          if (sermonsRes.success && Array.isArray(sermonsRes.data) && sermonsRes.data.length > 0) {
            setSundaySermon(sermonsRes.data[0])
          }
        } catch (e) {
          console.error('Error fetching sermons:', e)
        }
        try {
          const programsRes = await publicApi.getWeeklyPrograms()
          if (programsRes.success && Array.isArray(programsRes.data)) {
            setServices(
              (programsRes.data as any[])
                .filter((p: any) => p.isActive !== false)
                .map((p: any) => ({
                  id: p.id,
                  name: p.title || p.name || '',
                  time: p.startTime && p.endTime ? `${p.startTime} - ${p.endTime}` : p.startTime || p.time || '',
                  day: p.day || '',
                  description: p.description || ''
                }))
            )
          }
        } catch (e) {
          console.error('Error fetching programs:', e)
        }
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
      {sundaySermon && (
        <ScrollReveal direction="left">
          <section className={styles.sundaySermonSection}>
            <div className={styles.sundaySermonInner}>
              <div className={styles.sundaySermonContent}>
                <h1 className={styles.sundaySermonHeading}>{sundaySermon.title}</h1>
                {sundaySermon.description && <p className={styles.sundaySermonParagraph}>{sundaySermon.description}</p>}
                {sundaySermon.speaker && <p className={styles.sundaySermonSpeakers}>{sundaySermon.speaker.includes(',') ? 'Speakers: ' : 'Speaker: '}{sundaySermon.speaker}</p>}
                <div className={styles.sundaySermonActions}>
                  <a
                    href={liveStreamUrl || '/services'}
                    target={liveStreamUrl ? '_blank' : undefined}
                    rel={liveStreamUrl ? 'noopener noreferrer' : undefined}
                    className={styles.sundaySermonBtn}
                  >
                    Join Us Live
                  </a>
                </div>
              </div>
              {sundaySermon.thumbnailUrl && <div className={styles.sundaySermonPoster}><img src={sundaySermon.thumbnailUrl} alt={sundaySermon.title} /></div>}
            </div>
          </section>
        </ScrollReveal>
      )}
      <ScrollReveal direction="right">
        <section className={styles.joinSection}>
          <div className={styles.joinInner}>
            <h2 className={styles.joinTitle}>Join Us Online</h2>
            <p className={styles.joinSubtitle}>Experience worship and prayer from anywhere</p>
            <div className={styles.joinButtons}>
              <a
                href={liveStreamUrl || '/services'}
                target={liveStreamUrl ? '_blank' : undefined}
                rel={liveStreamUrl ? 'noopener noreferrer' : undefined}
                className={`${styles.joinButton} ${styles.joinButtonRed}`}
              >
                <span>▶️</span> Watch Live
              </a>
              <a
                href={liveStreamUrl || '/services'}
                target={liveStreamUrl ? '_blank' : undefined}
                rel={liveStreamUrl ? 'noopener noreferrer' : undefined}
                className={`${styles.joinButton} ${styles.joinButtonGold}`}
              >
                <span>🙏</span> Join Prayer
              </a>
            </div>
            <a href="/services" className={styles.planVisitLink}>Plan Your Visit / Join Us This Sunday →</a>
          </div>
        </section>
      </ScrollReveal>
      {loading ? <div className={styles.loadingText}>Loading services...</div> : <ScrollReveal direction="left"><Services services={services} /></ScrollReveal>}
      <ScrollReveal direction="right"><CoreValues /></ScrollReveal>
      <Footer />
    </main>
  )
}
