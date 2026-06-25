import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Copy, Check, MessageCircle, Link, ExternalLink } from 'lucide-react';

export default function ShareButton({
  url,
  title = 'You are invited!',
  text = 'Join us to celebrate!',
  accentColor = '#d4913a',
  className = '',
}) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl = url || window.location.href;

  async function nativeShare() {
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url: shareUrl });
      } catch {}
    } else {
      setOpen(true);
    }
  }

  async function copyLink() {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const socials = [
    {
      name: 'X / Twitter',
      emoji: '𝕏',
      color: '#000000',
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: 'Facebook',
      emoji: 'f',
      color: '#1877f2',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: 'WhatsApp',
      emoji: '💬',
      color: '#25d366',
      href: `https://wa.me/?text=${encodeURIComponent(text + ' ' + shareUrl)}`,
    },
  ];

  return (
    <div className={`relative ${className}`}>
      <motion.button
        onClick={nativeShare}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm text-white transition-all"
        style={{ background: accentColor }}
      >
        <Share2 size={16} />
        Share
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 bg-white dark:bg-gray-800 rounded-2xl shadow-premium p-4 z-50 min-w-[200px]"
            >
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                Share via
              </p>
              <div className="grid grid-cols-3 gap-3 mb-3">
                {socials.map(s => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    <span className="text-xl font-bold" style={{ color: s.color }}>{s.emoji}</span>
                    <span className="text-xs text-gray-600 dark:text-gray-400">{s.name}</span>
                  </a>
                ))}
              </div>
              <button
                onClick={copyLink}
                className="w-full flex items-center gap-2 p-3 rounded-xl bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-sm text-gray-700 dark:text-gray-300"
              >
                {copied ? <Check size={16} className="text-green-500" /> : <Link size={16} />}
                {copied ? 'Copied!' : 'Copy Link'}
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
