import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { GraduationCap, Trophy, Award, Star, Briefcase, FileText, Calendar, MapPin, ChevronDown } from 'lucide-react';
import CountdownTimer from '../../components/ui/CountdownTimer';
import RSVPForm from '../../components/ui/RSVPForm';
import Gallery from '../../components/ui/Gallery';
import MapEmbed from '../../components/ui/MapEmbed';
import GuestMessages from '../../components/ui/GuestMessages';
import SectionHeading from '../../components/ui/SectionHeading';
import ShareButton from '../../components/ui/ShareButton';
import { useRSVP } from '../../hooks/useRSVP';
import { graduationData as data } from '../../data/sampleData';

const navy = '#1e3a8a';
const gold = '#d4a042';
const cream = '#f8f9fb';

const achievementIcons = [Trophy, Star, FileText, Briefcase];
const timelineIcons = [GraduationCap, Star, Briefcase, FileText, Trophy];

const fadeUp = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 } };

function AnimatedCounter({ target, label, icon: Icon }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let c = 0;
    const step = target / 55;
    const t = setInterval(() => {
      c += step;
      if (c >= target) { setCount(target); clearInterval(t); }
      else setCount(Math.floor(c));
    }, 18);
    return () => clearInterval(t);
  }, [target]);

  return (
    <motion.div {...fadeUp}
      className="flex flex-col items-center p-6 rounded-2xl border bg-white dark:bg-gray-800"
      style={{ borderColor: `${navy}20` }}>
      <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3" style={{ background: `${navy}12` }}>
        <Icon size={22} style={{ color: navy }} />
      </div>
      <div className="text-4xl font-black mb-1" style={{ color: navy }}>{count}+</div>
      <div className="text-xs text-gray-400 uppercase tracking-widest font-medium text-center">{label}</div>
    </motion.div>
  );
}

