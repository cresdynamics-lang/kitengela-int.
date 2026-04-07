import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, MapPin, Clock } from 'lucide-react';

interface LiveServiceCardProps {
  id: string;
  title: string;
  description?: string;
  isLive: boolean;
  platform: string;
  youtubeUrl?: string;
  facebookUrl?: string;
  googleMeetUrl?: string;
  zoomUrl?: string;
  thumbnailUrl?: string;
  scheduledAt?: string;
}

export function LiveServiceCard({
  title,
  description,
  isLive,
  platform,
  youtubeUrl,
  facebookUrl,
  googleMeetUrl,
  zoomUrl,
  thumbnailUrl,
  scheduledAt,
}: LiveServiceCardProps) {
  const [timeRemaining, setTimeRemaining] = useState('');

  useEffect(() => {
    if (!scheduledAt) return;

    const updateTimer = () => {
      const now = new Date();
      const scheduled = new Date(scheduledAt);
      const diff = scheduled.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeRemaining('Starting soon...');
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      setTimeRemaining(`${hours}h ${minutes}m`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 60000);
    return () => clearInterval(interval);
  }, [scheduledAt]);

  const getJoinUrl = () => {
    if (platform === 'youtube' && youtubeUrl) return youtubeUrl;
    if (platform === 'facebook' && facebookUrl) return facebookUrl;
    if (platform === 'googlemeet' && googleMeetUrl) return googleMeetUrl;
    if (platform === 'zoom' && zoomUrl) return zoomUrl;
    return '#';
  };

  return (
    <motion.div
      className="card overflow-hidden card-hover"
      whileHover={{ y: -5 }}
    >
      {/* Thumbnail */}
      {thumbnailUrl && (
        <div className="relative h-48 bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden">
          <img
            src={thumbnailUrl}
            alt={title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {isLive && (
            <div className="absolute top-4 left-4">
              <div className="flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                <span className="text-sm font-semibold">LIVE</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        <h3 className="text-2xl font-poppins font-bold text-gray-900 mb-2">{title}</h3>
        {description && (
          <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
        )}

        {/* Info */}
        <div className="space-y-2 mb-4 text-sm text-gray-600">
          {scheduledAt && !isLive && (
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>Starts in: {timeRemaining}</span>
            </div>
          )}
          <div className="flex items-center gap-2 capitalize">
            <MapPin size={16} />
            <span>{platform}</span>
          </div>
        </div>

        {/* CTA Button */}
        <motion.a
          href={getJoinUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary w-full text-center justify-center"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Play size={18} />
          {isLive ? 'Watch Live' : 'Set Reminder'}
        </motion.a>
      </div>
    </motion.div>
  );
}
