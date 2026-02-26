'use client'

import styles from './Services.module.css'

interface Service {
  id: number
  name: string
  time: string
  day: string
  description: string
  speaker?: string
  host?: string
  platform?: string
}

interface ServicesProps {
  services: Service[]
}

export default function Services({ services }: ServicesProps) {
  if (!services || services.length === 0) {
    return (
      <section className={styles.servicesSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Our Services</h2>
          <p className={styles.sectionSubtitle}>Join us for worship, prayer, and fellowship</p>
          <div className={styles.emptyState}>
            <p>Service information will be displayed here. Check back soon!</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className={styles.servicesSection}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Our Services</h2>
        <p className={styles.sectionSubtitle}>Join us for worship, prayer, and fellowship</p>
        
        <div className={styles.servicesGrid}>
          {services.map((service) => (
            <div key={service.id} className={styles.serviceCard}>
              <div className={styles.serviceHeader}>
                <h3 className={styles.serviceName}>{service.name}</h3>
                <span className={styles.serviceDay}>{service.day}</span>
              </div>
              <div className={styles.serviceTime}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <span>{service.time}</span>
              </div>
              <p className={styles.serviceDescription}>{service.description}</p>
              {service.speaker && (
                <div className={styles.serviceMeta}>
                  <strong>Speaker:</strong> {service.speaker}
                </div>
              )}
              {service.host && (
                <div className={styles.serviceMeta}>
                  <strong>Host:</strong> {service.host}
                </div>
              )}
              {service.platform && (
                <div className={styles.serviceMeta}>
                  <strong>Platform:</strong> {service.platform}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
