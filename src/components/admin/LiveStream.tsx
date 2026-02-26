'use client'

import { useState, useEffect } from 'react'
import styles from './admin.module.css'
import { adminApi } from '@/lib/api'

interface LiveStream {
  id: string
  youtubeLiveUrl: string | null
  facebookLiveUrl: string | null
  googleMeetUrl: string | null
}

function detectPlatformFromUrl(url: string): 'youtube' | 'facebook' | 'googlemeet' | '' {
  const u = url.trim().toLowerCase()
  if (!u) return ''
  if (u.includes('youtube.com') || u.includes('youtu.be')) return 'youtube'
  if (u.includes('facebook.com') || u.includes('fb.watch') || u.includes('fb.com')) return 'facebook'
  if (u.includes('meet.google.com')) return 'googlemeet'
  return ''
}

export default function LiveStreamAdmin() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [liveStreamLink, setLiveStreamLink] = useState('')

  useEffect(() => {
    fetchLiveStream()
  }, [])

  const fetchLiveStream = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      if (!token) return

      const response = await adminApi.getLive(token)
      if (response.success && response.data) {
        const data = response.data as LiveStream
        const link = data.youtubeLiveUrl || data.facebookLiveUrl || data.googleMeetUrl || ''
        setLiveStreamLink(link)
      }
    } catch (error) {
      console.error('Error fetching live stream:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const token = localStorage.getItem('adminToken')
    if (!token) return

    setSaving(true)
    try {
      const link = liveStreamLink.trim()
      const platform = link ? detectPlatformFromUrl(link) : ''
      const submitData = {
        isLive: !!link,
        platform: platform || null,
        youtubeLiveUrl: platform === 'youtube' && link ? link : null,
        facebookLiveUrl: platform === 'facebook' && link ? link : null,
        googleMeetUrl: platform === 'googlemeet' && link ? link : null,
        title: null,
        scheduleTime: null,
      }

      await adminApi.updateLive(token, submitData)
      alert('Live stream link saved.')
      fetchLiveStream()
    } catch (error: any) {
      alert(error.response?.data?.error || 'Error saving live stream link')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className={styles.loading}>Loading...</div>

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Live Stream</h2>
        <p className={styles.subtitle}>
          Set the link used by all &quot;Join Us Live&quot; buttons. Leave empty to send visitors to the Sermons page.
        </p>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label>Live stream link</label>
          <input
            type="url"
            value={liveStreamLink}
            onChange={(e) => setLiveStreamLink(e.target.value)}
            placeholder="Paste YouTube, Facebook, or Google Meet link"
            className={styles.liveStreamLinkInput}
          />
        </div>
        <div className={styles.formActions}>
          <button type="submit" className={styles.saveButton} disabled={saving}>
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  )
}
