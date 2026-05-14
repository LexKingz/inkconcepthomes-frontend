import React, { useState, useEffect } from 'react';
import PageHero from '../components/PageHero';
import PropertyCard from '../components/PropertyCard';
import SectionLabel from '../components/SectionLabel';
import propertyService from '../services/api/propertyService';

export default function Properties() {
  const [available, setAvailable] = useState([]);
  const [sold, setSold] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const [avail, soldProps] = await Promise.all([
        propertyService.getProperties({ status: 'available' }),
        propertyService.getNotableSales(),
      ]);
      setAvailable(avail);
      setSold(soldProps);
      setLoading(false);
    };
    fetch();
  }, []);

  return (
    <div className="bg-obsidian">
      <PageHero
        title="Our Properties"
        label="Curated Residences"
        subtitle="Nigeria's Most Distinguished Addresses"
        image="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1600&q=80"
      />

      {/* Available Properties */}
      <section className="py-28">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="mb-16">
            <SectionLabel label="Currently Available" title="Available Properties" />
          </div>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(4)].map((_, i) => <div key={i} className="aspect-[4/3] bg-charcoal/60 animate-pulse" />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {available.map((p, i) => <PropertyCard key={p.id} property={p} index={i} />)}
            </div>
          )}
        </div>
      </section>

      {/* Sold Properties */}
      <section className="py-28 bg-charcoal/30">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="mb-16">
            <SectionLabel label="Our Legacy" title="Sold Properties" />
          </div>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(2)].map((_, i) => <div key={i} className="aspect-[4/3] bg-charcoal/60 animate-pulse" />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sold.map((p, i) => <PropertyCard key={p.id} property={p} index={i} />)}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}