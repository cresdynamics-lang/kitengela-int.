import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Carousel from '@/components/Carousel'
import Header from '@/components/Header'
import ScrollReveal from '@/components/ScrollReveal'
import Services from '@/components/Services'
import CoreValues from '@/components/CoreValues'
import Footer from '@/components/Footer'
import { publicApi } from '@/lib/api'
import styles from './Home.module.css'

const defaultCarouselImages = [
  { id: 0, title: "Welcome to VOSH Church International — Kitengela Branch", image: "/Carousel1.jpg", description: "We are committed to teaching the Word, building strong faith, and transforming lives through Christ." },
  { id: 1, title: "Voice Of Salvation And Healing Church Int'l – Kitengela", image: "/Carousel2.jpg", description: "A House of Solutions — Manifesting Christ in Our Community" },
  { id: 2, title: "Join Us for Worship and Fellowship!", image: "/Carousell3.jpeg", description: "Experience the power of God's Word and fellowship with believers", location: "Along Baraka Road / Treewa Road, Next to Balozi Junior Academy, Kitengela" },
  { id: 3, title: "We're Here for You!", image: "/Carousel4.jpg", description: "A community committed to prayer, stewardship, holiness, advocacy, and unity", phoneNumbers: ["+254 722 566 399", "+254 720 276 162", "+254 720 977 189"] },
  { id: 4, title: "Join Us This Sunday!", image: "/midweekservicefriday.jpeg", description: "Experience powerful worship and teaching", services: ["Bible Study: Sunday 8:00 AM - 9:00 AM", "SB1 Service: Sunday 9:00 AM - 10:30 AM", "Word Manifest: Sunday 10:30 AM - 1:00 PM", "Discipleship: Sunday 2:30 PM - 4:00 PM"] },
  { id: 5, title: "Connect With Us Today!", image: "/onlineconnectthurday.jpeg", description: "Join us for worship, prayer, and fellowship", services: ["Bible Study: Sunday 8:00 AM - 9:00 AM", "SB1 Service: Sunday 9:00 AM - 10:30 AM", "Word Manifest: Sunday 10:30 AM - 1:00 PM", "Discipleship: Sunday 2:30 PM - 4:00 PM"] }
]

const beforeServicesCarouselImages = [
  { id: 10, title: "Morning Prayers", image: "/Morningprayers.jpg", description: "Start your day in God's presence. Join our morning prayers and be refreshed." },
  { id: 11, title: "Church in Prayer", image: "/churchpraying.jpg", description: "Corporate prayer and intercession—together we seek His face." },
  { id: 12, title: "Praise & Worship", image: "/praiseandworshipdancing.jpg", description: "Celebrate the Lord with joy. Experience praise and worship that lifts the spirit." },
  { id: 13, title: "Preaching the Word", image: "/preachinghour.jpg", description: "Sound teaching that transforms lives. Tune in to the preaching hour." },
  { id: 14, title: "Sermon & Note-Taking", image: "/sermontimenoteteking.jpg", description: "Grow in the Word. Take notes and apply the message to your life." }
]

// Replace with your YouTube video ID or full embed URL for Wednesday Online Prayers (e.g. 'dQw4w9WgXcQ' or 'https://www.youtube.com/embed/dQw4w9WgXcQ')
const WEDNESDAY_PRAYER_VIDEO_URL = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_WEDNESDAY_PRAYER_VIDEO_URL) || ''
function getWednesdayVideoEmbedUrl(url: string) {
  if (!url) return ''
  const trimmed = url.trim()
  const idMatch = trimmed.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
  if (idMatch) return `https://www.youtube.com/embed/${idMatch[1]}`
  if (trimmed.includes('youtube.com/embed/')) return trimmed
  return trimmed.length === 11 ? `https://www.youtube.com/embed/${trimmed}` : ''
}

