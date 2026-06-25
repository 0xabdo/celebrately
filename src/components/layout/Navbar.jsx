import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import logoImg from '../../../celebrately.jpg';

const templates = [
  { name: 'Wedding Website', path: '/wedding' },
  { name: 'Wedding Invitation', path: '/invitation' },
  { name: 'Birthday', path: '/birthday' },
  { name: 'Baby Shower', path: '/baby-shower' },
  { name: 'Baby Announcement', path: '/baby-announcement' },
  { name: 'Graduation', path: '/graduation' },
  { name: 'Engagement', path: '/engagement' },
  { name: 'Party', path: '/party' },
  { name: 'RSVP Page', path: '/rsvp' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 15);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [location]);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-4 left-4 right-4 z-50 max-w-7xl mx-auto rounded-2xl border transition-all duration-300 ${
          scrolled
            ? 'glass-liquid-light dark:glass-liquid-dark border-slate-200/50 dark:border-slate-800/80 shadow-premium'
            : 'bg-white/40 dark:bg-slate-950/40 border-white/10 dark:border-slate-900/40 backdrop-blur-md'
        }`}
      >
        <div className="px-5 md:px-7 h-14 md:h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-brand-500/20 dark:border-brand-400/20 transition-transform duration-300 group-hover:scale-105">
              <img src={logoImg} alt="Celebrately" className="w-full h-full object-cover" />
            </div>
            <span className="font-heading font-extrabold text-base md:text-lg tracking-tight text-slate-900 dark:text-white">
              Celebrately
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1.5">
            <Link
              to="/"
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold tracking-wide uppercase transition-all duration-200 ${
                location.pathname === '/'
                  ? 'text-brand-500 bg-brand-50 dark:bg-brand-950/20 dark:text-brand-400'
                  : 'text-slate-600 dark:text-slate-300 hover:text-brand-500 dark:hover:text-brand-400 hover:bg-slate-50 dark:hover:bg-slate-900'
              }`}
            >
              Templates
            </Link>
            {templates.slice(0, 4).map(t => (
              <Link
                key={t.path}
                to={t.path}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold tracking-wide uppercase transition-all duration-200 ${
                  location.pathname === t.path
                    ? 'text-brand-500 bg-brand-50 dark:bg-brand-950/20 dark:text-brand-400'
                    : 'text-slate-600 dark:text-slate-300 hover:text-brand-500 dark:hover:text-brand-400 hover:bg-slate-50 dark:hover:bg-slate-900'
                }`}
              >
                {t.name}
              </Link>
            ))}
            
            <Link
              to="/rsvp"
              className="ml-2 px-4 py-1.5 rounded-xl text-xs font-bold text-white bg-[#2b3394] hover:bg-[#1d2370] transition-colors shadow-sm inline-flex items-center gap-1"
            >
              Live Demo <ArrowRight size={12} />
            </Link>
          </div>

          {/* Mobile */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setOpen(!open)}
              className="p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors border border-transparent hover:border-slate-200/50 dark:hover:border-slate-800"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-sm md:hidden"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 350, damping: 32 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-2xl border-l border-slate-200/50 dark:border-slate-800 md:hidden overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-2">
                    <img src={logoImg} alt="Celebrately" className="w-6 h-6 rounded-full" />
                    <span className="font-heading font-extrabold text-sm text-slate-900 dark:text-white">Templates</span>
                  </div>
                  <button 
                    onClick={() => setOpen(false)}
                    className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-white"
                  >
                    <X size={16} />
                  </button>
                </div>
                <div className="space-y-1">
                  <Link 
                    to="/" 
                    className="block px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide uppercase text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    🏠 Showcase Home
                  </Link>
                  <div className="h-px bg-slate-100 dark:bg-slate-800 my-2" />
                  {templates.map(t => (
                    <Link
                      key={t.path}
                      to={t.path}
                      className={`block px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide uppercase transition-all duration-200 ${
                        location.pathname === t.path
                          ? 'bg-brand-50 dark:bg-brand-950/20 text-brand-500 dark:text-brand-400 font-bold'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      {t.name}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
