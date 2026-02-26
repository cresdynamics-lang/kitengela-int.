'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './Header.module.css'
import { publicApi } from '@/lib/api'

export default function Header() {
  const [isLive, setIsLive] = useState(false)
  const [liveStreamUrl, setLiveStreamUrl] = useState<string | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const fetchLiveData = async () => {
      try {
        const response = await publicApi.getLive()
        if (response.success && response.data) {
          const data = response.data as { 
            isLive?: boolean
            youtubeLiveUrl?: string | null
            facebookLiveUrl?: string | null
            googleMeetUrl?: string | null
          }
          setIsLive(data.isLive || false)
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

    fetchLiveData()
    const interval = setInterval(fetchLiveData, 30000)
    return () => clearInterval(interval)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <>
      {isMenuOpen && (
        <div 
          className={styles.overlay}
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.logoContainer}>
            <Link href="/" className={styles.logoLink} onClick={closeMenu}>
              <Image
                src="/logo/chuurchlogo.jpeg"
                alt="VOSH Church Logo"
                width={80}
                height={80}
                className={styles.logo}
                priority
              />
              <div className={styles.logoText}>
                <h1 className={styles.churchName}>Voice Of Salvation And Healing Church Int&apos;l</h1>
                <p className={styles.location}>KITENGELA</p>
              </div>
            </Link>
          </div>
          
          <div className={styles.mobileActions}>
            {/* Red "Join Us Live" button - visible on small screens, left of hamburger */}
            <a
              href={liveStreamUrl || '/sermons'}
              target={liveStreamUrl ? '_blank' : undefined}
              rel={liveStreamUrl ? 'noopener noreferrer' : undefined}
              className={styles.joinUsLiveButton}
            >
              {isLive && <span className={styles.liveDot}></span>}
              Join Us Live
            </a>
            <button 
              className={`${styles.hamburger} ${isMenuOpen ? styles.hamburgerOpen : ''}`}
              onClick={toggleMenu}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <span className={styles.hamburgerLine}></span>
              <span className={styles.hamburgerLine}></span>
              <span className={styles.hamburgerLine}></span>
            </button>
          </div>

          <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
            <Link href="/" className={styles.navLink} onClick={closeMenu}>Home</Link>
            <Link href="/about" className={styles.navLink} onClick={closeMenu}>About</Link>
            <Link href="/services" className={styles.navLink} onClick={closeMenu}>Services</Link>
            <Link href="/leadership" className={styles.navLink} onClick={closeMenu}>Leadership</Link>
            <Link href="/sermons" className={styles.navLink} onClick={closeMenu}>Sermons</Link>
            <Link href="/give" className={styles.navLink} onClick={closeMenu}>Give</Link>
            <Link href="/contact" className={styles.navLink} onClick={closeMenu}>Contact</Link>
            {liveStreamUrl ? (
              <a href={liveStreamUrl} target="_blank" rel="noopener noreferrer" className={styles.liveButton} onClick={closeMenu}>
                {isLive && <span className={styles.liveDot}></span>}
                LIVE STREAM
              </a>
            ) : (
              <Link href="/sermons" className={styles.liveButton} onClick={closeMenu}>
                {isLive && <span className={styles.liveDot}></span>}
                LIVE STREAM
              </Link>
            )}
          </nav>
        </div>
      </header>
    </>
  )
}
