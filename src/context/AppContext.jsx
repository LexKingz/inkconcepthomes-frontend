import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [searchFilters, setSearchFilters] = useState({});
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <AppContext.Provider value={{
      searchFilters,
      setSearchFilters,
      isSearchOpen,
      setIsSearchOpen,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};