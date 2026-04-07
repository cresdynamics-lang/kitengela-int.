import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Music, Users, Clock, ExternalLink } from 'lucide-react';

interface PrayerSessionProps {
  id: string;
  title: string;
  description?: string;
  isLive: boolean;
  status: 'scheduled' | 'active' | 'completed';
  joinUrl?: string;
  audioUrl?: string;
  participantCount: number;
  startedAt?: string;
  endedAt?: string;
}

export function PrayerSession({
  title,
  description,
  isLive,
  status,
  joinUrl,
  audioUrl,
  participantCount,
  startedAt,
}: PrayerSessionProps) {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  const getStatusColor = () => {
    if (isLive) return 'bg-red-600';
    if (status === 'scheduled') return 'bg-blue-600';
    return 'bg-gray-600';
  };

  const getStatusText = () => {
    if (isLive) return 'LIVE NOW';
    if (status === 'scheduled') return 'UPCOMING';
    return 'COMPLETED';
  };

  return (
    <motion.div
      className="card p-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      {/* Status Badge */}
      <div className="mb-4 flex items-center justify-between">
        <div className={`${getStatusColor()} text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-2`}>
          {isLive && <div className="w-2 h-2 bg-white rounded-full animate-pulse" />}
          {getStatusText()}
        </div>
      </div>

      {/* Title */}
      <h3 className="text-2xl font-poppins font-bold text-gray-900 mb-2">{title}</h3>
      {description && <p className="text-gray-600 mb-4">{description}</p>}

      {/* Info Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-center gap-2 text-gray-700">
          <Users size={18} className="text-primary-500" />
          <div>
            <p className="text-sm text-gray-600">Participants</p>
            <p className="text-lg font-bold">{participantCount}</p>
          </div>
        </div>

        {isLive && startedAt && (
          <div className="flex items-center gap-2 text-gray-700">
            <Clock size={18} className="text-primary-500" />
            <div>
              <p className="text-sm text-gray-600">Duration</p>
              <p className="text-lg font-bold">{Math.floor(elapsedTime / 60)}m</p>
            </div>
          </div>
        )}
      </div>

      {/* Audio Player */}
      {audioUrl && (
        <div className="mb-6 p-4 bg-primary-50 rounded-lg">
          <div className="flex items-center gap-3">
            <Music size={24} className="text-primary-500" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900">Worship Music</p>
              <input
                type="range"
                min="0"
                max="100"
                defaultValue="30"
                className="w-full mt-2 cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}

      {/* CTA Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {joinUrl && (
          <motion.a
            href={joinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-center justify-center"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ExternalLink size={18} />
            Join Prayer
          </motion.a>
        )}

        {audioUrl && (
          <motion.button
            onClick={() => setIsAudioPlaying(!isAudioPlaying)}
            className="btn-secondary text-center justify-center"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Music size={18} />
            {isAudioPlaying ? 'Stop' : 'Play'} Music
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
