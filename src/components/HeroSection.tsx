import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

interface HeroSectionProps {
  backgroundImage: string;
  title: string;
  subtitle: string;
  primaryCTA?: {
    label: string;
    href: string;
  };
  secondaryCTA?: {
    label: string;
    href: string;
  };
  alignment?: 'left' | 'center';
}

export function HeroSection({
  backgroundImage,
  title,
  subtitle,
  primaryCTA,
  secondaryCTA,
  alignment = 'left',
}: HeroSectionProps) {
  return (
    <div
      className="hero-section"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="hero-overlay" />
      
      <div className={`hero-content ${alignment === 'center' ? 'text-center' : ''}`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="section-title">{title}</h1>
          <p className="section-subtitle">{subtitle}</p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            {primaryCTA && (
              <motion.a
                href={primaryCTA.href}
                className="btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {primaryCTA.label}
                <ChevronRight size={20} />
              </motion.a>
            )}
            {secondaryCTA && (
              <motion.a
                href={secondaryCTA.href}
                className="btn-outline"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {secondaryCTA.label}
                <ChevronRight size={20} />
              </motion.a>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
