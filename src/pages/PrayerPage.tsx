import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Music, Clock } from 'lucide-react';
import { PrayerSession } from '../components/PrayerSession';

export function PrayerPage() {
  const [prayers, setPrayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPrayers();
  }, []);

  const fetchPrayers = async () => {
    try {
      const response = await fetch('/api/public/prayers');
      const data = await response.json();
      setPrayers(data);
    } catch (error) {
      console.error('Error fetching prayers:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div
        className="hero-section"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1585519954335-f1e80c08f41b?w=1600&h=900&fit=crop)',
        }}
      >
        <div className="hero-overlay" />
        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="section-title">Prayer & Intercession</h1>
            <p className="section-subtitle">
              Join us in powerful prayer and intimacy with God
            </p>
          </motion.div>
        </div>
      </div>

      {/* Prayer Philosophy */}
      <section className="section-container bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-poppins font-bold text-gray-900 mb-6">
              The Power of Prayer
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              Prayer is the heartbeat of our church. We believe in the transformative
              power of intercession and corporate prayer to impact lives, heal families,
              and advance God's kingdom.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              Whether you're facing a personal challenge or want to stand with your
              church community, our prayer sessions offer a space for spiritual intimacy
              and divine encounter.
            </p>

            {/* Prayer Times */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900">Regular Prayer Times</h3>
              <div className="flex items-start gap-3">
                <Clock className="text-accent-500 mt-1 flex-shrink-0" size={24} />
                <div>
                  <p className="font-semibold text-gray-900">Daily Prayers</p>
                  <p className="text-gray-600">6:00 AM - 7:00 AM</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="text-accent-500 mt-1 flex-shrink-0" size={24} />
                <div>
                  <p className="font-semibold text-gray-900">Wednesday Night Prayer</p>
                  <p className="text-gray-600">8:00 PM - 9:30 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="text-accent-500 mt-1 flex-shrink-0" size={24} />
                <div>
                  <p className="font-semibold text-gray-900">Friday Healing Prayer</p>
                  <p className="text-gray-600">8:00 PM - 9:30 PM</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.img
            src="https://images.unsplash.com/photo-1520763185298-1b434c919abe?w=600&h=400&fit=crop"
            alt="Prayer"
            className="rounded-xl shadow-lg"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          />
        </div>
      </section>

      {/* Active Prayer Sessions */}
      <section className="section-container bg-gray-50">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-poppins font-bold text-gray-900 mb-4">
            Join a Prayer Session
          </h2>
          <p className="text-xl text-gray-600">
            Experience the power of corporate prayer
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center py-8">Loading prayer sessions...</div>
        ) : prayers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {prayers.map((prayer: any) => (
              <PrayerSession key={prayer.id} {...prayer} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              No active prayer sessions at the moment.
            </p>
            <p className="text-gray-500 mt-2">
              Check back soon or contact us about upcoming prayer meetings.
            </p>
          </div>
        )}
      </section>

      {/* How to Join */}
      <section className="section-container bg-white">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-poppins font-bold text-gray-900 mb-6">
            How to Join
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              step: '1',
              title: 'Select a Prayer Session',
              description: 'Choose from our upcoming prayer sessions and times that work for you.',
            },
            {
              step: '2',
              title: 'Join the Meeting',
              description:
                'Click the "Join Prayer" button to enter the Zoom or Google Meet session.',
            },
            {
              step: '3',
              title: 'Pray Together',
              description:
                'Participate in prayer, intercession, and worship with our community.',
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 rounded-full bg-accent-500 text-white font-bold flex items-center justify-center mx-auto mb-4 text-lg">
                {item.step}
              </div>
              <h3 className="text-xl font-poppins font-bold text-gray-900 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Submit Prayer Request */}
      <section className="bg-gradient-to-r from-primary-900 to-primary-700 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-poppins font-bold text-white mb-6">
              Have a Prayer Request?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Share your prayer needs with our prayer team
            </p>
          </motion.div>

          <motion.form
            className="max-w-2xl mx-auto space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500"
            />
            <textarea
              placeholder="Your Prayer Request"
              rows={4}
              className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500"
            />
            <motion.button
              type="submit"
              className="w-full btn-primary text-center justify-center"
              whileHover={{ scale: 1.02 }}
            >
              Submit Prayer Request
            </motion.button>
          </motion.form>
        </div>
      </section>
    </div>
  );
}
