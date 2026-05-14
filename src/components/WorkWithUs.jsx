import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import contactService from '../services/api/contactService';
import SectionLabel from './SectionLabel';
const images = import.meta.glob('../assets/images/*.{png,jpg,jpeg,svg}', { eager: true });

const SLIDESHOW_IMAGES = [
  images['../assets/images/home-slide-show1.jpeg'].default,
  images['../assets/images/home-slide-show2.jpeg'].default,
  images['../assets/images/home-slide-show3.jpeg'].default,
  images['../assets/images/home-slide-show4.jpeg'].default,
];

export default function WorkWithUs() {
  const [current, setCurrent] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % SLIDESHOW_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const onSubmit = async (data) => {
    setLoading(true);
    await contactService.submitContactForm(data);
    setSubmitted(true);
    setLoading(false);
    reset();
  };

  return (
    <section className="relative min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Slideshow Background */}
      <AnimatePresence mode="sync">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${SLIDESHOW_IMAGES[current]})` }}
        />
      </AnimatePresence>

      {/* Overlay */}
      <div className="absolute inset-0 bg-obsidian/75" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <SectionLabel
              label="Begin Your Journey"
              title={<>Work<br />With Us</>}
              subtitle="Our dedicated team of luxury property specialists is ready to guide you through every step of your real estate journey with precision and care."
            />
            <div className="mt-8 space-y-4">
              {['Expert Market Knowledge', 'Discreet & Professional Service', 'Global Network, Local Expertise'].map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3 text-alabaster/60"
                >
                  <div className="w-5 h-px bg-gold" />
                  <span className="font-body text-sm tracking-wide">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="glass-card p-8 lg:p-10"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="w-12 h-12 border border-gold/40 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-5 h-px bg-gold rotate-45 absolute" />
                  <span className="text-gold text-xl">✓</span>
                </div>
                <h3 className="font-display text-2xl text-alabaster mb-2">Message Received</h3>
                <p className="font-body text-sm text-alabaster/50">We will be in touch within 24 hours.</p>
                <button onClick={() => setSubmitted(false)} className="mt-6 font-body text-xs tracking-ultra uppercase text-gold hover:text-gold-light transition-colors">
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <h3 className="font-display text-2xl text-alabaster font-light mb-6">Get In Touch</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <input
                      {...register('name', { required: true })}
                      placeholder="Full Name"
                      className="input-luxury"
                    />
                    {errors.name && <p className="text-gold text-xs mt-1">Required</p>}
                  </div>
                  <div>
                    <input
                      {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                      placeholder="Email Address"
                      type="email"
                      className="input-luxury"
                    />
                    {errors.email && <p className="text-gold text-xs mt-1">Valid email required</p>}
                  </div>
                </div>
                <div>
                  <input
                    {...register('phone')}
                    placeholder="Phone Number"
                    type="tel"
                    className="input-luxury"
                  />
                </div>
                <div>
                  <textarea
                    {...register('message', { required: true })}
                    placeholder="Your Message"
                    rows={4}
                    className="input-luxury resize-none"
                  />
                  {errors.message && <p className="text-gold text-xs mt-1">Required</p>}
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-luxury btn-luxury-primary w-full justify-center"
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}