'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextType>({ theme: 'dark', toggle: () => {} });

export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    // Sync React state with the class already applied by the anti-flash script
    const current = document.documentElement.classList.contains('light') ? 'light' : 'dark';
    setTheme(current);
  }, []);

  const apply = (t: Theme) => {
    setTheme(t);
    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.classList.add(t);
    try { localStorage.setItem('rk-theme', t); } catch {}
  };

  return (
    <ThemeContext.Provider value={{ theme, toggle: () => apply(theme === 'dark' ? 'light' : 'dark') }}>
      {children}
    </ThemeContext.Provider>
  );
}
