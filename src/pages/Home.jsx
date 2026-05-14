import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { FiChevronDown } from 'react-icons/fi';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { useFeaturedProperties } from '../hooks/useProperties';
import { MOCK_COMMUNITIES, MOCK_TESTIMONIALS } from '../utils/mockData';
import PropertyCard from '../components/PropertyCard';
import SectionLabel from '../components/SectionLabel';
import LuxuryButton from '../components/LuxuryButton';
import propertyService from '../services/api/propertyService';
import logoImage from '../assets/images/logo.png';
// This dynamically matches all images in the folder
const images = import.meta.glob('../assets/images/*.{png,jpg,jpeg,svg}', { eager: true });


const PROPERTY_TYPES = ['House/Condo', 'House Only', 'Condo Only', 'Lots/Land', 'Mobile Home', 'Multi-Unit Residential', 'Rentals'];
const PRICE_OPTIONS = [1000000, 5000000, 10000000, 50000000, 100000000, 500000000, 1000000000];

// ── Hero ─────────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={images['../assets/images/home-hero.jpeg'].default}
          alt="Luxury Estate"
          className="w-full h-full object-cover opacity-55" />
        
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian/40 via-obsidian/20 to-obsidian/85" />

      <div className="relative z-10 text-center px-6 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-10">
          
          <div className="scale-[2] rounded-full flex items-center justify-center"> <img src={logoImage} alt="InkConcept Homes" className="h-27 sm:h-36 w-36 object-contain scale-110 mx-auto opacity-100" style={{ filter: 'brightness(1) invert(0)' }} /></div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }} className="space-y-4">
          <div className="w-16 h-px bg-gold mx-auto" />
          <p className="font-body text-xs tracking-ultra uppercase text-alabaster/60">Where Precision Meets Luxury</p>
          <p className="font-display text-2xl sm:text-3xl font-light text-alabaster/80 max-w-lg mx-auto tracking-wide">
            Nigeria's Most Distinguished Real Estate Addresses
          </p>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }} className="flex flex-wrap gap-4 mt-10 justify-center">
          <LuxuryButton to="/properties" variant="primary">Explore Properties</LuxuryButton>
          <LuxuryButton to="/contact" variant="outline">Get In Touch</LuxuryButton>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-alabaster/40 cursor-pointer"
        onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}>
        
        <span className="font-body text-[10px] tracking-ultra uppercase">Scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          <FiChevronDown size={18} />
        </motion.div>
      </motion.div>
    </section>);

}

// ── Search ────────────────────────────────────────────────────────────────────
function SearchSection() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ type: '', city: '', beds: '', baths: '', minPrice: '', maxPrice: '' });
  const f = (key, val) => setForm((prev) => ({ ...prev, [key]: val }));

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(Object.fromEntries(Object.entries(form).filter(([, v]) => v !== '')));
    navigate(`/search?${params.toString()}`);
  };

  return (
    <section className="bg-charcoal py-16 border-y border-silver/10">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="mb-8 text-center">
          <p className="section-label mb-2">Find Your Sanctuary</p>
          <h2 className="font-display text-4xl font-light text-alabaster">Advanced Property Search</h2>
        </div>
        <form onSubmit={handleSearch}>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 items-end">
            <div>
              <label className="font-body text-[10px] tracking-ultra uppercase text-alabaster/40 block mb-2">Type</label>
              <select className="select-luxury" value={form.type} onChange={(e) => f('type', e.target.value)}>
                <option value="">All Types</option>
                {PROPERTY_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="font-body text-[10px] tracking-ultra uppercase text-alabaster/40 block mb-2">City / Zip</label>
              <input className="input-luxury" placeholder="Lagos, Abuja..." value={form.city} onChange={(e) => f('city', e.target.value)} />
            </div>
            <div>
              <label className="font-body text-[10px] tracking-ultra uppercase text-alabaster/40 block mb-2">Beds</label>
              <select className="select-luxury" value={form.beds} onChange={(e) => f('beds', e.target.value)}>
                <option value="">Any</option>
                {[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n}+</option>)}
              </select>
            </div>
            <div>
              <label className="font-body text-[10px] tracking-ultra uppercase text-alabaster/40 block mb-2">Baths</label>
              <select className="select-luxury" value={form.baths} onChange={(e) => f('baths', e.target.value)}>
                <option value="">Any</option>
                {[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n}+</option>)}
              </select>
            </div>
            <div>
              <label className="font-body text-[10px] tracking-ultra uppercase text-alabaster/40 block mb-2">Min Price</label>
              <select className="select-luxury" value={form.minPrice} onChange={(e) => f('minPrice', e.target.value)}>
                <option value="">No Min</option>
                {PRICE_OPTIONS.map((p) => <option key={p} value={p}>₦{(p / 1000000).toFixed(0)}M</option>)}
              </select>
            </div>
            <div>
              <label className="font-body text-[10px] tracking-ultra uppercase text-alabaster/40 block mb-2">Max Price</label>
              <select className="select-luxury" value={form.maxPrice} onChange={(e) => f('maxPrice', e.target.value)}>
                <option value="">No Max</option>
                {PRICE_OPTIONS.map((p) => <option key={p} value={p}>₦{(p / 1000000).toFixed(0)}M</option>)}
              </select>
            </div>
          </div>
          <div className="mt-8 flex justify-center">
            <button type="submit" className="btn-luxury btn-luxury-primary px-16">Search Properties</button>
          </div>
        </form>
      </div>
    </section>);

}

