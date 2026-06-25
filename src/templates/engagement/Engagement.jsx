import React from 'react';
import { motion } from 'framer-motion';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Heart, Gift, Diamond, ChevronDown, Flower2 } from 'lucide-react';
import CountdownTimer from '../../components/ui/CountdownTimer';
import RSVPForm from '../../components/ui/RSVPForm';
import Gallery from '../../components/ui/Gallery';
import MapEmbed from '../../components/ui/MapEmbed';
import SectionHeading from '../../components/ui/SectionHeading';
import ShareButton from '../../components/ui/ShareButton';
import { useRSVP } from '../../hooks/useRSVP';
import { engagementData as data } from '../../data/sampleData';

const rose = '#C45C7A';
const blush = '#F4D0DB';
const cream = '#FEF8F9';
const dark = '#2A1020';

const fadeUp = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 } };

// Subtle floating hearts using SVG, not emoji
function FloatingHeart({ style }) {
  return (
    <motion.div className="absolute pointer-events-none" style={style}
      animate={{ y: [0, -32, 0], opacity: [0.12, 0.3, 0.12] }}
      transition={{ duration: Math.random() * 4 + 5, repeat: Infinity, delay: Math.random() * 3 }}>
      <Heart size={parseInt(style.size) || 16} style={{ color: rose }} fill={rose} />
    </motion.div>
  );
}

const hearts = Array.from({ length: 10 }, (_, i) => ({
  left: `${(i * 10 + 4) % 94}%`,
  top: `${(i * 12 + 6) % 82}%`,
  size: `${Math.random() * 14 + 10}`,
}));

