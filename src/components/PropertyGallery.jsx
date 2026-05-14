import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export default function PropertyGallery({ images }) {
  const [lightbox, setLightbox] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);

  const open = (idx) => { setActiveIdx(idx); setLightbox(true); };
  const close = () => setLightbox(false);
  const prev = () => setActiveIdx((activeIdx - 1 + images.length) % images.length);
  const next = () => setActiveIdx((activeIdx + 1) % images.length);

  return (
    <>
      {/* Gallery Grid */}
      <div className="grid grid-cols-3 gap-2">
        <div className="col-span-2 row-span-2 overflow-hidden cursor-pointer" onClick={() => open(0)}>
          <img src={images[0]} alt="Main" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" style={{ minHeight: 360 }} loading="lazy" />
        </div>
        {images.slice(1, 5).map((img, i) => (
          <div key={i} className="overflow-hidden cursor-pointer aspect-[4/3]" onClick={() => open(i + 1)}>
            <img src={img} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" loading="lazy" />
          </div>
        ))}
        {images[5] && (
          <div className="relative overflow-hidden cursor-pointer aspect-[4/3]" onClick={() => open(5)}>
            <img src={images[5]} alt="Gallery 5" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" loading="lazy" />
            <div className="absolute inset-0 bg-obsidian/60 flex items-center justify-center">
              <span className="font-body text-xs tracking-ultra uppercase text-alabaster">+{images.length - 5} More</span>
            </div>
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] bg-obsidian/97 flex items-center justify-center"
            style={{ backdropFilter: 'blur(20px)' }}
            onClick={close}
          >
            <button onClick={close} className="absolute top-6 right-6 text-alabaster/60 hover:text-alabaster z-10">
              <FiX size={28} />
            </button>
            <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-6 text-alabaster/60 hover:text-gold z-10">
              <FiChevronLeft size={36} />
            </button>
            <motion.img
              key={activeIdx}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 }}
              src={images[activeIdx]}
              alt={`Gallery ${activeIdx}`}
              className="max-h-[85vh] max-w-[90vw] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-6 text-alabaster/60 hover:text-gold z-10">
              <FiChevronRight size={36} />
            </button>
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setActiveIdx(i); }}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === activeIdx ? 'bg-gold w-6' : 'bg-alabaster/30'}`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}