// ── About Teaser ──────────────────────────────────────────────────────────────
function AboutTeaser() {
  return (
    <section className="py-28 bg-obsidian">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div>
            <SectionLabel label="Our Story" title={<>Crafting<br />Exceptional<br />Experiences</>} />
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
            className="font-body text-sm text-alabaster/50 mt-6 leading-relaxed">
              InkConcept Homes was founded on a singular vision: to redefine luxury real estate in Nigeria. We curate only the most exceptional residential properties, combining deep local market knowledge with an international standard of service.
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
            className="font-body text-sm text-alabaster/50 mt-4 leading-relaxed">
              Every transaction is handled with the utmost discretion and professionalism, serving Nigeria's most distinguished clientele.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }} className="mt-8">
              <LuxuryButton to="/about" variant="outline">Read Our Story</LuxuryButton>
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative">
            <div className="overflow-hidden" style={{ borderRadius: '60% 0% 60% 0%', aspectRatio: '4/5' }}>
              <img src={images['../assets/images/home-our-story.jpeg'].default} alt="Luxury Property" className="w-full h-full object-cover" loading="lazy" />
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mt-28">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative order-2 lg:order-1">
            <div className="overflow-hidden" style={{ borderRadius: '0% 60% 0% 60%', aspectRatio: '4/5' }}>
              <img src={images['../assets/images/home-abt-us.jpeg'].default} alt="Our Team" className="w-full h-full object-cover" loading="lazy" />
            </div>
          </motion.div>
          <div className="order-1 lg:order-2">
            <SectionLabel label="The Experts" title={<>Meet The<br />Team</>} />
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
            className="font-body text-sm text-alabaster/50 mt-6 leading-relaxed">
              Our team of seasoned property specialists brings decades of combined experience in Nigeria's luxury real estate market.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="mt-8">
              <LuxuryButton to="/about" variant="outline">Meet Our Team</LuxuryButton>
            </motion.div>
          </div>
        </div>
      </div>
    </section>);

}

// ── Featured Listings ─────────────────────────────────────────────────────────
function FeaturedListings() {
  const { properties, loading } = useFeaturedProperties();
  return (
    <section className="py-28 bg-charcoal/30">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6">
          <SectionLabel label="Curated Selection" title="Featured Listings" />
          <LuxuryButton to="/properties" variant="ghost">View All Properties →</LuxuryButton>
        </div>
        {loading ?
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => <div key={i} className="aspect-[4/3] bg-charcoal/60 animate-pulse" />)}
          </div> :

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {properties.slice(0, 4).map((p, i) => <PropertyCard key={p.id} property={p} index={i} />)}
          </div>
        }
      </div>
    </section>);

}

// ── Notable Sales ─────────────────────────────────────────────────────────────
function NotableSales() {
  const [sales, setSales] = useState([]);
  useEffect(() => {propertyService.getNotableSales().then(setSales);}, []);
  return (
    <section className="py-28 bg-obsidian">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="mb-16">
          <SectionLabel label="Our Legacy" title="Notable Sales" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sales.slice(0, 4).map((p, i) => <PropertyCard key={p.id} property={p} index={i} />)}
        </div>
      </div>
    </section>);

}