export default function Engagement() {
  const { submitRSVP, status } = useRSVP('engagement-2026');

  return (
    <HelmetProvider>
      <div style={{ background: cream }} className="min-h-screen dark:bg-gray-900">
        <Helmet>
          <title>{data.partner1.name} &amp; {data.partner2.name} — We&apos;re Engaged</title>
          <meta name="description" content={`${data.partner1.name} & ${data.partner2.name} are engaged! Join us to celebrate.`} />
        </Helmet>

        {/* Floating hearts */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          {hearts.map((h, i) => <FloatingHeart key={i} style={h} />)}
        </div>

        {/* ── HERO ── */}
        <section className="relative min-h-screen flex items-center justify-center px-4 py-20 z-10">
          <div className="absolute inset-0">
            <img src={data.heroPhoto} alt="Engagement" className="w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, rgba(196,92,122,0.55), rgba(42,16,32,0.85))` }} />
          </div>

          <div className="relative z-10 text-center text-white max-w-3xl mx-auto">
            <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 180 }} className="mb-6">
              <motion.div animate={{ scale: [1, 1.12, 1] }} transition={{ repeat: Infinity, duration: 2.5 }}>
                <Diamond size={48} className="mx-auto" style={{ color: blush }} />
              </motion.div>
            </motion.div>

            <motion.p initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
              className="text-xs uppercase tracking-[0.5em] font-semibold mb-4" style={{ color: blush }}>
              We&apos;re Engaged
            </motion.p>

            <motion.h1 initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="font-script leading-tight drop-shadow-2xl mb-6"
              style={{ fontSize: 'clamp(3.5rem, 13vw, 8rem)' }}>
              {data.partner1.name} &amp; {data.partner2.name}
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}
              className="text-white/60 text-sm mb-10">
              Announced {data.announcementDate} · Join us to celebrate
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}
              className="rounded-2xl p-8 mb-8 border"
              style={{ background: 'rgba(255,255,255,0.07)', borderColor: `${blush}30`, backdropFilter: 'blur(12px)' }}>
              <CountdownTimer targetDate={data.partyDate} accentColor={blush} bgClass="bg-white/8" textClass="text-white" label="Until the Engagement Party" />
            </motion.div>

            <div className="flex flex-wrap justify-center gap-4">
              <motion.a href="#rsvp" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                className="px-8 py-3 rounded-full font-bold text-sm text-white"
                style={{ background: `linear-gradient(135deg, ${rose}, #9E3A5A)` }}>
                RSVP to Party
              </motion.a>
              <ShareButton title={`${data.partner1.name} & ${data.partner2.name} are Engaged!`}
                text="Celebrate with us!" accentColor={rose} />
            </div>
          </div>

          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30">
            <ChevronDown size={28} />
          </motion.div>
        </section>

        {/* ── COUPLE ── */}
        <section className="py-20 px-4 relative z-10 bg-white dark:bg-gray-900">
          <div className="max-w-3xl mx-auto">
            <SectionHeading title="The Happy Couple" accentColor={rose} />
            <div className="flex flex-col md:flex-row items-center justify-center gap-12">
              {[data.partner1, data.partner2].map((p, i) => (
                <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.2, duration: 0.6 }} className="text-center">
                  <div className="relative w-44 h-44 rounded-full overflow-hidden mx-auto shadow-premium border-4" style={{ borderColor: blush }}>
                    <img src={p.photo} alt={p.name} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="font-script text-4xl mt-5" style={{ color: dark }}>{p.name}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROPOSAL STORY ── */}
        <section className="py-20 px-4 relative z-10" style={{ background: cream }}>
          <div className="max-w-2xl mx-auto text-center">
            <SectionHeading title="The Proposal" subtitle="How it happened..." accentColor={rose} />
            <motion.div {...fadeUp}
              className="bg-white dark:bg-gray-800 rounded-3xl p-10 border shadow-card"
              style={{ borderColor: `${rose}20` }}>
              <Diamond size={32} className="mx-auto mb-5" style={{ color: rose }} />
              <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed italic">
                &ldquo;{data.proposalStory}&rdquo;
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── STORY TIMELINE ── */}
        <section className="py-20 px-4 relative z-10 bg-white dark:bg-gray-900">
          <div className="max-w-3xl mx-auto">
            <SectionHeading title="Our Story" accentColor={rose} />
            <div className="relative pl-6 border-l-2" style={{ borderColor: `${rose}20` }}>
              {data.story.map((item, i) => (
                <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="relative mb-10 last:mb-0 pl-8">
                  <div className="absolute -left-[2.35rem] w-10 h-10 rounded-full flex items-center justify-center border-4 border-white dark:border-gray-900 shadow-md"
                    style={{ background: `linear-gradient(135deg, ${rose}, #E8849A)` }}>
                    <Heart size={14} className="text-white" fill="white" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest mb-1 block" style={{ color: rose }}>{item.year}</span>
                  <h4 className="font-display font-bold text-gray-900 dark:text-white mb-1">{item.title}</h4>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── GALLERY ── */}
        <section className="py-20 px-4 relative z-10" style={{ background: cream }}>
          <div className="max-w-5xl mx-auto">
            <SectionHeading title="Gallery" accentColor={rose} />
            <Gallery images={data.gallery} columns={2} accentColor={rose} showTitle={false} />
          </div>
        </section>

        {/* ── LOCATION ── */}
        <section className="py-20 px-4 relative z-10 bg-white dark:bg-gray-900">
          <div className="max-w-3xl mx-auto">
            <SectionHeading title="Party Location" accentColor={rose} />
            <MapEmbed address={data.location.address} title={data.location.name} accentColor={rose} />
          </div>
        </section>

        {/* ── GIFT IDEAS ── */}
        <section className="py-20 px-4 relative z-10" style={{ background: cream }}>
          <div className="max-w-2xl mx-auto">
            <SectionHeading title="Gift Ideas" subtitle="Your presence is the best gift!" accentColor={rose} />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {data.gifts.map((g, i) => (
                <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.08 }} whileHover={{ y: -3 }}
                  className="p-5 bg-white dark:bg-gray-800 rounded-2xl border text-center shadow-card"
                  style={{ borderColor: `${rose}20` }}>
                  <Gift size={18} className="mx-auto mb-2" style={{ color: rose }} />
                  <span className="text-gray-600 dark:text-gray-300 text-xs font-medium">{g}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── RSVP ── */}
        <section id="rsvp" className="py-20 px-4 relative z-10 bg-white dark:bg-gray-900">
          <div className="max-w-2xl mx-auto">
            <RSVPForm onSubmit={submitRSVP} status={status} accentColor={rose} accentColorHover="#9E3A5A"
              title="RSVP" subtitle="Join us for our engagement party" />
          </div>
        </section>

        <footer className="py-14 text-center border-t relative z-10" style={{ borderColor: `${rose}15`, background: cream }}>
          <motion.div animate={{ scale: [1, 1.12, 1] }} transition={{ repeat: Infinity, duration: 2.5 }}>
            <Diamond size={28} className="mx-auto mb-4" style={{ color: rose }} />
          </motion.div>
          <p className="font-script text-4xl" style={{ color: dark }}>{data.partner1.name} &amp; {data.partner2.name}</p>
          <p className="text-gray-400 text-sm mt-1">Engaged {data.announcementDate}</p>
        </footer>
      </div>
    </HelmetProvider>
  );
}
