import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WorkWithUs from '../components/WorkWithUs';
import BackToTop from '../components/BackToTop';
import ScrollToTop from '../components/ScrollToTop';


export default function MainLayout() {
  const location = useLocation();

  return (
       <div className="min-h-screen bg-obsidian">
      <Navbar />

      <main>
        
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Outlet />
          </motion.div>
       

        <WorkWithUs />
        <Footer />
      </main>

      <BackToTop />
    </div>
  );
}