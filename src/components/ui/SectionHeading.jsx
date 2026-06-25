import React from 'react';
import { motion } from 'framer-motion';

export default function SectionHeading({
  title,
  subtitle,
  accentColor = '#d4913a',
  tag = null,
  light = false,
  script = false,
  className = '',
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`text-center mb-16 ${className}`}
    >
      {tag && (
        <span
          className="inline-block text-xs font-semibold uppercase tracking-[0.3em] mb-4 px-4 py-1.5 rounded-full"
          style={{ background: `${accentColor}20`, color: accentColor }}
        >
          {tag}
        </span>
      )}
      <h2
        className={`text-4xl md:text-5xl font-bold mb-4 ${
          script ? 'font-script' : 'font-display'
        } ${light ? 'text-white' : 'text-gray-900 dark:text-white'}`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`text-lg max-w-xl mx-auto leading-relaxed ${
          light ? 'text-white/70' : 'text-gray-500 dark:text-gray-400'
        }`}>
          {subtitle}
        </p>
      )}
      <div
        className="w-16 h-1 rounded-full mx-auto mt-6"
        style={{ background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)` }}
      />
    </motion.div>
  );
}
