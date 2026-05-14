import React from 'react';
import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AppProvider } from '@/context/AppContext';
import MainLayout from '@/layouts/MainLayout';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Search from '@/pages/Search';
import Properties from '@/pages/Properties';
import PropertyDetail from '@/pages/PropertyDetail';
import Communities from '@/pages/Communities';
import Contact from '@/pages/Contact';

function App() {
  return (
    <QueryClientProvider client={queryClientInstance}>
      <AppProvider>
        <Router>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/search" element={<Search />} />
              <Route path="/properties" element={<Properties />} />
              <Route path="/properties/:id" element={<PropertyDetail />} />
              <Route path="/communities" element={<Communities />} />
              <Route path="/contact" element={<Contact />} />
            </Route>
          </Routes>
        </Router>
      </AppProvider>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;