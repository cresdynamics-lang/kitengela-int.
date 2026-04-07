import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, BookOpen, Lightbulb } from 'lucide-react';
import { FeatureSection } from '../components/FeatureSection';

export function AboutPage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <div
        className="hero-section"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1529722792682-f2eea8d15fca?w=1600&h=900&fit=crop)',
        }}
      >
        <div className="hero-overlay" />
        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="section-title">About Our Church</h1>
            <p className="section-subtitle">
              Our story of faith, growth, and community impact
            </p>
          </motion.div>
        </div>
      </div>

      {/* Our Story */}
      <section className="section-container bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <img
              src="https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=600&h=400&fit=crop"
              alt="Our Community"
              className="rounded-xl shadow-lg"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-poppins font-bold text-gray-900 mb-6">
              Our Story
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              Founded with a vision to build a faith community rooted in God's Word,
              Kitengela International Church has grown to become a beacon of hope
              and spiritual transformation in our community.
            </p>
            <p className="text-lg text-gray-600 mb-4">
              What started as a small gathering of believers has evolved into a thriving
              ministry touching lives, strengthening families, and advancing God's kingdom
              through prayer, teaching, and community outreach.
            </p>
            <p className="text-lg text-gray-600">
              Today, we remain committed to our core mission: to glorify God, grow disciples,
              and demonstrate the love of Christ in everything we do.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Core Values */}
      <FeatureSection
        title="Our Core Values"
        description="Principles that guide our ministry and community"
        features={[
          {
            icon: <BookOpen className="text-accent-500" size={32} />,
            title: 'Biblical Teaching',
            description:
              'We are committed to the faithful teaching of God\'s Word as the foundation of all we do.',
          },
          {
            icon: <Heart className="text-accent-500" size={32} />,
            title: 'Compassion',
            description:
              'We serve our community with genuine love and concern for all people.',
          },
          {
            icon: <Users className="text-accent-500" size={32} />,
            title: 'Community',
            description:
              'We believe in the power of fellowship and mutual support in our faith journey.',
          },
          {
            icon: <Lightbulb className="text-accent-500" size={32} />,
            title: 'Innovation',
            description:
              'We embrace modern approaches while staying true to timeless biblical principles.',
          },
          {
            icon: <Heart className="text-accent-500" size={32} />,
            title: 'Service',
            description:
              'We serve others selflessly, following the example of Christ.',
          },
          {
            icon: <Users className="text-accent-500" size={32} />,
            title: 'Discipleship',
            description:
              'We invest in growing strong believers who impact the world for Christ.',
          },
        ]}
      />

      {/* Leadership CTA */}
      <section className="section-container bg-gray-50">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-poppins font-bold text-gray-900 mb-6">
            Meet Our Leadership
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Dedicated pastors and leaders committed to serving and guiding our community.
          </p>
          <motion.a
            href="/leadership"
            className="btn-primary inline-flex"
            whileHover={{ scale: 1.05 }}
          >
            View Leadership Team →
          </motion.a>
        </motion.div>
      </section>
    </div>
  );
}
