import React from 'react';
import { motion } from 'framer-motion';

export default function SectionLabel({ label, title, subtitle, light = false, center = false }) {
  return (
    <div className={center ? 'text-center' : ''}>
      {label && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="section-label mb-4"
        >
          {label}
        </motion.p>
      )}
      {title && (
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className={`font-display text-4xl sm:text-5xl lg:text-6xl font-light tracking-wide leading-tight ${
            light ? 'text-obsidian' : 'text-alabaster'
          }`}
        >
          {title}
        </motion.h2>
      )}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`font-body text-sm mt-4 leading-relaxed max-w-lg ${center ? 'mx-auto' : ''} ${
            light ? 'text-mid-gray' : 'text-alabaster/50'
          }`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}