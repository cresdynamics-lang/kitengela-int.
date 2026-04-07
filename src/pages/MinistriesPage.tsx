import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, BookOpen, Heart, Music, Zap } from 'lucide-react';
import { FeatureSection } from '../components/FeatureSection';

export function MinistriesPage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <div
        className="hero-section"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&h=900&fit=crop)',
        }}
      >
        <div className="hero-overlay" />
        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="section-title">Our Ministries</h1>
            <p className="section-subtitle">
              Discover how you can serve and grow with us
            </p>
          </motion.div>
        </div>
      </div>

      {/* Ministries Grid */}
      <FeatureSection
        title="What We Offer"
        description="Join one of our many ministries and discover your path to purpose"
        features={[
          {
            icon: <BookOpen className="text-accent-500" size={32} />,
            title: 'Bible Study',
            description:
              'Deepen your understanding of Scripture through our systematic Bible study programs for all ages.',
          },
          {
            icon: <Music className="text-accent-500" size={32} />,
            title: 'Worship & Praise',
            description:
              'Join our vibrant worship team and experience the presence of God through music and singing.',
          },
          {
            icon: <Heart className="text-accent-500" size={32} />,
            title: 'Community Outreach',
            description:
              'Serve our community with compassion through various social responsibility programs.',
          },
          {
            icon: <Users className="text-accent-500" size={32} />,
            title: 'Youth Ministry',
            description:
              'Empowering young people to discover their potential and purpose in Christ.',
          },
          {
            icon: <Zap className="text-accent-500" size={32} />,
            title: 'Prayer Groups',
            description:
              'Join our dedicated prayer warriors in intercession for our church and community.',
          },
          {
            icon: <Heart className="text-accent-500" size={32} />,
            title: 'Pastoral Care',
            description:
              'Support and guidance for families, counseling, and spiritual mentoring.',
          },
        ]}
      />

      {/* Service Schedule */}
      <section className="section-container bg-gray-50">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-poppins font-bold text-gray-900 mb-4">
            Weekly Service Schedule
          </h2>
          <p className="text-xl text-gray-600">
            Join us at any time that works best for you
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              day: 'Sunday',
              services: [
                '8:00 AM - 9:00 AM: Bible Class',
                '9:00 AM - 10:30 AM: Main Service',
                '10:30 AM - 1:00 PM: Extended Teaching',
              ],
            },
            {
              day: 'Wednesday',
              services: [
                '8:00 PM - 9:30 PM: Prayer & Praise',
                'Online option available',
              ],
            },
            {
              day: 'Friday',
              services: [
                '8:00 PM - 9:30 PM: Healing & Deliverance',
                'Special focus on prayer',
              ],
            },
          ].map((schedule, index) => (
            <motion.div
              key={index}
              className="card p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-poppins font-bold text-gray-900 mb-4">
                {schedule.day}
              </h3>
              <ul className="space-y-2">
                {schedule.services.map((service, i) => (
                  <li key={i} className="text-gray-600 flex items-start gap-2">
                    <span className="text-accent-500 font-bold mt-1">•</span>
                    <span>{service}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Get Involved CTA */}
      <section className="bg-gradient-to-r from-primary-900 to-primary-700 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-poppins font-bold text-white mb-6">
              Ready to Get Involved?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Find the ministry that speaks to your heart and discover your calling.
            </p>
            <motion.a
              href="#contact"
              className="btn-primary inline-flex"
              whileHover={{ scale: 1.05 }}
            >
              Connect with a Ministry
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