export default function Home() {
  const [carouselImages] = useState(defaultCarouselImages)
  const [services, setServices] = useState<any[]>([])
  const [sundaySermon, setSundaySermon] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [liveStreamUrl, setLiveStreamUrl] = useState<string | null>(null)

  useEffect(() => {
    publicApi.getLive().then((r) => {
      if (r.success && r.data) {
        const d = r.data as any
        setLiveStreamUrl(d.youtubeLiveUrl || d.facebookLiveUrl || d.googleMeetUrl || null)
      }
    }).catch(() => {})
  }, [])

  useEffect(() => {
    Promise.all([
      publicApi.getSermons().then((r) => r.success && Array.isArray(r.data) && r.data.length > 0 ? r.data[0] : null),
      publicApi.getWeeklyPrograms().then((r) => {
        if (!r.success || !Array.isArray(r.data)) return []
        return (r.data as any[]).filter((p: any) => p.isActive !== false).map((p: any) => ({
          id: p.id,
          name: p.title || p.name || '',
          time: p.startTime && p.endTime ? `${p.startTime} - ${p.endTime}` : p.startTime || p.time || '',
          day: p.day || '',
          description: p.description || ''
        }))
      })
    ]).then(([sermon, prog]) => {
      setSundaySermon(sermon)
      setServices(prog)
    }).finally(() => setLoading(false))
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
            <Link to="/services" className={styles.planVisitLink}>Plan Your Visit / Join Us This Sunday →</Link>
          </div>
        </section>
      </ScrollReveal>

      {/* Second carousel – before Services */}
      <ScrollReveal direction="left">
        <section className={styles.secondCarouselWrap}>
          <h2 className={styles.secondCarouselTitle}>Life at VOSH — Prayers, Worship & Word</h2>
          <Carousel images={beforeServicesCarouselImages} />
        </section>
      </ScrollReveal>

      {/* Section 1: Wednesday Online Prayers – video or image */}
      <ScrollReveal direction="left">
        <section className={styles.bannerSection}>
          <div className={getWednesdayVideoEmbedUrl(WEDNESDAY_PRAYER_VIDEO_URL) ? styles.bannerVideo : styles.bannerImage}>
            {getWednesdayVideoEmbedUrl(WEDNESDAY_PRAYER_VIDEO_URL) ? (
              <iframe
                src={getWednesdayVideoEmbedUrl(WEDNESDAY_PRAYER_VIDEO_URL)}
                title="Wednesday Online Prayers"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <img src="/churchpraying.jpg" alt="Wednesday online prayers" />
            )}
          </div>
          <div className={styles.bannerContent}>
            <span className={styles.bannerBadge}>Midweek</span>
            <h2 className={styles.bannerTitle}>Wednesday Online Prayers</h2>
            <p className={styles.bannerText}>
              Join us every Wednesday for a time of corporate prayer and intercession. Connect online from wherever you are and experience the power of agreement in prayer.
            </p>
            <Link to="/services" className={styles.bannerCta}>Join Wednesday Prayers →</Link>
          </div>
        </section>
      </ScrollReveal>

      {/* Section 2: Friday Nights */}
      <ScrollReveal direction="right">
        <section className={`${styles.bannerSection} ${styles.reverse}`}>
          <div className={styles.bannerImage}>
            <img src="/praiseandworshipdancing.jpg" alt="Friday night service" />
          </div>
          <div className={styles.bannerContent}>
            <span className={styles.bannerBadge}>Weekly</span>
            <h2 className={styles.bannerTitle}>Friday Night Service</h2>
            <p className={styles.bannerText}>
              End your week in worship and the Word. Our Friday night gatherings are a time for refreshing, fellowship, and encountering God together.
            </p>
            <Link to="/services" className={styles.bannerCta}>View Times & Venue →</Link>
          </div>
        </section>
      </ScrollReveal>

      {/* Section 3: Sunday Worship */}
      <ScrollReveal direction="left">
        <section className={styles.bannerSection}>
          <div className={styles.bannerImage}>
            <img src="/preachinghour.jpg" alt="Sunday worship" />
          </div>
          <div className={styles.bannerContent}>
            <span className={styles.bannerBadge}>Sunday</span>
            <h2 className={styles.bannerTitle}>Sunday Worship & Word</h2>
            <p className={styles.bannerText}>
              Bible Study, SB1 Service, Word Manifest, and Discipleship—all in one place. Come as you are and experience a house of solutions, manifesting Christ.
            </p>
            <Link to="/services" className={styles.bannerCta}>Plan Your Visit →</Link>
          </div>
        </section>
      </ScrollReveal>

      {/* Section 4: Connect & Give */}
      <ScrollReveal direction="right">
        <section className={`${styles.bannerSection} ${styles.reverse}`}>
          <div className={styles.bannerImage}>
            <img src="/handstogether%20unity.jpg" alt="Connect and give" />
          </div>
          <div className={styles.bannerContent}>
            <span className={styles.bannerBadge}>Connect</span>
            <h2 className={styles.bannerTitle}>Connect With Us & Give</h2>
            <p className={styles.bannerText}>
              Stay connected through our online platforms. Your giving supports ministry, the building of our sanctuary, and outreach. Every gift makes a difference.
            </p>
            <Link to="/give" className={styles.bannerCta}>Give & Support →</Link>
            <Link to="/contact" className={`${styles.bannerCta} ${styles.outline}`} style={{ marginLeft: '0.75rem' }}>Contact Us</Link>
          </div>
        </section>
      </ScrollReveal>

      {/* Section 5: Bible Study */}
      <ScrollReveal direction="left">
        <section className={styles.bannerSection}>
          <div className={styles.bannerImage}>
            <img src="/biblestudysundaymorning.jpeg" alt="Bible study" />
          </div>
          <div className={styles.bannerContent}>
            <span className={styles.bannerBadge}>Sunday</span>
            <h2 className={styles.bannerTitle}>Bible Study</h2>
            <p className={styles.bannerText}>
              Grow in the Word every Sunday morning. Our Bible study is a time for digging deeper into Scripture and applying truth to daily life.
            </p>
            <Link to="/services" className={styles.bannerCta}>View Schedule →</Link>
          </div>
        </section>
      </ScrollReveal>

      {/* Section 6: From the Heart – Prayer */}
      <ScrollReveal direction="right">
        <section className={`${styles.bannerSection} ${styles.reverse}`}>
          <div className={styles.bannerImage}>
            <img src="/fromheartprayesr.jpg" alt="Prayer from the heart" />
          </div>
          <div className={styles.bannerContent}>
            <span className={styles.bannerBadge}>Prayer</span>
            <h2 className={styles.bannerTitle}>Prayer From the Heart</h2>
            <p className={styles.bannerText}>
              When we pray from the heart, God hears. Join a community that values genuine, Spirit-led prayer and intercession for one another and our nation.
            </p>
            <Link to="/services" className={styles.bannerCta}>Join in Prayer →</Link>
          </div>
        </section>
      </ScrollReveal>

      {/* Section 7: Men & Women in Prayer */}
      <ScrollReveal direction="left">
        <section className={styles.bannerSection}>
          <div className={styles.bannerImage}>
            <img src="/womanpraying.jpg" alt="Prayer and devotion" />
          </div>
          <div className={styles.bannerContent}>
            <span className={styles.bannerBadge}>Devotion</span>
            <h2 className={styles.bannerTitle}>Personal & Corporate Devotion</h2>
            <p className={styles.bannerText}>
              Whether alone or together, our church is built on a foundation of prayer. Find space for personal devotion and corporate prayer throughout the week.
            </p>
            <Link to="/services" className={styles.bannerCta}>Find a Service →</Link>
          </div>
        </section>
      </ScrollReveal>

      {/* Section 8: Mission & Outreach */}
      <ScrollReveal direction="right">
        <section className={`${styles.bannerSection} ${styles.reverse}`}>
          <div className={styles.bannerImage}>
            <img src="/latestoutreach.jpeg" alt="Outreach and mission" />
          </div>
          <div className={styles.bannerContent}>
            <span className={styles.bannerBadge}>Mission</span>
            <h2 className={styles.bannerTitle}>Mission & Outreach</h2>
            <p className={styles.bannerText}>
              We take the Gospel beyond our walls. Through outreach, evangelism, and community impact, we are manifesting Christ in Kitengela and beyond.
            </p>
            <Link to="/about" className={styles.bannerCta}>Our Mission →</Link>
          </div>
        </section>
      </ScrollReveal>

      {loading ? <div className={styles.loadingText}>Loading services...</div> : <ScrollReveal direction="left"><Services services={services} /></ScrollReveal>}
      <ScrollReveal direction="right"><CoreValues /></ScrollReveal>
      <Footer />
    </main>
  )
}
