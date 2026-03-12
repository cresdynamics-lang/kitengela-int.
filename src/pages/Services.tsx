import { useEffect, useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollReveal from '@/components/ScrollReveal'
import { publicApi } from '@/lib/api'
import styles from './Services.module.css'

interface Program {
  id: string
  title: string
  day: string
  startTime: string
  endTime: string
  venue: string
  description: string | null
  contacts: string[]
}

export default function Services() {
  const [programs, setPrograms] = useState<Program[]>([])
  const [groupedPrograms, setGroupedPrograms] = useState<Record<string, Program[]>>({})
  const [loading, setLoading] = useState(true)
  const featuredCards = [
    {
      id: 'sunday',
      title: 'Sunday Worship Service',
      image: '/sundayservices.jpeg',
      description: 'Main Sunday celebration service with worship, Word, and ministry.',
      cta: 'Join Sunday Service',
    },
    {
      id: 'wednesday',
      title: 'Wednesday Online Prayers',
      image: '/midweekwednesday.jpeg',
      description: 'Midweek online prayer gathering to seek God together.',
      cta: 'Join Wednesday Prayers',
    },
    {
      id: 'friday',
      title: 'Friday Night Service',
      image: '/midweekservicefriday.jpeg',
      description: 'Friday night encounter in worship, intercession, and the Word.',
      cta: 'Join Friday Night',
    },
    {
      id: 'biblestudy',
      title: 'Sunday Bible Study',
      image: '/biblestudysundaymorning.jpeg',
      description: 'Grow deeper in Scripture before the main Sunday services.',
      cta: 'Join Bible Study',
    },
  ]

  useEffect(() => {
    publicApi.getWeeklyPrograms().then((response) => {
      if (response.success && Array.isArray(response.data)) {
        const programs = response.data as Program[]
        setPrograms(programs)
        const grouped: Record<string, Program[]> = {}
        programs.forEach((p) => {
          if (!grouped[p.day]) grouped[p.day] = []
          grouped[p.day].push(p)
        })
        setGroupedPrograms(grouped)
      }
    }).finally(() => setLoading(false))
  }, [])

  const daysOrder = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  return (
    <main>
      <Header />
      <div className={styles.container}>
        <ScrollReveal direction="left">
          <h1 className={styles.title}>Our Services & Programs</h1>
          <p className={styles.subtitle}>Join us for worship, prayer, and fellowship throughout the week</p>
        </ScrollReveal>
        <ScrollReveal direction="right">
          <div className={styles.featuredGrid}>
            {featuredCards.map((card) => (
              <div key={card.id} className={styles.featuredCard}>
                <div className={styles.featuredImageWrap}>
                  <img src={card.image} alt={card.title} className={styles.featuredImage} />
                </div>
                <div className={styles.featuredContent}>
                  <h2 className={styles.featuredTitle}>{card.title}</h2>
                  <p className={styles.featuredDescription}>{card.description}</p>
                  <a href="/services" className={styles.featuredButton}>{card.cta}</a>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
        {loading ? (
          <div className={styles.loading}>Loading...</div>
        ) : (
          <ScrollReveal direction="right">
            <div className={styles.programsContainer}>
              {daysOrder.map((day) => {
                const dayPrograms = groupedPrograms[day] || []
                if (dayPrograms.length === 0) return null
                return (
                  <div key={day} className={styles.daySection}>
                    <h2 className={styles.dayTitle}>{day}</h2>
                    <div className={styles.programsGrid}>
                      {dayPrograms.map((program) => (
                        <div key={program.id} className={styles.programCard}>
                          <h3 className={styles.programTitle}>{program.title}</h3>
                          <div className={styles.programTime}>
                            <span>{program.startTime} - {program.endTime}</span>
                          </div>
                          <div className={styles.programVenue}><strong>Venue:</strong> {program.venue}</div>
                          {program.description && <p className={styles.programDescription}>{program.description}</p>}
                          {program.contacts?.length > 0 && (
                            <div className={styles.programContacts}>
                              <strong>Contact:</strong>{' '}
                              {program.contacts.map((contact, idx) => (
                                <a key={idx} href={`tel:${contact.replace(/\s/g, '')}`} className={styles.contactLink}>{contact}</a>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </ScrollReveal>
        )}
      </div>
      <Footer />
    </main>
  )
}
