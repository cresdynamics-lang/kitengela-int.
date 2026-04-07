import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

interface FeatureSectionProps {
  title: string;
  subtitle?: string;
  description?: string;
  features: Array<{
    icon: React.ReactNode;
    title: string;
    description: string;
  }>;
}

export function FeatureSection({
  title,
  subtitle,
  description,
  features,
}: FeatureSectionProps) {
  return (
    <section className="section-container bg-white">
      <motion.div
        className="mb-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        {subtitle && (
          <p className="text-accent-500 font-semibold uppercase tracking-wider mb-2">
            {subtitle}
          </p>
        )}
        <h2 className="text-4xl font-poppins font-bold text-gray-900 mb-4">{title}</h2>
        {description && (
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{description}</p>
        )}
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="p-8 rounded-xl bg-gray-50 hover:bg-primary-50 hover:shadow-lg transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
          >
            <div className="mb-4 text-3xl">{feature.icon}</div>
            <h3 className="text-xl font-poppins font-bold text-gray-900 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