// ── Communities Carousel ──────────────────────────────────────────────────────
function CommunitiesCarousel() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % MOCK_COMMUNITIES.length), 3500);
    return () => clearInterval(t);
  }, []);
  return (
    <section className="py-28 bg-charcoal/20 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 mb-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <SectionLabel label="Explore Areas" title="Featured Communities" />
          <LuxuryButton to="/communities" variant="ghost">All Communities →</LuxuryButton>
        </div>
      </div>
      <div className="relative">
        <div className="flex gap-4 overflow-hidden" style={{ paddingLeft: '8vw' }}>
          {MOCK_COMMUNITIES.map((c, i) => {
            const isActive = i === idx;
            return (
              <motion.div
                key={c.id} layout
                animate={{ opacity: isActive ? 1 : 0.5, scale: isActive ? 1 : 0.93 }}
                transition={{ duration: 0.5 }}
                className="flex-shrink-0 cursor-pointer group"
                style={{ width: isActive ? 400 : 280 }}
                onClick={() => setIdx(i)}>
                
                <div className="relative overflow-hidden" style={{ height: 320 }}>
                  <img src={c.image} alt={c.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="font-body text-[10px] tracking-ultra uppercase text-gold mb-1">{c.highlight}</p>
                    <h3 className="font-display text-xl text-alabaster">{c.name}</h3>
                    <p className="font-body text-xs text-alabaster/50 mt-1">{c.properties} Properties</p>
                  </div>
                </div>
              </motion.div>);

          })}
        </div>
        <div className="flex justify-center gap-2 mt-8">
          {MOCK_COMMUNITIES.map((_, i) =>
          <button key={i} onClick={() => setIdx(i)}
          className={`transition-all duration-300 h-1 rounded-full ${i === idx ? 'bg-gold w-8' : 'bg-silver/20 w-2'}`} />
          )}
        </div>
      </div>
    </section>);

}

// ── Statistics ────────────────────────────────────────────────────────────────
function Statistics() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const stats = [
  { value: 100, suffix: 'M+', prefix: '₦', label: 'Total Sales Volume' },
  { value: 6, suffix: '+', prefix: '', label: 'Years of Excellence' },
  { value: 200, suffix: '+', prefix: '', label: 'Satisfied Clients' },
  { value: 98, suffix: '%', prefix: '', label: 'Satisfaction Rate' }];

  return (
    <section className="py-28 bg-obsidian border-y border-silver/10" ref={ref}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <SectionLabel label="By The Numbers" title="Our Statistics" center />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
          {stats.map((stat, i) =>
          <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="text-center">
              <p className="font-display text-5xl lg:text-6xl font-light text-alabaster leading-none">
                {stat.prefix}{inView ? <CountUp end={stat.value} duration={2.5} /> : '0'}{stat.suffix}
              </p>
              <div className="w-8 h-px bg-gold mx-auto my-4" />
              <p className="font-body text-xs tracking-ultra uppercase text-alabaster/40">{stat.label}</p>
            </motion.div>
          )}
        </div>
      </div>
    </section>);

}

// ── Testimonials ──────────────────────────────────────────────────────────────
function Testimonials() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % MOCK_TESTIMONIALS.length), 6000);
    return () => clearInterval(t);
  }, []);
  const t = MOCK_TESTIMONIALS[idx];
  return (
    <section className="py-28 bg-charcoal/30">
      <div className="max-w-[900px] mx-auto px-6 lg:px-12 text-center">
        <SectionLabel label="Client Stories" title="Testimonials" center />
        <div className="mt-16 relative min-h-[260px]">
          <AnimatePresence mode="wait">
            <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}
            className="flex flex-col items-center">
              <img src={t.image} alt={t.name} className="w-16 h-16 rounded-full object-cover border border-gold/30 mb-6" loading="lazy" />
              <div className="flex gap-1 mb-6">
                {[...Array(t.rating)].map((_, i) =>
                <span key={i} style={{ color: '#B8965A', fontSize: 14 }}>★</span>
                )}
              </div>
              <blockquote className="font-display text-xl lg:text-2xl font-light text-alabaster/80 italic leading-relaxed mb-6 max-w-2xl">"{t.text}"</blockquote>
              <p className="font-body text-sm font-medium text-alabaster">{t.name}</p>
              <p className="font-body text-xs tracking-wider text-alabaster/40 uppercase mt-1">{t.role}</p>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex justify-center gap-2 mt-8">
          {MOCK_TESTIMONIALS.map((_, i) =>
          <button key={i} onClick={() => setIdx(i)}
          className={`transition-all duration-300 h-1 rounded-full ${i === idx ? 'bg-gold w-8' : 'bg-silver/20 w-2'}`} />
          )}
        </div>
      </div>
    </section>);

}

export default function Home() {
  return (
    <div>
      <HeroSection />
      <SearchSection />
      <AboutTeaser />
      <FeaturedListings />
      <NotableSales />
      <CommunitiesCarousel />
      <Statistics />
      <Testimonials />
    </div>);

}