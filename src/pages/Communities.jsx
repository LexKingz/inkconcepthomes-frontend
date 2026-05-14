import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMapPin, FiHome } from 'react-icons/fi';
import PageHero from '../components/PageHero';
import SectionLabel from '../components/SectionLabel';
import { MOCK_COMMUNITIES } from '../utils/mockData';

function CommunityCard({ community, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative overflow-hidden" style={{ height: 320 }}>
        <motion.img
          src={community.image}
          alt={community.name}
          className="w-full h-full object-cover"
          animate={{ scale: hovered ? 1.08 : 1 }}
          transition={{ duration: 0.7 }}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/85 via-obsidian/20 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-6">
          <p className="font-body text-[10px] tracking-ultra uppercase text-gold mb-2">{community.highlight}</p>
          <h3 className="font-display text-2xl text-alabaster font-light">{community.name}</h3>
          <div className="flex items-center gap-4 mt-2">
            <span className="meta-text flex items-center gap-1"><FiMapPin size={10} />{community.city}</span>
            <span className="meta-text flex items-center gap-1"><FiHome size={10} />{community.properties} Properties</span>
          </div>
        </div>
      </div>

      <div className="border border-silver/10 border-t-0 p-6 bg-charcoal/40 group-hover:border-gold/20 transition-colors duration-300">
        <div className="flex items-center justify-between mb-3">
          <p className="font-body text-xs tracking-ultra uppercase text-alabaster/40">Avg. Price</p>
          <p className="font-display text-lg text-gold font-light">{community.avgPrice}</p>
        </div>
        <p className="font-body text-xs text-alabaster/45 leading-relaxed line-clamp-3">{community.description}</p>
      </div>
    </motion.div>
  );
}

export default function Communities() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="bg-obsidian">
      <PageHero
        title="Communities"
        label="Prime Locations"
        subtitle="Discover Nigeria's Most Prestigious Neighbourhoods"
        image="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1600&q=80"
      />

      <section className="py-28">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <SectionLabel
              label="Where You'll Belong"
              title="Our Communities"
              subtitle="We specialize in Nigeria's most coveted residential districts, from the waterfront grandeur of Victoria Island to the diplomatic calm of Maitama."
              center
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_COMMUNITIES.map((community, i) => (
              <CommunityCard key={community.id} community={community} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-28 bg-charcoal/20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="mb-12">
            <SectionLabel label="Our Coverage" title="Across Nigeria" />
          </div>
          <div className="border border-silver/10 overflow-hidden" style={{ height: 500 }}>
            <iframe
              title="InkConcept Homes Coverage"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(1) invert(0.85) contrast(0.9)' }}
              loading="lazy"
              src="https://maps.google.com/maps?q=Lagos,Nigeria&z=7&output=embed"
            />
          </div>
        </div>
      </section>

      {/* Community Detail Stats */}
      <section className="py-28 bg-obsidian">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <SectionLabel label="At A Glance" title="Our Footprint" center />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: '6', label: 'Premium Locations', suffix: '' },
              { value: '109', label: 'Total Properties', suffix: '+' },
              { value: '3', label: 'Major Cities', suffix: '' },
              { value: '₦7.4B', label: 'Highest Avg Price', suffix: '' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center border border-silver/10 p-8"
              >
                <p className="font-display text-4xl text-alabaster font-light">{stat.value}{stat.suffix}</p>
                <div className="w-6 h-px bg-gold mx-auto my-3" />
                <p className="meta-text">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}