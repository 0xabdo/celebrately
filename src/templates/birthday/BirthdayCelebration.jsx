import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Cake, MapPin, Clock, Gift, Mic, Music, Camera, Users, ChevronDown, Star } from 'lucide-react';
import CountdownTimer from '../../components/ui/CountdownTimer';
import RSVPForm from '../../components/ui/RSVPForm';
import Gallery from '../../components/ui/Gallery';
import MapEmbed from '../../components/ui/MapEmbed';
import GuestMessages from '../../components/ui/GuestMessages';
import SectionHeading from '../../components/ui/SectionHeading';
import ShareButton from '../../components/ui/ShareButton';
import { useRSVP } from '../../hooks/useRSVP';
import { birthdayData as data } from '../../data/sampleData';

// Champagne gold palette — elegant soirée
const gold = '#C9A55A';
const dark = '#1C1409';
const cream = '#FBF7F0';
const charcoal = '#2A2520';

const fadeUp = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 } };

function AgeDisplay({ age }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = age / 50;
    const timer = setInterval(() => {
      start += step;
      if (start >= age) { setCount(age); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 24);
    return () => clearInterval(timer);
  }, [age]);

  return (
    <div className="relative inline-block">
      <div
        className="w-44 h-44 rounded-full flex flex-col items-center justify-center shadow-2xl border-4"
        style={{ background: `linear-gradient(135deg, ${charcoal}, #3A3028)`, borderColor: `${gold}60` }}
      >
        <span className="font-display font-black text-7xl leading-none" style={{ color: gold }}>{count}</span>
        <span className="text-xs uppercase tracking-widest font-medium mt-1" style={{ color: `${gold}80` }}>years</span>
      </div>
      {[...Array(6)].map((_, i) => (
        <motion.div key={i} className="absolute w-1.5 h-1.5 rounded-full"
          style={{
            background: gold,
            top: `${50 + 52 * Math.sin(i * Math.PI / 3)}%`,
            left: `${50 + 52 * Math.cos(i * Math.PI / 3)}%`,
          }}
          animate={{ scale: [1, 1.6, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2, delay: i * 0.3 }}
        />
      ))}
    </div>
  );
}

const scheduleIcons = [Users, Clock, Mic, Cake, Music];

export default function BirthdayCelebration() {
  const { submitRSVP, status } = useRSVP('birthday-2026');

  return (
    <HelmetProvider>
      <div style={{ background: cream }} className="min-h-screen dark:bg-gray-900">
        <Helmet>
          <title>{data.name} — {data.age}th Birthday Celebration</title>
          <meta name="description" content={`Celebrating ${data.name}'s ${data.age}th birthday. Join us for an elegant evening.`} />
        </Helmet>

        {/* ── HERO ── */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img src={data.heroPhoto} alt="Birthday" className="w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(28,20,9,0.6) 0%, rgba(28,20,9,0.85) 100%)' }} />
          </div>

          {/* Subtle gold dust particles */}
          {[...Array(10)].map((_, i) => (
            <motion.div key={i} className="absolute w-px h-px rounded-full pointer-events-none"
              style={{ left: `${i * 10 + 5}%`, background: gold, boxShadow: `0 0 6px 3px ${gold}60` }}
              animate={{ y: ['100vh', '-20px'], opacity: [0, 0.8, 0] }}
              transition={{ duration: Math.random() * 4 + 5, repeat: Infinity, delay: Math.random() * 5, ease: 'easeOut' }}
            />
          ))}

          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="flex items-center justify-center gap-3 mb-6">
              <Star size={14} style={{ color: gold }} fill={gold} />
              <span className="text-xs uppercase tracking-[0.5em] font-semibold" style={{ color: gold }}>
                An Elegant Evening
              </span>
              <Star size={14} style={{ color: gold }} fill={gold} />
            </motion.div>

            <motion.h1 initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }}
              className="font-display font-black text-white mb-3" style={{ fontSize: 'clamp(3.5rem, 12vw, 8rem)' }}>
              {data.name}
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
              className="text-lg mb-2" style={{ color: `${gold}cc` }}>
              {data.tagline}
            </motion.p>

            {/* Age display */}
            <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9, type: 'spring', stiffness: 140 }}
              className="flex justify-center my-10">
              <AgeDisplay age={data.age} />
            </motion.div>

            {/* Countdown */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}
              className="rounded-2xl p-8 mb-8 border"
              style={{ background: 'rgba(255,255,255,0.05)', borderColor: `${gold}30`, backdropFilter: 'blur(12px)' }}>
              <CountdownTimer targetDate={data.date} accentColor={gold} bgClass="bg-white/8" textClass="text-white" label="Until the Celebration" />
            </motion.div>

            <div className="flex flex-wrap justify-center gap-4">
              <motion.a href="#rsvp" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                className="px-8 py-3 rounded-full font-bold text-sm"
                style={{ background: gold, color: dark }}>
                Reserve Your Seat
              </motion.a>
              <ShareButton title={`${data.name}'s ${data.age}th Birthday`} text="Join us for an elegant birthday celebration!" accentColor={gold} />
            </div>
          </div>

          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40">
            <ChevronDown size={28} />
          </motion.div>
        </section>

        {/* ── SCHEDULE ── */}
        <section className="py-20 px-4 bg-white dark:bg-gray-900">
          <div className="max-w-2xl mx-auto">
            <SectionHeading title="Evening Schedule" subtitle="A carefully curated evening" accentColor={gold} />
            <div className="space-y-3">
              {data.schedule.map((item, i) => {
                const Icon = scheduleIcons[i % scheduleIcons.length];
                return (
                  <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.08, duration: 0.5 }}
                    className="flex items-center gap-5 p-5 rounded-2xl border bg-white dark:bg-gray-800"
                    style={{ borderColor: `${gold}20` }}>
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${gold}15` }}>
                      <Icon size={18} style={{ color: gold }} />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-semibold uppercase tracking-wider mb-0.5" style={{ color: gold }}>{item.time}</p>
                      <p className="font-semibold text-gray-800 dark:text-white">{item.event}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── GALLERY ── */}
        <section className="py-20 px-4" style={{ background: cream }}>
          <div className="max-w-5xl mx-auto">
            <SectionHeading title="Photo Gallery" subtitle="Captured memories" accentColor={gold} />
            <Gallery images={data.gallery} columns={3} accentColor={gold} showTitle={false} />
          </div>
        </section>

        {/* ── LOCATION ── */}
        <section className="py-20 px-4 bg-white dark:bg-gray-900">
          <div className="max-w-3xl mx-auto">
            <SectionHeading title="The Venue" accentColor={gold} />
            <MapEmbed address={data.location.address} title={data.location.name} accentColor={gold} />
          </div>
        </section>

        {/* ── GIFT WISHLIST ── */}
        <section className="py-20 px-4" style={{ background: cream }}>
          <div className="max-w-2xl mx-auto text-center">
            <SectionHeading title="Gift Wishlist" subtitle="If you wish to give, here are some ideas" accentColor={gold} />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {data.gifts.map((gift, i) => (
                <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.08 }} whileHover={{ y: -3 }}
                  className="p-5 rounded-2xl border bg-white dark:bg-gray-800"
                  style={{ borderColor: `${gold}20` }}>
                  <Gift size={18} className="mx-auto mb-2" style={{ color: gold }} />
                  <span className="text-gray-700 dark:text-gray-300 text-xs font-medium">{gift}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── RSVP ── */}
        <section id="rsvp" className="py-20 px-4 bg-white dark:bg-gray-900">
          <div className="max-w-2xl mx-auto">
            <div className="rounded-3xl p-8 md:p-12 border" style={{ borderColor: `${gold}25` }}>
              <RSVPForm onSubmit={submitRSVP} status={status} accentColor={gold} accentColorHover="#A88A42"
                title="RSVP" subtitle="Kindly respond by July 5, 2026" />
            </div>
          </div>
        </section>

        {/* ── MESSAGES ── */}
        <section className="py-20 px-4" style={{ background: cream }}>
          <div className="max-w-2xl mx-auto">
            <GuestMessages messages={[]} accentColor={gold} title="Birthday Wishes"
              subtitle="Leave a personal message for the birthday celebrant"
              placeholder="Write your birthday wishes here..." />
          </div>
        </section>

        <footer className="py-14 text-center border-t" style={{ borderColor: `${gold}20`, background: charcoal }}>
          <Cake size={28} className="mx-auto mb-4" style={{ color: gold }} />
          <p className="font-display font-bold text-3xl mb-1 text-white">{data.name}</p>
          <p className="text-sm" style={{ color: `${gold}90` }}>Celebrating {data.age} years</p>
        </footer>
      </div>
    </HelmetProvider>
  );
}
