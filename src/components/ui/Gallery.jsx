import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

function LightboxModal({ images, index, onClose, onPrev, onNext }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
      onClick={onClose}
    >
      <button
        className="absolute top-4 right-4 text-white/80 hover:text-white z-10 bg-white/10 rounded-full p-2 hover:bg-white/20 transition-colors"
        onClick={onClose}
      >
        <X size={24} />
      </button>

      <button
        className="absolute left-4 text-white/80 hover:text-white z-10 bg-white/10 rounded-full p-3 hover:bg-white/20 transition-colors"
        onClick={e => { e.stopPropagation(); onPrev(); }}
      >
        <ChevronLeft size={24} />
      </button>

      <motion.div
        key={index}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
        className="relative max-w-5xl max-h-[85vh] w-full"
        onClick={e => e.stopPropagation()}
      >
        <img
          src={images[index].src}
          alt={images[index].alt || `Photo ${index + 1}`}
          className="w-full h-full object-contain rounded-xl"
          style={{ maxHeight: '85vh' }}
        />
        {images[index].caption && (
          <div className="text-center text-white/70 text-sm mt-3">
            {images[index].caption}
          </div>
        )}
        <div className="text-center text-white/50 text-xs mt-2">
          {index + 1} / {images.length}
        </div>
      </motion.div>

      <button
        className="absolute right-4 text-white/80 hover:text-white z-10 bg-white/10 rounded-full p-3 hover:bg-white/20 transition-colors"
        onClick={e => { e.stopPropagation(); onNext(); }}
      >
        <ChevronRight size={24} />
      </button>
    </motion.div>
  );
}

export default function Gallery({
  images = [],
  columns = 3,
  accentColor = '#d4913a',
  title = 'Our Gallery',
  showTitle = true,
}) {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const isOpen = lightboxIndex !== null;

  function prev() {
    setLightboxIndex(i => (i <= 0 ? images.length - 1 : i - 1));
  }

  function next() {
    setLightboxIndex(i => (i >= images.length - 1 ? 0 : i + 1));
  }

  return (
    <>
      {showTitle && (
        <div className="text-center mb-10">
          <h2 className="text-4xl font-display font-bold text-gray-900 dark:text-white mb-2">{title}</h2>
          <div className="w-16 h-1 rounded-full mx-auto mt-4" style={{ background: accentColor }} />
        </div>
      )}

      <div
        className="grid gap-3 md:gap-4"
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      >
        {images.map((img, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.08, duration: 0.5 }}
            className="group relative overflow-hidden rounded-xl cursor-pointer aspect-square"
            onClick={() => setLightboxIndex(idx)}
            style={{ gridRow: img.tall ? 'span 2' : 'span 1' }}
          >
            <img
              src={img.src}
              alt={img.alt || `Photo ${idx + 1}`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
              <ZoomIn
                size={32}
                className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg"
              />
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {isOpen && (
          <LightboxModal
            images={images}
            index={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onPrev={prev}
            onNext={next}
          />
        )}
      </AnimatePresence>
    </>
  );
}
