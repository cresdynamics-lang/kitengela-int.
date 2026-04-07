import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GalleryGrid } from '../components/GalleryGrid';

export function GalleryPage() {
  const [images, setImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'events', label: 'Events' },
    { id: 'ministries', label: 'Ministries' },
    { id: 'sermons', label: 'Sermons' },
    { id: 'prayers', label: 'Prayers' },
  ];

  useEffect(() => {
    fetchGallery();
  }, [selectedCategory]);

  const fetchGallery = async () => {
    try {
      const url = selectedCategory === 'all'
        ? '/api/public/gallery'
        : `/api/public/gallery?category=${selectedCategory}`;
      const response = await fetch(url);
      const data = await response.json();
      setImages(data);
    } catch (error) {
      console.error('Error fetching gallery:', error);
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
          backgroundImage: 'url(https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1600&h=900&fit=crop)',
        }}
      >
        <div className="hero-overlay" />
        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="section-title">Church Gallery</h1>
            <p className="section-subtitle">
              Moments that capture our faith and community
            </p>
          </motion.div>
        </div>
      </div>

      {/* Gallery Section */}
      <section className="section-container bg-white">
        {/* Category Filter */}
        <motion.div
          className="mb-12 flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {categories.map((cat) => (
            <motion.button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-accent-500 text-white'
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {cat.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Images Grid */}
        {loading ? (
          <div className="text-center py-12">Loading gallery...</div>
        ) : images.length > 0 ? (
          <GalleryGrid images={images} columns={3} />
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              No images in this category yet.
            </p>
          </div>
        )}
      </section>

      {/* Upload CTA for Members */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-poppins font-bold text-gray-900 mb-6">
              Share Your Photos
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Have photos from a church event? Contact us to contribute to our gallery.
            </p>
            <motion.a
              href="mailto:gallery@church.com"
              className="btn-primary inline-flex"
              whileHover={{ scale: 1.05 }}
            >
              Submit Photos
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
