import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Copy, Check, ExternalLink } from 'lucide-react';

export default function MapEmbed({
  address = '',
  mapsUrl = '',
  embedUrl = '',
  title = 'Location',
  accentColor = '#d4913a',
}) {
  const [copied, setCopied] = useState(false);

  function copyAddress() {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const defaultEmbedUrl = embedUrl || `https://maps.google.com/maps?q=${encodeURIComponent(address)}&output=embed&z=15`;
  const defaultMapsUrl = mapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  return (
    <div className="w-full">
      {/* Address card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex items-start gap-4 mb-6 p-5 bg-white dark:bg-gray-800 rounded-2xl shadow-card"
      >
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: `${accentColor}20` }}
        >
          <MapPin size={22} style={{ color: accentColor }} />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{title}</h4>
          <p className="text-gray-600 dark:text-gray-300 text-sm">{address}</p>
        </div>
        <div className="flex gap-2 shrink-0">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={copyAddress}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            title="Copy address"
          >
            {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} className="text-gray-500" />}
          </motion.button>
          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            href={defaultMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            title="Open in Google Maps"
          >
            <ExternalLink size={16} className="text-gray-500" />
          </motion.a>
        </div>
      </motion.div>

      {/* Map embed */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative w-full rounded-2xl overflow-hidden shadow-premium"
        style={{ height: '350px' }}
      >
        <iframe
          src={defaultEmbedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Map of ${title}`}
        />
        {/* Gradient overlay for style */}
        <div
          className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.1), transparent)' }}
        />
      </motion.div>

      {/* Get directions button */}
      <motion.a
        href={defaultMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center justify-center gap-2 w-full mt-4 py-3 rounded-xl font-semibold text-sm text-white transition-all duration-300"
        style={{ background: `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)` }}
      >
        <MapPin size={16} />
        Get Directions
      </motion.a>
    </div>
  );
}
