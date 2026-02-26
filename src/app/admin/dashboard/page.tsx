'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Programs from '@/components/admin/Programs'
import MassSermons from '@/components/admin/MassSermons'
import WeeklyMasses from '@/components/admin/WeeklyMasses'
import UpdateLinks from '@/components/admin/UpdateLinks'
import AdminRights from '@/components/admin/AdminRights'
import LiveStreamAdmin from '@/components/admin/LiveStream'
import styles from './dashboard.module.css'

export default function AdminDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('sermons')
  const [admin, setAdmin] = useState<any>(null)

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    const adminData = localStorage.getItem('admin')
    
    if (!token || !adminData) {
      router.push('/admin/login')
      return
    }

    setAdmin(JSON.parse(adminData))
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('admin')
    router.push('/admin/login')
  }

  if (!admin) {
    return <div className={styles.loading}>Loading...</div>
  }

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1>Admin Dashboard</h1>
          <div className={styles.userInfo}>
            <span>Welcome, {admin.username}</span>
            <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>
          </div>
        </div>
      </header>

      <nav className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'programs' ? styles.active : ''}`}
          onClick={() => setActiveTab('programs')}
        >
          Programs
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'events' ? styles.active : ''}`}
          onClick={() => setActiveTab('events')}
        >
          Events
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'live' ? styles.active : ''}`}
          onClick={() => setActiveTab('live')}
        >
          Live Stream
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'sermons' ? styles.active : ''}`}
          onClick={() => setActiveTab('sermons')}
        >
          Sermons
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'links' ? styles.active : ''}`}
          onClick={() => setActiveTab('links')}
        >
          Links
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'admins' ? styles.active : ''}`}
          onClick={() => setActiveTab('admins')}
        >
          Admin Rights
        </button>
      </nav>

      <main className={styles.content}>
        {activeTab === 'programs' && <Programs />}
        {activeTab === 'events' && <div>Events management coming soon</div>}
        {activeTab === 'live' && <LiveStreamAdmin />}
        {activeTab === 'sermons' && <MassSermons />}
        {activeTab === 'links' && <UpdateLinks />}
        {activeTab === 'admins' && <AdminRights />}
      </main>
    </div>
  )
}
