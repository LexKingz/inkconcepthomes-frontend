import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiDroplet, FiMaximize2, FiMapPin, FiHome, FiChevronLeft } from 'react-icons/fi';
import { useProperty } from '../hooks/useProperties';
import { useForm } from 'react-hook-form';
import PropertyGallery from '../components/PropertyGallery';
import contactService from '../services/api/contactService';
import { formatPrice } from '../utils/formatters';

export default function PropertyDetail() {
  const { id } = useParams();
  const { property, loading } = useProperty(id);
  const [inquirySent, setInquirySent] = useState(false);
  const [sending, setSending] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setSending(true);
    await contactService.submitPropertyInquiry(id, data);
    setInquirySent(true);
    setSending(false);
    reset();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-obsidian flex items-center justify-center pt-24">
        <div className="text-center">
          <div className="w-8 h-8 border border-gold/40 border-t-gold rounded-full animate-spin mx-auto mb-4" />
          <p className="font-body text-xs tracking-ultra uppercase text-alabaster/40">Loading Property</p>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-obsidian flex items-center justify-center pt-24">
        <div className="text-center">
          <p className="font-display text-4xl text-alabaster/30 font-light">Property Not Found</p>
          <Link to="/properties" className="mt-6 inline-block font-body text-xs tracking-ultra uppercase text-gold hover:text-gold-light transition-colors">
            ← Back to Properties
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-obsidian pt-24">
      {/* Breadcrumb */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-6">
        <Link to="/properties" className="flex items-center gap-2 font-body text-xs tracking-ultra uppercase text-alabaster/40 hover:text-gold transition-colors">
          <FiChevronLeft size={14} /> Back to Properties
        </Link>
      </div>

      {/* Gallery */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 mb-12">
        <PropertyGallery images={property.images} />
      </div>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left — Property Info */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
                <div>
                  <span
                    className="font-body text-[10px] tracking-ultra uppercase px-3 py-1 mb-4 inline-block"
                    style={{
                      background: property.status === 'sold' ? 'rgba(184,150,90,0.15)' : 'rgba(94,102,94,0.15)',
                      color: property.status === 'sold' ? 'var(--gold)' : 'var(--sage-light)',
                      border: `0.5px solid ${property.status === 'sold' ? 'rgba(184,150,90,0.3)' : 'rgba(94,102,94,0.3)'}`,
                    }}
                  >
                    {property.status === 'sold' ? 'Sold' : 'Available'}
                  </span>
                  <h1 className="font-display text-4xl lg:text-5xl text-alabaster font-light tracking-wide leading-tight">
                    {property.title}
                  </h1>
                </div>
                <div className="text-right">
                  <p className="font-display text-4xl text-alabaster font-light">{formatPrice(property.price)}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-8 text-alabaster/40">
                <FiMapPin size={13} />
                <span className="font-body text-sm">{property.address}</span>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-4 mb-10 border border-silver/10 p-6">
                {[
                  { Icon: FiHome, value: property.beds, label: 'Bedrooms' },
                  { Icon: FiDroplet, value: property.baths, label: 'Bathrooms' },
                  { Icon: FiMaximize2, value: property.sqft.toLocaleString(), label: 'Sq Ft' },
                ].map(({ Icon, value, label }, i) => (
                  <div key={i} className="text-center">
                    <Icon className="text-gold mx-auto mb-2" size={18} />
                    <p className="font-display text-2xl text-alabaster font-light">{value}</p>
                    <p className="meta-text mt-1">{label}</p>
                  </div>
                ))}
              </div>

              {/* Additional Details */}
              <div className="grid grid-cols-2 gap-4 mb-10">
                {[
                  { label: 'Property Type', value: property.type },
                  { label: 'City', value: property.city },
                  { label: 'Status', value: property.status === 'sold' ? 'Sold' : 'Available' },
                  { label: 'Reference', value: `ICH-${property.id.toString().padStart(4, '0')}` },
                ].map(({ label, value }, i) => (
                  <div key={i} className="border-b border-silver/10 pb-3">
                    <p className="meta-text mb-1">{label}</p>
                    <p className="font-body text-sm text-alabaster/70">{value}</p>
                  </div>
                ))}
              </div>

              {/* Description */}
              <div className="mb-10">
                <h3 className="font-display text-2xl text-alabaster font-light mb-4">Property Overview</h3>
                <div className="w-12 h-px bg-gold mb-5" />
                <p className="font-body text-sm text-alabaster/55 leading-relaxed">{property.description}</p>
              </div>

              {/* Amenities */}
              <div className="mb-10">
                <h3 className="font-display text-2xl text-alabaster font-light mb-4">Amenities & Features</h3>
                <div className="w-12 h-px bg-gold mb-5" />
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {property.amenities.map((amenity, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-4 h-px bg-gold flex-shrink-0" />
                      <span className="font-body text-xs text-alabaster/55 tracking-wide">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="mb-10">
                <h3 className="font-display text-2xl text-alabaster font-light mb-4">Location</h3>
                <div className="w-12 h-px bg-gold mb-5" />
                <div
                  className="w-full h-64 bg-charcoal/60 border border-silver/10 flex items-center justify-center"
                  style={{ position: 'relative', overflow: 'hidden' }}
                >
                  <iframe
                    title="Property Location"
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: 'grayscale(1) invert(0.9) contrast(0.85)' }}
                    loading="lazy"
                    src={`https://maps.google.com/maps?q=${property.lat},${property.lng}&z=15&output=embed`}
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right — Inquiry Form */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="sticky top-28 glass-card p-8"
            >
              {inquirySent ? (
                <div className="text-center py-8">
                  <div className="w-10 h-10 border border-gold/40 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-gold">✓</span>
                  </div>
                  <h3 className="font-display text-xl text-alabaster mb-2">Inquiry Sent</h3>
                  <p className="font-body text-xs text-alabaster/50">We'll be in touch within 24 hours.</p>
                  <button onClick={() => setInquirySent(false)} className="mt-5 font-body text-xs tracking-ultra uppercase text-gold hover:text-gold-light transition-colors">
                    Send Another
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="font-display text-xl text-alabaster font-light mb-1">Inquire About</h3>
                  <p className="font-body text-xs text-gold tracking-wide mb-6">{property.title}</p>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div>
                      <input {...register('name', { required: true })} placeholder="Full Name" className="input-luxury" />
                      {errors.name && <p className="text-gold text-xs mt-1">Required</p>}
                    </div>
                    <div>
                      <input {...register('email', { required: true })} placeholder="Email Address" type="email" className="input-luxury" />
                    </div>
                    <div>
                      <input {...register('phone')} placeholder="Phone Number" type="tel" className="input-luxury" />
                    </div>
                    <div>
                      <input {...register('address')} placeholder="Your Address (optional)" className="input-luxury" />
                    </div>
                    <div>
                      <textarea
                        {...register('message', { required: true })}
                        placeholder="Your Message"
                        rows={4}
                        className="input-luxury resize-none"
                        defaultValue={`I'm interested in ${property.title} (${formatPrice(property.price)})`}
                      />
                    </div>
                    <button type="submit" disabled={sending} className="btn-luxury btn-luxury-primary w-full justify-center">
                      {sending ? 'Sending...' : 'Send Inquiry'}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}