'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const DarkModeContext = createContext();

export function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      setIsDarkMode(savedMode === 'true');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDark);
    }
  }, []);

  useEffect(() => {
    console.log('Effect running - mounted:', mounted, 'isDarkMode:', isDarkMode);
    if (!mounted) return;

    console.log('Applying theme change to DOM, isDarkMode:', isDarkMode);
    console.log('Current HTML classes BEFORE:', document.documentElement.className);
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      console.log('Added dark class');
    } else {
      document.documentElement.classList.remove('dark');
      console.log('Removed dark class');
    }
    console.log('Current HTML classes AFTER:', document.documentElement.className);
    localStorage.setItem('darkMode', isDarkMode.toString());
  }, [isDarkMode, mounted]);

  const toggleDarkMode = () => {
    console.log('Toggle called, current isDarkMode:', isDarkMode);
    setIsDarkMode(prev => {
      console.log('Previous value:', prev, 'New value:', !prev);
      return !prev;
    });
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined) {
    throw new Error('useDarkMode must be used within a DarkModeProvider');
  }
  return context;
}
