import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPhone, FiMail, FiMenu, FiX } from 'react-icons/fi';
import { useScrolled } from '../hooks/useScrolled';
import logoImage from '../assets/images/logo.png';
import { FiFacebook, FiInstagram, FiLinkedin, FiTwitter, FiYoutube } from 'react-icons/fi';

const LOGO_URL = {logoImage};

const NAV_LINKS = [
{ label: 'Home', path: '/' },
{ label: 'About', path: '/about' },
{ label: 'Search', path: '/search' },
{ label: 'Properties', path: '/properties' },
{ label: 'Communities', path: '/communities' },
{ label: 'Contact', path: '/contact' }];


const SOCIALS = [
  { label: 'Facebook', href: '#', icon: FiFacebook },
  { label: 'Instagram', href: '#', icon: FiInstagram },
  { label: 'LinkedIn', href: '#', icon: FiLinkedin },
  { label: 'Twitter', href: '#', icon: FiTwitter },
  { label: 'YouTube', href: '#', icon: FiYoutube }];


export default function Navbar() {
  const { scrolled } = useScrolled(60);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) =>
  path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-[9999] transition-all duration-500"
        style={{
          background: scrolled ? 'rgba(13,13,13,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '0.5px solid rgba(226,226,226,0.08)' : 'none',
          padding: scrolled ? '0.75rem 0' : '1.25rem 0',
          boxShadow: scrolled ? '0 4px 40px rgba(0,0,0,0.4)' : 'none'
        }}>
        
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex-shrink-0">
             <div className=" scale-125 rounded-full flex items-center justify-center"> <img src={logoImage} alt="InkConcept Homes" className="h-12 w-32 object-contain opacity-100" style={{ filter: 'brightness(1) invert(0)' }} /></div>
            </Link>

            <div className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map(({ label, path }) =>
              <Link key={path} to={path}
              className={`font-body text-xs tracking-ultra uppercase transition-colors duration-300 luxury-underline ${isActive(path) ? 'text-gold' : 'text-alabaster/80 hover:text-alabaster'}`}>
                  {label}
                </Link>
              )}
            </div>

            <div className="hidden lg:flex items-center gap-6">
              <motion.div className="flex items-center gap-3"
              animate={{ opacity: scrolled ? 0 : 1 }}
              transition={{ duration: 0.3 }}
              style={{ pointerEvents: scrolled ? 'none' : 'auto' }}>
                
                {SOCIALS.map(({ icon: Icon, label, href }) =>
                <a key={label} href={href} aria-label={label}
                className="font-body text-[10px] text-alabaster/40 hover:text-gold transition-colors duration-300"><Icon size={20} /></a>
                )}
              </motion.div>
              <div className="w-px h-4 bg-silver/20" />
              <a href="tel:+2348001234567" className="flex items-center gap-2 text-alabaster/70 hover:text-gold transition-colors duration-300">
                <FiPhone size={13} />
                <span className="font-body text-xs tracking-wider">+234 800 123 4567</span>
              </a>
            </div>

            <button className="lg:hidden text-alabaster/80 hover:text-gold transition-colors" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
              {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen &&
        <motion.div
          initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
          transition={{ type: 'tween', duration: 0.35, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9998] flex flex-col"
          style={{ background: 'rgba(13,13,13,0.98)', backdropFilter: 'blur(20px)' }}>
          
            <div className="flex items-center justify-between p-6 pt-8">
              <img src={LOGO_URL} alt="InkConcept Homes" className="h-10 w-auto object-contain" style={{ filter: 'brightness(1) invert(0)' }} />
              <button onClick={() => setMobileOpen(false)} className="text-alabaster/70 hover:text-gold"><FiX size={24} /></button>
            </div>
            <div className="flex-1 flex flex-col justify-center px-8 gap-8">
              {NAV_LINKS.map(({ label, path }, i) =>
            <motion.div key={path} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}>
                  <Link to={path} onClick={() => setMobileOpen(false)}
              className={`font-display text-4xl font-light tracking-wide transition-colors ${isActive(path) ? 'text-gold' : 'text-alabaster/80 hover:text-gold'}`}>
                    {label}
                  </Link>
                </motion.div>
            )}
            </div>
            <div className="p-8 border-t border-silver/10 flex flex-col gap-4">
              <a href="tel:+2348001234567" className="flex items-center gap-3 text-alabaster/60 hover:text-gold transition-colors">
                <FiPhone size={14} /><span className="font-body text-sm tracking-wider">+234 800 123 4567</span>
              </a>
              <a href="mailto:info@inkconcepthomes.com" className="flex items-center gap-3 text-alabaster/60 hover:text-gold transition-colors">
                <FiMail size={14} /><span className="font-body text-sm tracking-wider">info@inkconcepthomes.com</span>
              </a>
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </>);

}