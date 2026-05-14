import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { FiPhone, FiMail, FiMapPin, FiClock } from 'react-icons/fi';
import PageHero from '../components/PageHero';
import SectionLabel from '../components/SectionLabel';
import contactService from '../services/api/contactService';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    await contactService.submitContactForm(data);
    setSubmitted(true);
    setLoading(false);
    reset();
  };

  return (
    <div className="bg-obsidian">
      <PageHero
        title="Contact Us"
        label="Get In Touch"
        subtitle="We'd love to hear from you"
        image="https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=1600&q=80"
      />

      <section className="py-28">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <SectionLabel label="Reach Out" title={<>Let's Start<br />A Conversation</>} />

              <div className="mt-10">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass-card p-10 text-center"
                  >
                    <div className="w-12 h-12 border border-gold/40 rounded-full flex items-center justify-center mx-auto mb-5">
                      <span className="text-gold text-xl">✓</span>
                    </div>
                    <h3 className="font-display text-2xl text-alabaster mb-3">Message Received</h3>
                    <p className="font-body text-sm text-alabaster/50">A member of our team will respond within 24 hours.</p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-6 font-body text-xs tracking-ultra uppercase text-gold hover:text-gold-light transition-colors"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                      <div>
                        <label className="font-body text-[10px] tracking-ultra uppercase text-alabaster/40 block mb-2">Name *</label>
                        <input {...register('name', { required: true })} placeholder="Your Full Name" className="input-luxury" />
                        {errors.name && <p className="text-gold text-xs mt-1">Required</p>}
                      </div>
                      <div>
                        <label className="font-body text-[10px] tracking-ultra uppercase text-alabaster/40 block mb-2">Email *</label>
                        <input {...register('email', { required: true, pattern: /^\S+@\S+$/i })} placeholder="your@email.com" type="email" className="input-luxury" />
                        {errors.email && <p className="text-gold text-xs mt-1">Valid email required</p>}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                      <div>
                        <label className="font-body text-[10px] tracking-ultra uppercase text-alabaster/40 block mb-2">Phone</label>
                        <input {...register('phone')} placeholder="+234 800 000 0000" type="tel" className="input-luxury" />
                      </div>
                      <div>
                        <label className="font-body text-[10px] tracking-ultra uppercase text-alabaster/40 block mb-2">Subject *</label>
                        <input {...register('subject', { required: true })} placeholder="How can we help?" className="input-luxury" />
                        {errors.subject && <p className="text-gold text-xs mt-1">Required</p>}
                      </div>
                    </div>
                    <div>
                      <label className="font-body text-[10px] tracking-ultra uppercase text-alabaster/40 block mb-2">Message *</label>
                      <textarea
                        {...register('message', { required: true })}
                        placeholder="Tell us about your real estate needs..."
                        rows={6}
                        className="input-luxury resize-none"
                      />
                      {errors.message && <p className="text-gold text-xs mt-1">Required</p>}
                    </div>
                    <button type="submit" disabled={loading} className="btn-luxury btn-luxury-primary">
                      {loading ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Right — Image + Info */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="relative mb-12"
              >
                <div className="overflow-hidden" style={{ borderRadius: '60% 0% 60% 0%', aspectRatio: '4/3' }}>
                  <img
                    src="https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=900&q=80"
                    alt="InkConcept Homes"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-obsidian/20" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="space-y-6"
              >
                {[
                  { Icon: FiPhone, label: 'Phone', value: '+234 800 123 4567', href: 'tel:+2348001234567' },
                  { Icon: FiMail, label: 'Email', value: 'info@inkconcepthomes.com', href: 'mailto:info@inkconcepthomes.com' },
                  { Icon: FiMapPin, label: 'Address', value: '14 Victoria Island Boulevard, Lagos, Nigeria', href: '#' },
                  { Icon: FiClock, label: 'Office Hours', value: 'Monday – Friday: 9AM – 6PM WAT', href: null },
                ].map(({ Icon, label, value, href }, i) => (
                  <div key={i} className="flex items-start gap-4 pb-5 border-b border-silver/10">
                    <div className="w-10 h-10 flex items-center justify-center border border-silver/20 flex-shrink-0">
                      <Icon size={14} className="text-gold" />
                    </div>
                    <div>
                      <p className="font-body text-[10px] tracking-ultra uppercase text-alabaster/30 mb-1">{label}</p>
                      {href ? (
                        <a href={href} className="font-body text-sm text-alabaster/70 hover:text-gold transition-colors">{value}</a>
                      ) : (
                        <p className="font-body text-sm text-alabaster/70">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-16 bg-charcoal/20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="border border-silver/10 overflow-hidden" style={{ height: 400 }}>
            <iframe
              title="InkConcept Homes Location"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(1) invert(0.85) contrast(0.9)' }}
              loading="lazy"
              src="https://maps.google.com/maps?q=Victoria+Island+Lagos&z=14&output=embed"
            />
          </div>
        </div>
      </section>
    </div>
  );
}