import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHome, FiDroplet, FiMaximize2, FiMapPin } from 'react-icons/fi';
import { formatPrice } from '../utils/formatters';

export default function PropertyCard({ property, index = 0 }) {
  const { id, title, images, price, beds, baths, sqft, city, status } = property;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Link to={`/properties/${id}`} className="block property-card group" aria-label={title}>
        {/* Image Container */}
        <div className="relative overflow-hidden aspect-[4/3]">
          <img
            src={images[0]}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            loading="lazy"
          />
          {/* Gradient Overlay */}
          <div className="property-card-overlay" />

          {/* Status Badge */}
          <div className="absolute top-4 left-4 z-10">
            <span
              className="font-body text-[10px] tracking-ultra uppercase px-3 py-1"
              style={{
                background: status === 'sold' ? 'rgba(184,150,90,0.9)' : 'rgba(94,102,94,0.85)',
                color: '#F9F9F7',
              }}
            >
              {status === 'sold' ? 'Sold' : 'Available'}
            </span>
          </div>

          {/* Price — always visible at bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
            <motion.div
              initial={{ y: 0 }}
              className="flex items-end justify-between"
            >
              <div>
                <p className="font-display text-2xl font-light text-alabaster leading-tight">{formatPrice(price)}</p>
                <p className="font-body text-xs tracking-ultra uppercase text-alabaster/60 mt-1 flex items-center gap-1">
                  <FiMapPin size={10} />
                  {city}
                </p>
              </div>

              {/* View Details — slides up on hover */}
              <motion.span
                initial={{ y: 10, opacity: 0 }}
                whileHover={{ y: 0, opacity: 1 }}
                className="font-body text-[10px] tracking-ultra uppercase text-gold border-b border-gold/50 pb-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                View Details →
              </motion.span>
            </motion.div>
          </div>
        </div>

        {/* Card Content */}
        <div className="bg-charcoal/60 border border-silver/10 border-t-0 p-5 group-hover:border-gold/20 transition-colors duration-300">
          <h3 className="font-display text-lg font-light text-alabaster tracking-wide leading-snug mb-3">{title}</h3>
          <div className="flex items-center gap-5 text-alabaster/40">
            <span className="meta-text flex items-center gap-1.5">
              <FiHome size={11} /> {beds} Beds
            </span>
            <span className="meta-text flex items-center gap-1.5">
              <FiDroplet size={11} /> {baths} Baths
            </span>
            <span className="meta-text flex items-center gap-1.5">
              <FiMaximize2 size={11} /> {sqft.toLocaleString()} Sq Ft
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}