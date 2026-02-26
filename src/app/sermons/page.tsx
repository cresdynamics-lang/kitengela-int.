'use client'

import { useEffect, useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollReveal from '@/components/ScrollReveal'
import { publicApi } from '@/lib/api'
import styles from './sermons.module.css'

interface LiveStream {
  id: string
  isLive: boolean
  platform: 'youtube' | 'facebook' | 'googlemeet' | null
  youtubeLiveUrl: string | null
  facebookLiveUrl: string | null
  googleMeetUrl: string | null
  title: string | null
  scheduleTime: string | null
}

interface SermonSource {
  id: string
  youtubePlaylistUrl: string | null
  latestSermonUrl: string | null
}

interface Sermon {
  id: string
  title: string
  description: string | null
  speaker: string | null
  date: string
  videoUrl: string | null
  audioUrl: string | null
  thumbnailUrl: string | null
  duration: number | null
  views: number
}

export default function SermonsPage() {
  const [live, setLive] = useState<LiveStream | null>(null)
  const [sermonSource, setSermonSource] = useState<SermonSource | null>(null)
  const [sermons, setSermons] = useState<Sermon[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [liveRes, sermonRes, sermonsRes] = await Promise.all([
          publicApi.getLive(),
          publicApi.getSermonSource(),
          publicApi.getSermons(),
        ])

        if (liveRes.success && liveRes.data) {
          setLive(liveRes.data as LiveStream)
        }

        if (sermonRes.success && sermonRes.data) {
          setSermonSource(sermonRes.data as SermonSource)
        }

        if (sermonsRes.success && Array.isArray(sermonsRes.data)) {
          setSermons(sermonsRes.data as Sermon[])
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const liveStreamUrl = live
    ? (live.youtubeLiveUrl || live.facebookLiveUrl || live.googleMeetUrl || null)
    : null

  const getEmbedUrl = (url: string | null, platform: string | null) => {
    if (!url) return null
    
    if (platform === 'youtube' || url.includes('youtube.com') || url.includes('youtu.be')) {
      const videoId = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)?.[1]
      return videoId ? `https://www.youtube.com/embed/${videoId}` : null
    }
    
    if (platform === 'facebook' || url.includes('facebook.com')) {
      return url.replace('/videos/', '/embed/video/')
    }
    
    return url
  }

  return (
    <main>
      <Header />
      <div className={styles.container}>
        <ScrollReveal direction="left">
          <h1 className={styles.title}>Sermons & Live</h1>
          <p className={styles.subtitle}>Watch live services and browse our sermon library</p>
        </ScrollReveal>

        {loading ? (
          <div className={styles.loading}>Loading...</div>
        ) : (
          <>
            {live && live.isLive && (
              <ScrollReveal direction="right">
              <section className={styles.liveSection}>
                <div className={styles.liveBadge}>
                  <span className={styles.liveDot}></span>
                  LIVE NOW
                </div>
                <h2 className={styles.sectionTitle}>
                  {live.title || 'Live Service'}
                </h2>
                {live.scheduleTime && (
                  <p className={styles.scheduleTime}>
                    Scheduled: {new Date(live.scheduleTime).toLocaleString()}
                  </p>
                )}
                <div className={styles.embedContainer}>
                  {live.platform === 'youtube' && live.youtubeLiveUrl && (
                    <iframe
                      src={getEmbedUrl(live.youtubeLiveUrl, 'youtube') || ''}
                      className={styles.embed}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  )}
                  {live.platform === 'facebook' && live.facebookLiveUrl && (
                    <iframe
                      src={getEmbedUrl(live.facebookLiveUrl, 'facebook') || ''}
                      className={styles.embed}
                      allowFullScreen
                    />
                  )}
                </div>
              </section>
              </ScrollReveal>
            )}

            <ScrollReveal direction="left">
            <section className={styles.sermonsSection}>
              <h2 className={styles.sectionTitle}>Sermon Library</h2>
              {liveStreamUrl && (
                <a
                  href={liveStreamUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.liveStreamCta}
                >
                  Join Us Live
                </a>
              )}
              {sermons.length > 0 ? (
                <div className={styles.sermonsGrid}>
                  {sermons.map((sermon) => (
                    <div key={sermon.id} className={styles.sermonCard}>
                      {sermon.thumbnailUrl && (
                        <div className={styles.sermonThumbnail}>
                          <img src={sermon.thumbnailUrl} alt={sermon.title} />
                        </div>
                      )}
                      <div className={styles.sermonContent}>
                        <h3 className={styles.sermonTitle}>{sermon.title}</h3>
                        {sermon.speaker && (
                          <p className={styles.sermonSpeaker}>Speaker: {sermon.speaker}</p>
                        )}
                        <p className={styles.sermonDate}>
                          {new Date(sermon.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                        {sermon.description && (
                          <p className={styles.sermonDescription}>{sermon.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  {sermonSource?.latestSermonUrl && (
                    <div className={styles.latestSermon}>
                      <h3>Latest Sermon</h3>
                      <div className={styles.embedContainer}>
                        <iframe
                          src={getEmbedUrl(sermonSource.latestSermonUrl, 'youtube') || ''}
                          className={styles.embed}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    </div>
                  )}

                  {sermonSource?.youtubePlaylistUrl && (
                    <div className={styles.playlist}>
                      <h3>Full Playlist</h3>
                      <a
                        href={sermonSource.youtubePlaylistUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.playlistLink}
                      >
                        View All Sermons on YouTube →
                      </a>
                    </div>
                  )}

                  {!sermonSource?.latestSermonUrl && !sermonSource?.youtubePlaylistUrl && (
                    <div className={styles.empty}>
                      <p>Sermon library coming soon. Check back for updates!</p>
                    </div>
                  )}
                </>
              )}
            </section>
            </ScrollReveal>
          </>
        )}
      </div>
      <Footer />
    </main>
  )
}
