import React from 'react';
import { motion } from 'framer-motion';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Music, Headphones, Zap, MapPin, Clock, Users, ChevronDown, Star, Mic } from 'lucide-react';
import CountdownTimer from '../../components/ui/CountdownTimer';
import RSVPForm from '../../components/ui/RSVPForm';
import Gallery from '../../components/ui/Gallery';
import MapEmbed from '../../components/ui/MapEmbed';
import SectionHeading from '../../components/ui/SectionHeading';
import ShareButton from '../../components/ui/ShareButton';
import { useRSVP } from '../../hooks/useRSVP';
import { partyData as data } from '../../data/sampleData';

// Midnight Luxe palette — dark slate with champagne gold
const gold = '#C9A55A';
const midnight = '#0E1117';
const slate = '#161C27';
const card = '#1C2333';
const offWhite = '#F5F0E8';

const fadeUp = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 } };

const scheduleIcons = [Users, Clock, Headphones, Zap, Music];

function TrackItem({ track, index, playing, onClick }) {
  return (
    <motion.div {...fadeUp} transition={{ delay: index * 0.07 }}
      onClick={() => onClick(index)}
      className="flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all group"
      style={{ background: playing ? `${gold}18` : `${card}`, border: `1px solid ${playing ? gold : 'rgba(255,255,255,0.06)'}` }}
      whileHover={{ x: 4 }}>
      <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
        style={{ background: playing ? gold : 'rgba(255,255,255,0.07)' }}>
        {playing ? (
          <div className="flex items-end gap-px h-4">
            {[1, 1.5, 1].map((h, j) => (
              <motion.div key={j} className="w-1 rounded-t" style={{ background: midnight }}
                animate={{ scaleY: [h, 0.4, h] }} transition={{ repeat: Infinity, duration: 0.5, delay: j * 0.12 }} />
            ))}
          </div>
        ) : (
          <Music size={14} style={{ color: gold }} />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate" style={{ color: offWhite }}>{track}</p>
      </div>
      <span className="text-xs shrink-0" style={{ color: 'rgba(255,255,255,0.2)' }}>
        {`${Math.floor(Math.random() * 2 + 2)}:${String(Math.floor(Math.random() * 59)).padStart(2, '0')}`}
      </span>
    </motion.div>
  );
}

export default function PartyInvitation() {
  const { submitRSVP, status } = useRSVP('party-2026');
  const [playing, setPlaying] = React.useState(null);

  const toggle = (i) => setPlaying(playing === i ? null : i);

  return (
    <HelmetProvider>
      <div style={{ background: midnight }} className="min-h-screen">
        <Helmet>
          <title>{data.title} — {data.subtitle}</title>
          <meta name="description" content={`${data.title} — ${data.subtitle}`} />
        </Helmet>

        {/* ── HERO ── */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-24">
          <div className="absolute inset-0">
            <img src={data.heroPhoto} alt="Party" className="w-full h-full object-cover opacity-25" />
            <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, ${midnight}90, ${midnight})` }} />
          </div>

          {/* Subtle ambient orbs */}
          <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full pointer-events-none"
            style={{ background: `${gold}08`, filter: 'blur(80px)' }} />
          <div className="absolute bottom-1/4 right-1/4 w-60 h-60 rounded-full pointer-events-none"
            style={{ background: `rgba(100,120,200,0.07)`, filter: 'blur(80px)' }} />

          <div className="relative z-10 text-center max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="flex items-center justify-center gap-3 mb-8">
              <div className="h-px w-12" style={{ background: `${gold}60` }} />
              <span className="text-xs uppercase tracking-[0.5em] font-semibold" style={{ color: gold }}>
                You Are Invited
              </span>
              <div className="h-px w-12" style={{ background: `${gold}60` }} />
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
              className="font-display font-black mb-3" style={{ fontSize: 'clamp(3rem, 12vw, 8rem)', color: offWhite, letterSpacing: '-0.02em' }}>
              {data.title}
            </motion.h1>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
              className="text-lg mb-3" style={{ color: `${offWhite}70` }}>
              {data.subtitle}
            </motion.p>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
              className="flex flex-wrap justify-center gap-3 mb-12">
              {[data.theme, data.dressCode].map((tag, i) => (
                <span key={i} className="px-4 py-1.5 rounded-full text-xs font-semibold border"
                  style={{ borderColor: `${gold}50`, color: gold, background: `${gold}0e` }}>
                  {tag}
                </span>
              ))}
            </motion.div>

            {/* Countdown */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}
              className="rounded-2xl p-8 mb-10 border"
              style={{ background: 'rgba(255,255,255,0.03)', borderColor: `${gold}25`, backdropFilter: 'blur(12px)' }}>
              <CountdownTimer targetDate={data.date} accentColor={gold} bgClass="bg-white/5" textClass="text-white" label="Until the Night Begins" />
            </motion.div>

            <div className="flex flex-wrap justify-center gap-4">
              <motion.a href="#rsvp" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                className="px-8 py-3 rounded-full font-bold text-sm"
                style={{ background: `linear-gradient(135deg, ${gold}, #A88A42)`, color: midnight }}>
                Request Entry
              </motion.a>
              <ShareButton title={data.title} text={data.subtitle} accentColor={gold} />
            </div>
          </div>

          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2" style={{ color: `${gold}50` }}>
            <ChevronDown size={28} />
          </motion.div>
        </section>

        {/* ── SCHEDULE ── */}
        <section className="py-20 px-4" style={{ background: slate }}>
          <div className="max-w-2xl mx-auto">
            <SectionHeading title="Night Schedule" accentColor={gold} light />
            <div className="space-y-3">
              {data.schedule.map((item, i) => {
                const Icon = scheduleIcons[i % scheduleIcons.length];
                return (
                  <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.08, duration: 0.5 }}
                    className="flex items-center gap-5 p-5 rounded-2xl border"
                    style={{ background: card, borderColor: 'rgba(255,255,255,0.06)' }}
                    whileHover={{ x: 6 }}>
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${gold}18` }}>
                      <Icon size={18} style={{ color: gold }} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider mb-0.5" style={{ color: gold }}>{item.time}</p>
                      <p className="font-semibold" style={{ color: offWhite }}>{item.event}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── GALLERY ── */}
        <section className="py-20 px-4" style={{ background: midnight }}>
          <div className="max-w-5xl mx-auto">
            <SectionHeading title="Gallery" accentColor={gold} light />
            <Gallery images={data.gallery} columns={4} accentColor={gold} showTitle={false} />
          </div>
        </section>

        {/* ── PLAYLIST ── */}
        <section className="py-20 px-4" style={{ background: slate }}>
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-3 mb-10 justify-center">
              <Headphones size={20} style={{ color: gold }} />
              <SectionHeading title="Party Playlist" subtitle="What we'll be dancing to all night" accentColor={gold} light className="mb-0" />
            </div>
            <div className="space-y-2">
              {data.playlist.map((track, i) => (
                <TrackItem key={i} track={track} index={i} playing={playing === i} onClick={toggle} />
              ))}
            </div>
          </div>
        </section>

        {/* ── LOCATION ── */}
        <section className="py-20 px-4" style={{ background: midnight }}>
          <div className="max-w-3xl mx-auto">
            <SectionHeading title="The Venue" accentColor={gold} light />
            <div className="rounded-3xl overflow-hidden border" style={{ borderColor: `${gold}20` }}>
              <MapEmbed address={data.location.address} title={data.location.name} accentColor={gold} />
            </div>
          </div>
        </section>

        {/* ── RSVP ── */}
        <section id="rsvp" className="py-20 px-4" style={{ background: slate }}>
          <div className="max-w-2xl mx-auto">
            <div className="rounded-3xl p-8 md:p-12 border" style={{ background: card, borderColor: `${gold}25` }}>
              <RSVPForm onSubmit={submitRSVP} status={status} accentColor={gold} accentColorHover="#A88A42"
                title="Request Entry" subtitle="Secure your spot on the guest list" />
            </div>
          </div>
        </section>

        <footer className="py-14 text-center border-t" style={{ borderColor: `${gold}20`, background: midnight }}>
          <Music size={24} className="mx-auto mb-4" style={{ color: gold }} />
          <p className="font-display font-black text-3xl mb-1" style={{ color: offWhite }}>{data.title}</p>
          <p className="text-sm" style={{ color: `${gold}80` }}>{data.location.name} · August 1, 2026</p>
        </footer>
      </div>
    </HelmetProvider>
  );
}
