import React from 'react';
import { Link } from 'react-router-dom';
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi';
import logoImage from '../assets/images/logo.png';
import { FiFacebook, FiInstagram, FiLinkedin, FiTwitter, FiYoutube } from 'react-icons/fi';


const LINKS = [
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


export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-obsidian border-t border-silver/10">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="flex flex-col gap-6">
            <img src={logoImage} alt="InkConcept Homes" className="h-14 w-auto scale-[1.8] object-contain self-start" style={{ filter: 'brightness(1) invert(0)' }} />
            <p className="font-body text-sm text-alabaster/40 leading-relaxed max-w-xs">
              Curating Nigeria's most distinguished residential addresses. Where precision meets luxury.
            </p>
            <div className="w-12 h-px bg-gold/40" />
            <p className="font-body text-xs tracking-ultra uppercase text-gold/70">Where Precision Meets Luxury</p>
          </div>

          <div className="flex flex-col gap-6">
            <h4 className="font-body text-xs tracking-ultra uppercase text-alabaster/40">Navigation</h4>
            <div className="flex flex-col gap-3">
              {LINKS.map(({ label, path }) =>
              <Link key={path} to={path} className="font-body text-sm text-alabaster/60 hover:text-gold transition-colors duration-300 luxury-underline w-fit">{label}</Link>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <h4 className="font-body text-xs tracking-ultra uppercase text-alabaster/40">Contact</h4>
            <div className="flex flex-col gap-4">
              <a href="tel:+2348001234567" className="flex items-center gap-3 text-alabaster/60 hover:text-gold transition-colors group">
                <FiPhone size={14} className="text-gold/60 group-hover:text-gold" />
                <span className="font-body text-sm">+234 800 123 4567</span>
              </a>
              <a href="mailto:info@inkconcepthomes.com" className="flex items-center gap-3 text-alabaster/60 hover:text-gold transition-colors group">
                <FiMail size={14} className="text-gold/60 group-hover:text-gold" />
                <span className="font-body text-sm">info@inkconcepthomes.com</span>
              </a>
              <div className="flex items-start gap-3 text-alabaster/60">
                <FiMapPin size={14} className="text-gold/60 mt-0.5 flex-shrink-0" />
                <span className="font-body text-sm">14 Victoria Island Boulevard,<br />Lagos, Nigeria</span>
              </div>
              <p className="font-body text-xs text-alabaster/30 tracking-wider">RC Number: 1234567</p>
              <div className="flex items-center gap-3 mt-2">
                  {SOCIALS.map(({ icon: Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      aria-label={label}
                      className="w-8 h-8 flex items-center justify-center border border-silver/10 text-alabaster/40 hover:text-gold hover:border-gold/30 transition-all duration-300"
                    >
                      <Icon size={14} />
                    </a>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-silver/10 py-5">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-body text-xs text-alabaster/25 tracking-wider">© {year} InkConcept Homes. All rights reserved.</p>
          <p className="font-body text-xs text-alabaster/80 tracking-wider">Crafted with precision for discerning clients. A Project-Zeus.Sec Design.</p>
        </div>
      </div>
    </footer>);

}