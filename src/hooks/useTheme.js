import { useEffect } from 'react';

export function useTheme() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark');
    localStorage.setItem('celebrately-theme', 'light');
  }, []);

  const toggleTheme = () => {};

  return { theme: 'light', toggleTheme, isDark: false };
}
