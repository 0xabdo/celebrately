import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useThemeContext } from '../../context/ThemeContext';

export default function ThemeToggle({ className = '' }) {
  const { isDark, toggleTheme } = useThemeContext();

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={`relative w-14 h-7 rounded-full transition-colors duration-300 focus:outline-none ${
        isDark ? 'bg-indigo-600' : 'bg-amber-400'
      } ${className}`}
      aria-label="Toggle theme"
    >
      <motion.div
        className="absolute top-1 w-5 h-5 rounded-full bg-white shadow-md flex items-center justify-center"
        animate={{ left: isDark ? '1.75rem' : '0.25rem' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        {isDark ? (
          <Moon size={11} className="text-indigo-600" />
        ) : (
          <Sun size={11} className="text-amber-500" />
        )}
      </motion.div>
    </motion.button>
  );
}
