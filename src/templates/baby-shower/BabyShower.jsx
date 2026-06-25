import React from 'react';
import { motion } from 'framer-motion';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Baby, Heart, Calendar, Clock, MapPin, Gift, Flower2, Star, Users, ChevronDown } from 'lucide-react';
import CountdownTimer from '../../components/ui/CountdownTimer';
import RSVPForm from '../../components/ui/RSVPForm';
import Gallery from '../../components/ui/Gallery';
import MapEmbed from '../../components/ui/MapEmbed';
import SectionHeading from '../../components/ui/SectionHeading';
import ShareButton from '../../components/ui/ShareButton';
import { useRSVP } from '../../hooks/useRSVP';
import { babyShowerData as data } from '../../data/sampleData';

const rose = '#B07463';
const sage = '#7A9E7E';
const cream = '#FEFAF5';
const heading = '#2D1F1A';

const fadeUp = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

function Divider() {
  return (
    <div className="flex items-center justify-center gap-5 my-12">
      <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, transparent, ${rose}50)` }} />
      <Flower2 size={14} style={{ color: rose }} />
      <Star size={8} style={{ color: rose }} fill={rose} />
      <Flower2 size={14} style={{ color: rose }} />
      <div className="flex-1 h-px" style={{ background: `linear-gradient(to left, transparent, ${rose}50)` }} />
    </div>
  );
}

function StatCard({ icon: Icon, label, value }) {
  return (
    <motion.div {...fadeUp}
      className="flex items-center gap-4 p-5 rounded-2xl border"
      style={{ borderColor: `${rose}25`, background: `${rose}08` }}
    >
      <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${rose}15` }}>
        <Icon size={18} style={{ color: rose }} />
      </div>
      <div>
        <p className="text-xs uppercase tracking-widest font-semibold mb-0.5 text-gray-400">{label}</p>
        <p className="font-semibold text-gray-800 dark:text-gray-100">{value}</p>
      </div>
    </motion.div>
  );
}

