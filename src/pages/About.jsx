import React from 'react';
import { motion } from 'framer-motion';
import PageHero from '../components/PageHero';
import SectionLabel from '../components/SectionLabel';
import { TEAM_MEMBERS } from '../utils/mockData';

export default function About() {
  return (
    <div className="bg-obsidian">
      <PageHero
        title="About Us"
        label="Our Story"
        subtitle="Defining Luxury Real Estate in Nigeria"
        image="https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1600&q=80"
      />

      {/* Main About Section */}
      <section className="py-28">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="overflow-hidden" style={{ borderRadius: '0% 60% 0% 60%', aspectRatio: '4/5' }}>
                <img
                  src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=900&q=80"
                  alt="InkConcept Homes Office"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 w-32 h-32 border border-gold/20" style={{ borderRadius: '60% 0% 60% 0%' }} />
            </motion.div>

            {/* Text */}
            <div>
              <SectionLabel label="Who We Are" title={<>A Legacy of<br />Luxury &<br />Precision</>} />
              <div className="space-y-5 mt-8">
                {[
                  "InkConcept Homes was established with an unwavering commitment to excellence — to bring the global standard of luxury real estate advisory to Nigeria's most discerning clientele.",
                  "Operating across Lagos, Abuja, and Port Harcourt, we specialize in the acquisition, sale, and management of Nigeria's finest residential properties. Our portfolio spans waterfront estates, urban penthouses, and historic colonial manors.",
                  "We believe that a home is more than a structure — it is a statement of values, taste, and ambition. Our role is to ensure that statement is made with absolute precision.",
                  "With over six years of market mastery, a curated network of high-net-worth clients, and an unmatched reputation for discretion, InkConcept Homes stands as Nigeria's premier luxury real estate agency.",
                ].map((text, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="font-body text-sm text-alabaster/55 leading-relaxed"
                  >
                    {text}
                  </motion.p>
                ))}
              </div>
              <div className="mt-10 grid grid-cols-2 gap-6">
                {[
                  { num: '₦100M+', label: 'In Transactions' },
                  { num: '200+', label: 'Happy Clients' },
                  { num: '6+', label: 'Years Experience' },
                  { num: '3', label: 'Major Cities' },
                ].map((item, i) => (
                  <div key={i} className="border-l border-gold/30 pl-4">
                    <p className="font-display text-3xl text-alabaster font-light">{item.num}</p>
                    <p className="font-body text-xs tracking-ultra uppercase text-alabaster/40 mt-1">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-28 bg-charcoal/30">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <SectionLabel label="The Experts" title="Meet Our Team" center />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {TEAM_MEMBERS.map((member, i) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center group"
              >
                <div className="relative overflow-hidden mb-6 mx-auto" style={{ width: 200, height: 240, borderRadius: '50% 0% 50% 0%' }}>
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian/40 to-transparent" />
                </div>
                <h3 className="font-display text-2xl text-alabaster font-light">{member.name}</h3>
                <p className="font-body text-xs tracking-ultra uppercase text-gold mt-1">{member.role}</p>
                <p className="font-body text-sm text-alabaster/45 mt-4 leading-relaxed max-w-xs mx-auto">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-28 bg-obsidian">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <SectionLabel label="Our Principles" title="What We Stand For" center />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Precision', text: 'Every detail, every transaction, handled with meticulous attention to ensure perfect outcomes.' },
              { title: 'Discretion', text: 'We honour the privacy and confidentiality of every client relationship, always.' },
              { title: 'Expertise', text: 'Deep market intelligence combined with international best practices in luxury real estate.' },
              { title: 'Legacy', text: 'We don\'t just sell homes — we help our clients build enduring property legacies.' },
            ].map((val, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="border border-silver/10 p-8 hover:border-gold/20 transition-colors duration-300"
              >
                <div className="w-8 h-px bg-gold mb-6" />
                <h4 className="font-display text-2xl text-alabaster font-light mb-4">{val.title}</h4>
                <p className="font-body text-sm text-alabaster/45 leading-relaxed">{val.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}