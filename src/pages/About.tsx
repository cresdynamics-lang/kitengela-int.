import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollReveal from '@/components/ScrollReveal'
import CoreValues from '@/components/CoreValues'
import { publicApi } from '@/lib/api'
import styles from './About.module.css'

const FALLBACK = {
  churchName: 'VOSH Church International Kitengela',
  mission: 'To manifest Christ and be a house of solutions for our community.',
  vision: 'Building a community of believers who walk in holiness, unity, and purpose.',
  location: { city: 'Kitengela', address: 'Along Baraka Road / Treewa Road, Next to Balozi Junior Academy' }
}

export default function About() {
  const [siteInfo, setSiteInfo] = useState(FALLBACK)

  useEffect(() => {
    publicApi.getSite().then((res) => {
      if (res.success && res.data) {
        const d = res.data as any
        setSiteInfo({
          ...FALLBACK,
          churchName: d.churchName ?? FALLBACK.churchName,
          location: { city: 'Kitengela', address: d.locationText || FALLBACK.location.address }
        })
      }
    }).catch(() => {})
  }, [])

  return (
    <main>
      <Header />
      <div className={styles.container}>
        <div className={styles.hero}>
          <h1 className={styles.title}>About Us</h1>
          <p className={styles.subtitle}>{siteInfo.churchName}</p>
        </div>
        <ScrollReveal direction="left">
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Our Mission</h2>
            <p className={styles.text}>{siteInfo.mission}</p>
          </section>
        </ScrollReveal>
        <ScrollReveal direction="right">
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Our Vision</h2>
            <p className={styles.text}>{siteInfo.vision}</p>
          </section>
        </ScrollReveal>
        <ScrollReveal direction="left">
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Our Leadership</h2>
            <p className={styles.text}>
              VOSH Church International Kitengela is led by <strong>Rev. Evans O. Kochoo</strong> ("The Eagle").
            </p>
            <p className={styles.text}>
              <Link to="/leadership/evans-kochoo" className={styles.leaderLink}>Learn more about Rev. Evans O. Kochoo →</Link>
            </p>
          </section>
        </ScrollReveal>
        <ScrollReveal direction="right">
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Location</h2>
            <p className={styles.text}><strong>Address:</strong> {siteInfo.location.address}</p>
          </section>
        </ScrollReveal>
        <ScrollReveal direction="left"><CoreValues /></ScrollReveal>
      </div>
      <Footer />
    </main>
  )
}
