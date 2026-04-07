'use client'

import { useEffect, useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollReveal from '@/components/ScrollReveal'
import { publicApi } from '@/lib/api'
import styles from './services.module.css'

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

export default function ServicesPage() {
  const [programs, setPrograms] = useState<Program[]>([])
  const [groupedPrograms, setGroupedPrograms] = useState<Record<string, Program[]>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await publicApi.getWeeklyPrograms()
        if (response.success && Array.isArray(response.data)) {
          const programs = response.data as Program[]
          setPrograms(programs)
          const grouped: Record<string, Program[]> = {}
          programs.forEach((program) => {
            if (!grouped[program.day]) {
              grouped[program.day] = []
            }
            grouped[program.day].push(program)
          })
          setGroupedPrograms(grouped)
        }
      } catch (error) {
        console.error('Error fetching programs:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPrograms()
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
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                          </svg>
                          <span>{program.startTime} - {program.endTime}</span>
                        </div>
                        <div className={styles.programVenue}>
                          <strong>Venue:</strong> {program.venue}
                        </div>
                        {program.description && (
                          <p className={styles.programDescription}>{program.description}</p>
                        )}
                        {program.contacts && (() => {
                          try {
                            const contacts = JSON.parse(program.contacts)
                            return contacts.length > 0 ? (
                              <div className={styles.programContacts}>
                                <strong>Contact:</strong>{' '}
                                {contacts.map((contact, idx) => (
                                  <a key={idx} href={`tel:${contact.replace(/\s/g, '')}`} className={styles.contactLink}>
                                    {contact}
                                  </a>
                                ))}
                              </div>
                            ) : null
                          } catch {
                            return null
                          }
                        })()}
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