export default function BabyShower() {
  const { submitRSVP, status } = useRSVP('baby-shower');

  return (
    <HelmetProvider>
      <div className="min-h-screen bg-[#FEFAF5] dark:bg-gray-900">
        <Helmet>
          <title>Baby Shower — {data.parents.mom} & {data.parents.dad}</title>
          <meta name="description" content={`Join us for ${data.parents.mom} & ${data.parents.dad}'s baby shower.`} />
        </Helmet>

        {/* ── HERO: split layout ── */}
        <section className="relative min-h-screen grid md:grid-cols-2">
          {/* Photo column */}
          <div className="relative min-h-[55vh] md:min-h-full order-2 md:order-1">
            <img src={data.heroPhoto} alt="Baby Shower" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, rgba(122,158,126,0.72) 0%, rgba(45,31,26,0.55) 100%)' }} />
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5, duration: 0.9 }}
              className="absolute bottom-12 left-10 right-10">
              <p className="text-white/60 text-xs uppercase tracking-[0.4em] mb-3">A New Chapter</p>
              <h2 className="font-display text-4xl md:text-5xl text-white font-bold leading-tight">
                {data.parents.mom} &amp; {data.parents.dad}
              </h2>
              <p className="text-white/70 mt-2 text-sm">Are expecting a little miracle</p>
            </motion.div>
          </div>

          {/* Text column */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}
            className="flex flex-col justify-center px-10 md:px-16 py-24 order-1 md:order-2 bg-[#FEFAF5] dark:bg-gray-900">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }}>
              <div className="flex items-center gap-3 mb-5">
                <Flower2 size={16} style={{ color: rose }} />
                <span className="text-xs uppercase tracking-[0.35em] font-semibold" style={{ color: rose }}>
                  You're Invited
                </span>
              </div>
              <h1 className="font-script text-7xl md:text-8xl leading-none mb-6" style={{ color: heading }}>
                Baby<br />Shower
              </h1>
              <div className="w-10 h-1 rounded-full mb-8" style={{ background: rose }} />
              <p className="text-gray-500 dark:text-gray-400 text-base leading-relaxed max-w-sm mb-10">
                Please join us for an afternoon celebrating the arrival of something truly extraordinary — a new little life.
              </p>
              <div className="grid grid-cols-1 gap-3 mb-10 max-w-sm">
                <StatCard icon={Calendar} label="Date" value="Sunday, July 20, 2026" />
                <StatCard icon={Clock} label="Time" value="11:00 AM – 3:00 PM" />
                <StatCard icon={MapPin} label="Venue" value={data.location.name} />
              </div>
              <div className="flex flex-wrap gap-3">
                <motion.a href="#rsvp" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  className="px-7 py-3 rounded-full text-white text-sm font-semibold"
                  style={{ background: `linear-gradient(135deg, ${rose}, #96584A)` }}>
                  Kindly Reply
                </motion.a>
                <ShareButton title="Baby Shower Invitation" text="Join us for a baby shower!" accentColor={rose} />
              </div>
            </motion.div>
          </motion.div>

          {/* Scroll hint */}
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2.5 }}
            className="absolute bottom-6 right-1/2 translate-x-1/2 md:hidden text-white/50 z-10">
            <ChevronDown size={24} />
          </motion.div>
        </section>

        {/* ── COUNTDOWN ── */}
        <section className="py-20 px-4" style={{ background: '#F7F0E9' }}>
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Baby size={18} style={{ color: rose }} />
              <span className="text-xs uppercase tracking-widest font-semibold text-gray-400">Counting Down</span>
            </div>
            <h2 className="font-display text-3xl font-bold mb-10" style={{ color: heading }}>
              Until the Celebration
            </h2>
            <CountdownTimer targetDate={data.date} accentColor={rose} bgClass="bg-white" label="" showLabel={false} />
          </div>
        </section>

        {/* ── BABY NAME REVEAL ── */}
        <section className="py-20 px-4 bg-[#FEFAF5] dark:bg-gray-900">
          <div className="max-w-xl mx-auto">
            <motion.div {...fadeUp}
              className="rounded-3xl overflow-hidden border"
              style={{ borderColor: `${rose}25` }}
            >
              <div className="p-3" style={{ background: `linear-gradient(135deg, ${rose}, ${sage})` }}>
                <div className="flex items-center justify-center gap-2 text-white/80 text-xs uppercase tracking-widest font-semibold py-1">
                  <Baby size={14} />
                  Baby Name Reveal
                </div>
              </div>
              <div className="p-10 text-center bg-white dark:bg-gray-800">
                <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ background: `${rose}15` }}>
                  <Heart size={32} style={{ color: rose }} fill={rose} />
                </div>
                <h3 className="font-display text-3xl font-bold mb-3" style={{ color: heading }}>A Secret to Reveal</h3>
                <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto">
                  We're keeping the name close to our hearts until the shower. Join us to be the first to know!
                </p>
                <div className="flex justify-center gap-6 mt-8">
                  {[
                    { label: 'Boy', color: '#93C5FD' },
                    { label: '?', color: rose },
                    { label: 'Girl', color: '#F9A8D4' },
                  ].map((item, i) => (
                    <div key={i} className="text-center">
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-2 text-white font-bold text-sm" style={{ background: item.color }}>
                        {item.label === '?' ? <Baby size={20} /> : item.label}
                      </div>
                      <span className="text-xs text-gray-400">{item.label === '?' ? 'Surprise!' : item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <Divider />

        {/* ── EVENT DETAILS ── */}
        <section className="py-16 px-4 bg-[#FEFAF5] dark:bg-gray-900">
          <div className="max-w-3xl mx-auto">
            <SectionHeading title="Event Details" subtitle={`${data.theme} · Austin, Texas`} accentColor={rose} />
            <div className="grid md:grid-cols-2 gap-5">
              <StatCard icon={Calendar} label="Date" value="Sunday, July 20, 2026" />
              <StatCard icon={Clock} label="Time" value="11:00 AM – 3:00 PM" />
              <StatCard icon={MapPin} label="Venue" value={data.location.name} />
              <StatCard icon={Users} label="Dress" value="Garden party chic" />
            </div>
          </div>
        </section>

        {/* ── MAP ── */}
        <section className="py-16 px-4" style={{ background: '#F7F0E9' }}>
          <div className="max-w-3xl mx-auto">
            <SectionHeading title="Find Us" accentColor={rose} />
            <MapEmbed address={data.location.address} title={data.location.name} accentColor={rose} />
          </div>
        </section>

        <Divider />

        {/* ── REGISTRY ── */}
        <section className="py-16 px-4 bg-[#FEFAF5] dark:bg-gray-900">
          <div className="max-w-2xl mx-auto">
            <SectionHeading title="Gift Registry" subtitle="Everything the little one will need" accentColor={rose} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {data.registry.map((r, i) => (
                <motion.a key={i} href={r.url} {...fadeUp}
                  whileHover={{ y: -4 }}
                  className="flex flex-col items-center gap-3 p-7 rounded-2xl border bg-white dark:bg-gray-800 transition-all hover:shadow-card group"
                  style={{ borderColor: `${rose}20` }}
                >
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: `${rose}15` }}>
                    <Gift size={20} style={{ color: rose }} />
                  </div>
                  <span className="font-semibold text-sm text-gray-700 dark:text-gray-200 group-hover:text-[#B07463] transition-colors">{r.store}</span>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* ── GALLERY ── */}
        <section className="py-16 px-4" style={{ background: '#F7F0E9' }}>
          <div className="max-w-5xl mx-auto">
            <SectionHeading title="Family Gallery" accentColor={rose} />
            <Gallery images={data.gallery} columns={2} accentColor={rose} showTitle={false} />
          </div>
        </section>

        <Divider />

        {/* ── RSVP ── */}
        <section id="rsvp" className="py-20 px-4 bg-[#FEFAF5] dark:bg-gray-900">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-card p-8 md:p-12 border" style={{ borderColor: `${rose}20` }}>
              <RSVPForm onSubmit={submitRSVP} status={status} accentColor={rose} accentColorHover="#96584A"
                title="Kindly RSVP" subtitle="Please respond by July 10, 2026" />
            </div>
          </div>
        </section>

        {/* ── WISHES ── */}
        <section className="py-16 px-4" style={{ background: '#F7F0E9' }}>
          <div className="max-w-2xl mx-auto">
            <SectionHeading title="Wishes for Baby" subtitle="Leave a heartfelt message for the little one" accentColor={rose} />
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 border shadow-card" style={{ borderColor: `${rose}20` }}>
              <div className="flex items-center gap-2 mb-6">
                <Heart size={16} style={{ color: rose }} />
                <span className="text-sm font-medium text-gray-500">Write your wishes below</span>
              </div>
              <input placeholder="Your name" className="input-field mb-4 dark:bg-gray-700 dark:text-white" />
              <textarea rows={4} placeholder="Dear Baby, may you always know how deeply loved you are…"
                className="input-field resize-none dark:bg-gray-700 dark:text-white" />
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="mt-4 w-full py-3 rounded-xl text-white font-semibold text-sm"
                style={{ background: `linear-gradient(135deg, ${rose}, #96584A)` }}>
                Send Wishes
              </motion.button>
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="py-14 text-center border-t" style={{ borderColor: `${rose}20`, background: '#FEFAF5' }}>
          <Flower2 size={24} className="mx-auto mb-4" style={{ color: rose }} />
          <p className="font-script text-4xl mb-1" style={{ color: heading }}>
            {data.parents.mom} &amp; {data.parents.dad}
          </p>
          <p className="text-gray-400 text-sm">Due {data.dueDate} · Austin, Texas</p>
          <p className="text-gray-300 text-xs mt-2">{data.theme}</p>
        </footer>
      </div>
    </HelmetProvider>
  );
}
