'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import styles from './dashboard.module.css'

export default function Dashboard() {
  const [stats, setStats] = useState({
    services: 0,
    events: 0,
    members: 0,
    visitors: 0
  })

  useEffect(() => {
    // Simulate fetching dashboard stats
    setStats({
      services: 7,
      events: 12,
      members: 0,
      visitors: 0
    })
  }, [])

  return (
    <div className={styles.dashboard}>
      <div className={styles.container}>
        <h1 className={styles.title}>Dashboard</h1>
        <p className={styles.subtitle}>Welcome to VOSH Church Kitengela Admin Dashboard</p>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>📅</div>
            <div className={styles.statContent}>
              <h3 className={styles.statValue}>{stats.services}</h3>
              <p className={styles.statLabel}>Services</p>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>🎉</div>
            <div className={styles.statContent}>
              <h3 className={styles.statValue}>{stats.events}</h3>
              <p className={styles.statLabel}>Events</p>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>👥</div>
            <div className={styles.statContent}>
              <h3 className={styles.statValue}>{stats.members}</h3>
              <p className={styles.statLabel}>Members</p>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>👀</div>
            <div className={styles.statContent}>
              <h3 className={styles.statValue}>{stats.visitors}</h3>
              <p className={styles.statLabel}>Visitors</p>
            </div>
          </div>
        </div>

        <div className={styles.quickActions}>
          <h2 className={styles.sectionTitle}>Quick Actions</h2>
          <div className={styles.actionsGrid}>
            <Link href="/dashboard/services" className={styles.actionCard}>
              <div className={styles.actionIcon}>📋</div>
              <h3>Manage Services</h3>
              <p>Add, edit, or remove church services</p>
            </Link>

            <Link href="/dashboard/events" className={styles.actionCard}>
              <div className={styles.actionIcon}>📅</div>
              <h3>Manage Events</h3>
              <p>Create and manage church events</p>
            </Link>

            <Link href="/dashboard/members" className={styles.actionCard}>
              <div className={styles.actionIcon}>👥</div>
              <h3>Manage Members</h3>
              <p>View and manage church members</p>
            </Link>

            <Link href="/dashboard/sermons" className={styles.actionCard}>
              <div className={styles.actionIcon}>📖</div>
              <h3>Manage Sermons</h3>
              <p>Upload and manage sermon recordings</p>
            </Link>

            <Link href="/dashboard/prayer-requests" className={styles.actionCard}>
              <div className={styles.actionIcon}>🙏</div>
              <h3>Prayer Requests</h3>
              <p>View and manage prayer requests</p>
            </Link>

            <Link href="/dashboard/settings" className={styles.actionCard}>
              <div className={styles.actionIcon}>⚙️</div>
              <h3>Settings</h3>
              <p>Configure church settings</p>
            </Link>
          </div>
        </div>

        <div className={styles.backLink}>
          <Link href="/" className={styles.backButton}>
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
