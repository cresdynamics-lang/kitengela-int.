'use client'

import { useEffect, useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollReveal from '@/components/ScrollReveal'
import CoreValues from '@/components/CoreValues'
import { publicApi } from '@/lib/api'
import styles from './about.module.css'

interface SiteInfo {
  churchName?: string
  mission?: string
  vision?: string
  history?: string
  location?: {
    city: string
    address: string
  }
}

const FALLBACK_SITE: SiteInfo = {
  churchName: 'VOSH Church International Kitengela',
  mission: 'To manifest Christ and be a house of solutions for our community.',
  vision: 'Building a community of believers who walk in holiness, unity, and purpose.',
  history: 'VOSH Church International Kitengela is a vibrant community of believers committed to manifesting Christ in our daily lives. We are dedicated to prayer, stewardship, holiness, advocacy, and unity.',
  location: {
    city: 'Kitengela',
    address: 'Along Baraka Road / Treewa Road, Next to Balozi Junior Academy'
  }
}

export default function AboutPage() {
  const [siteInfo, setSiteInfo] = useState<SiteInfo>(FALLBACK_SITE)

  useEffect(() => {
    let cancelled = false
    const fetchSiteInfo = async () => {
      try {
        const res = await publicApi.getSite()
        if (cancelled) return
        if (res.success && res.data) {
          const d = res.data as { churchName?: string; locationText?: string }
          setSiteInfo({
            ...FALLBACK_SITE,
            churchName: d.churchName ?? FALLBACK_SITE.churchName,
            location: {
              city: 'Kitengela',
              address: d.locationText || FALLBACK_SITE.location?.address || ''
            }
          })
        }
      } catch (error) {
        if (!cancelled) console.error('Error fetching site info:', error)
      }
    }
    fetchSiteInfo()
    return () => { cancelled = true }
  }, [])

  return (
    <main>
      <Header />
      <div className={styles.container}>
        <div className={styles.hero}>
          <h1 className={styles.title}>About Us</h1>
          <p className={styles.subtitle}>
            {siteInfo?.churchName || "Voice Of Salvation And Healing Church Int'l – Kitengela"}
          </p>
        </div>

        <>
            <ScrollReveal direction="left">
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Our Mission</h2>
              <p className={styles.text}>
                {siteInfo?.mission || 'To manifest Christ and be a house of solutions for our community. We are committed to raising, equipping, and releasing Kingdom-minded leaders who will impact generations by living out the uncompromised truth of the Gospel.'}
              </p>
            </section>
            </ScrollReveal>

            <ScrollReveal direction="right">
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Our Vision</h2>
              <p className={styles.text}>
                {siteInfo?.vision || 'To raise, equip, and release Kingdom-minded leaders who will impact generations by living out the uncompromised truth of the Gospel. Building a community of believers who walk in holiness, unity, and purpose.'}
              </p>
            </section>
            </ScrollReveal>

            <ScrollReveal direction="left">
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Our History</h2>
              <p className={styles.text}>
                Voice Of Salvation And Healing Church Int'l is a vibrant ministry committed to spreading the pure and unadulterated Gospel of Jesus Christ. The Kitengela branch is part of this wider ministry, serving the Kitengela community and beyond.
              </p>
              <p className={styles.text}>
                Under the leadership of Rev. Evans O. Kochoo, fondly known as "The Eagle," the Kitengela branch is dedicated to disseminating the Gospel through in-depth teachings that ignite zeal, inspire purpose, and transform lives.
              </p>
              <p className={styles.text}>
                Our ministry spans diverse platforms, shaping individuals, leaders, and communities with the uncompromising truth of God's Word. We are committed to maintaining doctrinal and brand alignment with the main Voice Of Salvation And Healing Church Int'l while clearly representing our Kitengela branch identity.
              </p>
            </section>
            </ScrollReveal>

            <ScrollReveal direction="right">
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>How Kitengela Branch Fits Into the Larger Ministry</h2>
              <p className={styles.text}>
                The Kitengela branch is an integral part of the Voice Of Salvation And Healing Church Int'l ministry. We maintain:
              </p>
              <ul className={styles.list}>
                <li><strong>Doctrinal Alignment:</strong> We uphold the same biblical foundations and teachings as the main church</li>
                <li><strong>Brand Consistency:</strong> We represent the Voice Of Salvation And Healing Church Int'l identity while serving our local community</li>
                <li><strong>Ministry Extension:</strong> Our website and services extend the ministry beyond physical gatherings, enabling continuous prayer, worship, and teaching</li>
                <li><strong>Unified Mission:</strong> We share the same vision to raise, equip, and release Kingdom-minded leaders who will impact generations</li>
              </ul>
            </section>
            </ScrollReveal>

            <ScrollReveal direction="left">
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Statement of Faith</h2>
              <p className={styles.text}>
                We believe in:
              </p>
              <ul className={styles.list}>
                <li>The Holy Bible as the inspired, infallible, and authoritative Word of God</li>
                <li>One God, eternally existent in three persons: Father, Son, and Holy Spirit</li>
                <li>The deity of our Lord Jesus Christ, His virgin birth, sinless life, miracles, atoning death, bodily resurrection, and ascension</li>
                <li>The salvation of lost and sinful humanity through faith in Jesus Christ alone</li>
                <li>The present ministry of the Holy Spirit, who indwells and empowers believers</li>
                <li>The resurrection of both the saved and the lost: the saved to eternal life, the lost to eternal separation from God</li>
                <li>The spiritual unity of believers in our Lord Jesus Christ</li>
                <li>The Great Commission to make disciples of all nations</li>
              </ul>
            </section>
            </ScrollReveal>

            <ScrollReveal direction="right">
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Our Leadership</h2>
              <p className={styles.text}>
                VOSH Church International Kitengela is led by <strong>Rev. Evans O. Kochoo</strong>, a passionate servant of God driven by a dynamic apostolic mandate. Known as "The Eagle," Rev. Kochoo is committed to raising, equipping, and releasing Kingdom-minded leaders who will impact generations.
              </p>
              <p className={styles.text}>
                <a href="/leadership/evans-kochoo" className={styles.leaderLink}>
                  Learn more about Rev. Evans O. Kochoo →
                </a>
              </p>
            </section>
            </ScrollReveal>

            <ScrollReveal direction="left">
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Location</h2>
              <p className={styles.text}>
                <strong>City:</strong> {siteInfo?.location?.city || 'Kitengela'}
              </p>
              <p className={styles.text}>
                <strong>Address:</strong> {siteInfo?.location?.address || 'Along Baraka Road / Treewa Road, Next to Balozi Junior Academy'}
              </p>
            </section>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <CoreValues />
            </ScrollReveal>
        </>
      </div>
      <Footer />
    </main>
  )
}
