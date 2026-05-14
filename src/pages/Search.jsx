import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiGrid, FiList, FiFilter, FiX } from 'react-icons/fi';
import PageHero from '../components/PageHero';
import PropertyCard from '../components/PropertyCard';
import SectionLabel from '../components/SectionLabel';
import propertyService from '../services/api/propertyService';

const PROPERTY_TYPES = ['House/Condo', 'House Only', 'Condo Only', 'Lots/Land', 'Mobile Home', 'Multi-Unit Residential', 'Rentals'];
const PRICE_OPTIONS = [100000, 500000, 1000000, 2000000, 5000000, 10000000, 50000000, 100000000];
const SORT_OPTIONS = [
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest First' },
];

export default function Search() {
  const urlParams = new URLSearchParams(window.location.search);

  const [filters, setFilters] = useState({
    type: urlParams.get('type') || '',
    city: urlParams.get('city') || '',
    beds: urlParams.get('beds') || '',
    baths: urlParams.get('baths') || '',
    minPrice: urlParams.get('minPrice') || '',
    maxPrice: urlParams.get('maxPrice') || '',
    status: '',
  });
  const [sort, setSort] = useState('price_asc');
  const [view, setView] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const cleanFilters = Object.fromEntries(Object.entries(filters).filter(([, v]) => v !== ''));
      let data = await propertyService.getProperties(cleanFilters);
      if (sort === 'price_asc') data = data.sort((a, b) => a.price - b.price);
      if (sort === 'price_desc') data = data.sort((a, b) => b.price - a.price);
      setProperties(data);
      setLoading(false);
    };
    fetch();
  }, [filters, sort]);

  const f = (key, val) => setFilters(prev => ({ ...prev, [key]: val }));
  const clearFilters = () => setFilters({ type: '', city: '', beds: '', baths: '', minPrice: '', maxPrice: '', status: '' });

  return (
    <div className="bg-obsidian">
      <PageHero
        title="Property Search"
        label="Find Your Sanctuary"
        subtitle="Advanced search across Nigeria's finest properties"
        image="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=80"
      />

      <section className="py-16">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
            <div>
              <p className="font-body text-sm text-alabaster/40">
                {loading ? 'Searching...' : `${properties.length} Properties Found`}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 font-body text-xs tracking-ultra uppercase text-alabaster/60 hover:text-gold transition-colors"
              >
                <FiFilter size={14} />
                {showFilters ? 'Hide' : 'Show'} Filters
              </button>
              <div className="w-px h-4 bg-silver/20" />
              <div className="relative">
                <select
                  className="font-body text-xs tracking-wider text-alabaster/60 bg-transparent border-none outline-none cursor-pointer"
                  value={sort}
                  onChange={e => setSort(e.target.value)}
                >
                  {SORT_OPTIONS.map(o => <option key={o.value} value={o.value} style={{ background: '#1A1A1A' }}>{o.label}</option>)}
                </select>
              </div>
              <div className="w-px h-4 bg-silver/20" />
              <div className="flex gap-2">
                <button onClick={() => setView('grid')} className={`transition-colors ${view === 'grid' ? 'text-gold' : 'text-alabaster/30 hover:text-alabaster'}`}>
                  <FiGrid size={16} />
                </button>
                <button onClick={() => setView('list')} className={`transition-colors ${view === 'list' ? 'text-gold' : 'text-alabaster/30 hover:text-alabaster'}`}>
                  <FiList size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-10 bg-charcoal/60 border border-silver/10 p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-body text-xs tracking-ultra uppercase text-alabaster/50">Filter Properties</h3>
                <button onClick={clearFilters} className="flex items-center gap-1 font-body text-xs text-alabaster/40 hover:text-gold transition-colors">
                  <FiX size={12} /> Clear All
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
                <div>
                  <label className="font-body text-[10px] tracking-ultra uppercase text-alabaster/40 block mb-2">Type</label>
                  <select className="select-luxury" value={filters.type} onChange={e => f('type', e.target.value)}>
                    <option value="">All Types</option>
                    {PROPERTY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="font-body text-[10px] tracking-ultra uppercase text-alabaster/40 block mb-2">City</label>
                  <input className="input-luxury" placeholder="e.g. Lagos" value={filters.city} onChange={e => f('city', e.target.value)} />
                </div>
                <div>
                  <label className="font-body text-[10px] tracking-ultra uppercase text-alabaster/40 block mb-2">Min Beds</label>
                  <select className="select-luxury" value={filters.beds} onChange={e => f('beds', e.target.value)}>
                    <option value="">Any</option>
                    {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}+</option>)}
                  </select>
                </div>
                <div>
                  <label className="font-body text-[10px] tracking-ultra uppercase text-alabaster/40 block mb-2">Min Baths</label>
                  <select className="select-luxury" value={filters.baths} onChange={e => f('baths', e.target.value)}>
                    <option value="">Any</option>
                    {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}+</option>)}
                  </select>
                </div>
                <div>
                  <label className="font-body text-[10px] tracking-ultra uppercase text-alabaster/40 block mb-2">Min Price</label>
                  <select className="select-luxury" value={filters.minPrice} onChange={e => f('minPrice', e.target.value)}>
                    <option value="">No Min</option>
                    {PRICE_OPTIONS.map(p => <option key={p} value={p}>₦{(p/1000000).toFixed(0)}M</option>)}
                  </select>
                </div>
                <div>
                  <label className="font-body text-[10px] tracking-ultra uppercase text-alabaster/40 block mb-2">Status</label>
                  <select className="select-luxury" value={filters.status} onChange={e => f('status', e.target.value)}>
                    <option value="">All</option>
                    <option value="available">Available</option>
                    <option value="sold">Sold</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}

          {/* Results */}
          {loading ? (
            <div className={`grid gap-6 ${view === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
              {[...Array(6)].map((_, i) => <div key={i} className="aspect-[4/3] bg-charcoal/60 animate-pulse" />)}
            </div>
          ) : properties.length === 0 ? (
            <div className="text-center py-24">
              <p className="font-display text-3xl text-alabaster/30 font-light">No properties found</p>
              <p className="font-body text-sm text-alabaster/30 mt-3">Try adjusting your filters</p>
              <button onClick={clearFilters} className="mt-6 btn-luxury btn-luxury-outline">Clear Filters</button>
            </div>
          ) : (
            <div className={`grid gap-6 ${view === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
              {properties.map((property, i) => (
                <PropertyCard key={property.id} property={property} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}