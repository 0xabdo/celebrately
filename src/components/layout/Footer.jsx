import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import logoImg from '../../../celebrately.jpg';

export default function Footer() {
  return (
    <footer className="bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 py-16 px-6 border-t border-slate-200/50 dark:border-slate-900/60 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-brand-500/5 dark:bg-brand-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-blue-500/5 dark:bg-blue-500/10 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center mb-12">
          {/* Logo & Slogan */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2.5 mb-4">
              <img src={logoImg} alt="Celebrately" className="w-8 h-8 rounded-full shadow-sm" />
              <span className="font-heading font-black text-xl tracking-tight text-slate-900 dark:text-white">Celebrately</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm max-w-sm leading-relaxed mx-auto md:mx-0">
              Premium digital invitation and RSVP platforms. Beautiful, accessible, and designed for your special occasions.
            </p>
          </div>

          {/* Quick links */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm font-medium">
            <Link to="/" className="hover:text-brand-500 dark:hover:text-brand-400 transition-colors">Templates</Link>
            <Link to="/wedding" className="hover:text-brand-500 dark:hover:text-brand-400 transition-colors">Wedding</Link>
            <Link to="/birthday" className="hover:text-brand-500 dark:hover:text-brand-400 transition-colors">Birthday</Link>
            <Link to="/baby-shower" className="hover:text-brand-500 dark:hover:text-brand-400 transition-colors">Baby Shower</Link>
            <Link to="/graduation" className="hover:text-brand-500 dark:hover:text-brand-400 transition-colors">Graduation</Link>
            <Link to="/party" className="hover:text-brand-500 dark:hover:text-brand-400 transition-colors">Party</Link>
            <Link to="/rsvp" className="hover:text-brand-500 dark:hover:text-brand-400 transition-colors">RSVP Hub</Link>
          </div>

          {/* Contact / Newsletter (Formal Whop Vibe) */}
          <div className="text-center md:text-right">
            <span className="text-xs uppercase tracking-wider font-bold text-slate-400 block mb-2">Designed for Creators</span>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-500 dark:text-slate-400 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
              ✨ Making Every Celebration Premium
            </div>
          </div>
        </div>

        <div className="w-full h-px bg-slate-200 dark:bg-slate-900 mb-8" />
        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Celebrately. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Crafted with <Heart size={12} className="text-brand-500 fill-brand-500 dark:text-brand-400 dark:fill-brand-400" /> for unforgettable memories.
          </p>
        </div>
      </div>
    </footer>
  );
}