export default function Graduation() {
  const { submitRSVP, status } = useRSVP('graduation-2026');

  return (
    <HelmetProvider>
      <div className="bg-white dark:bg-gray-900 min-h-screen">
        <Helmet>
          <title>{data.name} — Graduation 2026</title>
          <meta name="description" content={`Celebrate ${data.name}'s graduation from ${data.university}.`} />
        </Helmet>

        {/* ── HERO ── */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-24">
          <div className="absolute inset-0">
            <img src={data.heroPhoto} alt="Graduation" className="w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: `linear-gradient(160deg, ${navy}f0 0%, ${navy}c0 50%, rgba(14,28,80,0.7) 100%)` }} />
          </div>

          {/* Subtle gold particles */}
          {[...Array(8)].map((_, i) => (
            <motion.div key={i} className="absolute pointer-events-none"
              style={{ left: `${i * 13 + 5}%`, top: `${(i * 17 + 10) % 80}%`, color: gold }}
              animate={{ y: [0, -18, 0], opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 3.5 + i * 0.4, repeat: Infinity, delay: i * 0.5 }}>
              <Star size={10 + (i % 3) * 4} fill={gold} />
            </motion.div>
          ))}

          <div className="relative z-10 text-center max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <GraduationCap size={56} className="mx-auto mb-4" style={{ color: gold }} />
              <p className="text-xs uppercase tracking-[0.5em] font-semibold mb-2" style={{ color: `${gold}cc` }}>Class of 2026</p>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
              className="font-display font-black text-white mb-3"
              style={{ fontSize: 'clamp(3rem, 10vw, 7rem)', letterSpacing: '-0.02em' }}>
              {data.name}
            </motion.h1>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
              className="text-base mb-1" style={{ color: `${gold}dd` }}>{data.degree}</motion.p>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
              className="text-white/50 text-sm mb-8">{data.university}</motion.p>

            {/* Graduate photo */}
            <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9, type: 'spring', stiffness: 150 }}
              className="w-32 h-32 rounded-full mx-auto mb-10 overflow-hidden border-4 shadow-xl"
              style={{ borderColor: gold }}>
              <img src={data.photo} alt={data.name} className="w-full h-full object-cover" />
            </motion.div>

            {/* Countdown */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}
              className="rounded-2xl p-8 mb-8 border"
              style={{ background: 'rgba(255,255,255,0.06)', borderColor: `${gold}35`, backdropFilter: 'blur(12px)' }}>
              <CountdownTimer targetDate={data.graduationDate} accentColor={gold} bgClass="bg-white/8" textClass="text-white" label="Until the Ceremony" />
            </motion.div>

            <div className="flex flex-wrap justify-center gap-4">
              <motion.a href="#rsvp" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                className="px-8 py-3 rounded-full font-bold text-sm"
                style={{ background: `linear-gradient(135deg, ${gold}, #b8862e)`, color: '#fff' }}>
                RSVP to Celebration
              </motion.a>
              <ShareButton title={`${data.name}'s Graduation!`}
                text={`Celebrating ${data.name}'s graduation from ${data.university}!`} accentColor={gold} />
            </div>
          </div>

          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30">
            <ChevronDown size={28} />
          </motion.div>
        </section>

        {/* ── ACHIEVEMENTS ── */}
        <section className="py-20 px-4" style={{ background: cream }}>
          <div className="max-w-4xl mx-auto">
            <SectionHeading title="Achievements" subtitle="Four years of dedication and excellence" accentColor={navy} tag="Milestones" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {data.achievements.map((a, i) => {
                const Icon = achievementIcons[i % achievementIcons.length];
                return (
                  <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1, duration: 0.5 }}
                    whileHover={{ y: -4 }}
                    className="p-5 rounded-2xl border text-center bg-white dark:bg-gray-800 shadow-card"
                    style={{ borderColor: `${gold}30` }}>
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ background: `${gold}15` }}>
                      <Icon size={20} style={{ color: gold }} />
                    </div>
                    <p className="font-semibold text-gray-800 dark:text-white text-sm leading-snug">{a.title}</p>
                  </motion.div>
                );
              })}
            </div>

            {/* Stat counters */}
            <div className="grid grid-cols-3 gap-4">
              <AnimatedCounter target={4} label="Years at MIT" icon={GraduationCap} />
              <AnimatedCounter target={12} label="Research Papers" icon={FileText} />
              <AnimatedCounter target={98} label="GPA Percentile" icon={Star} />
            </div>
          </div>
        </section>

        {/* ── TIMELINE ── */}
        <section className="py-20 px-4 bg-white dark:bg-gray-900">
          <div className="max-w-3xl mx-auto">
            <SectionHeading title="The Journey" subtitle="Four incredible years" accentColor={navy} />
            <div className="relative pl-6 border-l-2" style={{ borderColor: `${navy}20` }}>
              {data.timeline.map((item, i) => {
                const Icon = timelineIcons[i % timelineIcons.length];
                return (
                  <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="relative mb-10 last:mb-0 pl-8">
                    {/* Timeline dot */}
                    <div className="absolute -left-[2.35rem] w-10 h-10 rounded-xl flex items-center justify-center border-2 border-white dark:border-gray-900 shadow-md"
                      style={{ background: `linear-gradient(135deg, ${navy}, #3b82f6)` }}>
                      <Icon size={15} className="text-white" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest mb-1 block" style={{ color: gold }}>{item.year}</span>
                    <h4 className="font-display font-bold text-gray-900 dark:text-white mb-1">{item.title}</h4>
                    <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{item.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── GALLERY ── */}
        <section className="py-20 px-4" style={{ background: cream }}>
          <div className="max-w-5xl mx-auto">
            <SectionHeading title="Gallery" subtitle="Memories from the journey" accentColor={navy} />
            <Gallery images={data.gallery} columns={4} accentColor={navy} showTitle={false} />
          </div>
        </section>

        {/* ── PARTY LOCATION ── */}
        <section className="py-20 px-4 bg-white dark:bg-gray-900">
          <div className="max-w-3xl mx-auto">
            <SectionHeading title="Graduation Party" subtitle={data.party.location} accentColor={navy} />
            <div className="flex items-center gap-3 mb-6 p-4 rounded-xl border" style={{ borderColor: `${navy}15`, background: `${navy}06` }}>
              <Calendar size={16} style={{ color: navy }} />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">June 21, 2026 · 6:00 PM</span>
            </div>
            <MapEmbed address={data.party.location} title="Graduation Party Venue" accentColor={navy} />
          </div>
        </section>

        {/* ── RSVP ── */}
        <section id="rsvp" className="py-20 px-4" style={{ background: cream }}>
          <div className="max-w-2xl mx-auto">
            <RSVPForm onSubmit={submitRSVP} status={status} accentColor={navy} accentColorHover="#1e40af"
              title="RSVP to the Party" subtitle="June 21, 2026 · Boston, MA" />
          </div>
        </section>

        {/* ── MESSAGES ── */}
        <section className="py-20 px-4 bg-white dark:bg-gray-900">
          <div className="max-w-2xl mx-auto">
            <GuestMessages messages={[]} accentColor={navy} title="Congratulations Wall"
              subtitle="Share your congratulations for Michael"
              placeholder="Write your congratulations message..." />
          </div>
        </section>

        <footer className="text-center py-12 border-t border-gray-100 dark:border-gray-800">
          <GraduationCap size={36} className="mx-auto mb-3" style={{ color: navy }} />
          <p className="font-display text-xl font-bold text-gray-900 dark:text-white">{data.name}</p>
          <p className="text-gray-400 text-sm mt-1">{data.university} · Class of 2026</p>
        </footer>
      </div>
    </HelmetProvider>
  );
}
