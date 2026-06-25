import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCountdown } from '../../hooks/useCountdown';

function TimeCard({ value, label, accentColor = '#d4913a', bgClass = 'bg-white/10' }) {
  const [prevValue, setPrevValue] = useState(value);
  const [flipping, setFlipping] = useState(false);

  useEffect(() => {
    if (value !== prevValue) {
      setFlipping(true);
      const t = setTimeout(() => {
        setPrevValue(value);
        setFlipping(false);
      }, 300);
      return () => clearTimeout(t);
    }
  }, [value, prevValue]);

  return (
    <div className="flex flex-col items-center gap-2">
      <motion.div
        className={`${bgClass} rounded-2xl px-4 py-3 md:px-6 md:py-5 min-w-[70px] md:min-w-[90px] shadow-lg relative overflow-hidden`}
        style={{ border: `1px solid ${accentColor}40` }}
      >
        {/* Shimmer line */}
        <div
          className="absolute inset-x-0 top-1/2 h-px opacity-30"
          style={{ background: accentColor }}
        />
        <AnimatePresence mode="wait">
          <motion.div
            key={value}
            initial={{ rotateX: -90, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            exit={{ rotateX: 90, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-3xl md:text-5xl font-display font-bold text-center"
            style={{ color: accentColor }}
          >
            {String(value).padStart(2, '0')}
          </motion.div>
        </AnimatePresence>
      </motion.div>
      <span className="text-xs md:text-sm uppercase tracking-widest font-medium opacity-70">
        {label}
      </span>
    </div>
  );
}

export default function CountdownTimer({
  targetDate,
  accentColor = '#d4913a',
  bgClass = 'bg-white/10',
  textClass = 'text-gray-800 dark:text-white',
  showLabel = true,
  label = 'The countdown is on',
}) {
  const { days, hours, minutes, seconds, hasEnded } = useCountdown(targetDate);

  if (hasEnded) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-8"
      >
        <div className="text-4xl font-display font-bold mb-2" style={{ color: accentColor }}>
          🎉 The moment has arrived!
        </div>
        <p className="text-gray-500 dark:text-gray-400">The event is happening now</p>
      </motion.div>
    );
  }

  return (
    <div className="text-center">
      {showLabel && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-sm uppercase tracking-[0.3em] mb-6 font-medium ${textClass} opacity-60`}
        >
          {label}
        </motion.p>
      )}
      <div className="flex items-start justify-center gap-3 md:gap-6">
        <TimeCard value={days} label="Days" accentColor={accentColor} bgClass={bgClass} />
        <div className="text-3xl md:text-5xl font-bold mt-2 md:mt-3" style={{ color: accentColor }}>:</div>
        <TimeCard value={hours} label="Hours" accentColor={accentColor} bgClass={bgClass} />
        <div className="text-3xl md:text-5xl font-bold mt-2 md:mt-3" style={{ color: accentColor }}>:</div>
        <TimeCard value={minutes} label="Mins" accentColor={accentColor} bgClass={bgClass} />
        <div className="text-3xl md:text-5xl font-bold mt-2 md:mt-3" style={{ color: accentColor }}>:</div>
        <TimeCard value={seconds} label="Secs" accentColor={accentColor} bgClass={bgClass} />
      </div>
    </div>
  );
}
