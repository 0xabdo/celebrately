import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Calendar, MapPin, Users, Mail, Phone, CheckCircle, Download, ChevronDown } from 'lucide-react';
import CountdownTimer from '../../components/ui/CountdownTimer';
import RSVPForm from '../../components/ui/RSVPForm';
import MapEmbed from '../../components/ui/MapEmbed';
import ShareButton from '../../components/ui/ShareButton';
import QRCodeComp from '../../components/ui/QRCode';
import { useRSVP } from '../../hooks/useRSVP';
import { rsvpData as data } from '../../data/sampleData';

const accent = '#6366f1';
const accentDark = '#4f46e5';
const cream = '#f9fafb';

const fadeUp = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.55 } };

function AdminPanel({ submissions, onExport }) {
  const [open, setOpen] = useState(false);
  const attending = submissions.filter(s => s.attendance === 'yes');
  const declined = submissions.filter(s => s.attendance === 'no');
  const totalGuests = attending.reduce((sum, s) => sum + (parseInt(s.guestCount) || 0), 0);

  return (
    <div className="mt-14">
      <button onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors mx-auto">
        <span className="w-2 h-2 rounded-full" style={{ background: accent }} />
        {open ? 'Hide' : 'Show'} Admin Panel
      </button>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }} className="mt-6 overflow-hidden">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-premium p-8 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display text-xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h3>
                <button onClick={onExport}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white"
                  style={{ background: accent }}>
                  <Download size={14} />
                  Export CSV
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                  { label: 'Total RSVPs', value: submissions.length, icon: Users, color: accent },
                  { label: 'Attending', value: attending.length, icon: CheckCircle, color: '#10b981' },
                  { label: 'Declined', value: declined.length, icon: Users, color: '#ef4444' },
                  { label: 'Total Guests', value: totalGuests, icon: Users, color: '#f59e0b' },
                ].map((s, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-700 text-center">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center mx-auto mb-2" style={{ background: `${s.color}15` }}>
                      <s.icon size={16} style={{ color: s.color }} />
                    </div>
                    <div className="text-2xl font-black mb-0.5" style={{ color: s.color }}>{s.value}</div>
                    <div className="text-xs text-gray-400 font-medium">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Guest list */}
              {submissions.length > 0 ? (
                <div className="space-y-3 max-h-72 overflow-y-auto">
                  {submissions.map((s, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-700">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
                        style={{ background: accent }}>
                        {s.name?.[0]?.toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 dark:text-white text-sm truncate">{s.name}</p>
                        <p className="text-gray-400 text-xs">{s.email} · {s.guestCount} guest(s)</p>
                      </div>
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                        s.attendance === 'yes' ? 'bg-green-100 text-green-700' :
                        s.attendance === 'no' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {s.attendance === 'yes' ? 'Attending' : s.attendance === 'no' ? 'Declined' : 'Maybe'}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-400 text-sm py-8">No RSVPs yet. Share the page to get responses!</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function RSVPLandingPage() {
  const { submitRSVP, status, submissions, exportToCSV } = useRSVP('gala-2026');

  return (
    <HelmetProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Helmet>
          <title>{data.eventTitle} — RSVP</title>
          <meta name="description" content={data.subtitle} />
        </Helmet>

        {/* ── HERO BANNER ── */}
        <section className="relative py-28 md:py-44 px-4 overflow-hidden">
          <div className="absolute inset-0">
            <img src={data.heroPhoto} alt="Event" className="w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${accent}f0, ${accentDark}e0)` }} />
          </div>

          {/* Subtle geometric rings */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[1, 2, 3].map(i => (
              <motion.div key={i} className="absolute border border-white/8 rounded-full"
                style={{ width: `${i * 260}px`, height: `${i * 260}px`, right: `-${i * 55}px`, top: `-${i * 40}px` }}
                animate={{ rotate: 360 }}
                transition={{ duration: 22 * i, repeat: Infinity, ease: 'linear' }} />
            ))}
          </div>

          <div className="relative z-10 text-center text-white max-w-4xl mx-auto">
            <motion.p initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}
              className="text-xs uppercase tracking-[0.5em] text-white/50 mb-3 font-semibold">
              {data.organizer.name} · Presents
            </motion.p>
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="font-display font-black text-4xl md:text-7xl mb-4" style={{ letterSpacing: '-0.02em' }}>
              {data.eventTitle}
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
              className="text-white/60 text-lg mb-10">{data.subtitle}</motion.p>

            {/* Pills */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
              className="flex flex-wrap justify-center gap-3 mb-10">
              {[
                { icon: Calendar, text: 'September 15, 2026' },
                { icon: Users, text: `${data.maxGuests} Capacity` },
                { icon: MapPin, text: 'Chicago, IL' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-full text-sm bg-white/10 backdrop-blur-sm border border-white/15">
                  <item.icon size={13} />
                  {item.text}
                </div>
              ))}
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
              className="bg-white/8 backdrop-blur-md rounded-3xl p-8 border border-white/15">
              <CountdownTimer targetDate={data.date} accentColor="#ffffff" bgClass="bg-white/10" textClass="text-white" label="Until the Event" />
            </motion.div>
          </div>

          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30">
            <ChevronDown size={28} />
          </motion.div>
        </section>

        {/* ── RSVP + DETAILS ── */}
        <section className="py-16 px-4" style={{ background: cream }}>
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              {/* RSVP form */}
              <motion.div {...fadeUp}
                className="bg-white dark:bg-gray-800 rounded-3xl shadow-premium p-8 md:p-10 border border-gray-100 dark:border-gray-700">
                <RSVPForm onSubmit={submitRSVP} status={status} accentColor={accent} accentColorHover={accentDark}
                  title="Reserve Your Seat" subtitle="Spaces are limited — confirm your attendance" />
              </motion.div>

              {/* Details */}
              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.6 }} className="space-y-5">
                <div>
                  <h2 className="font-display text-3xl font-bold text-gray-900 dark:text-white mb-2">Event Details</h2>
                  <div className="w-10 h-1 rounded-full mb-6" style={{ background: accent }} />
                </div>

                {[
                  { icon: Calendar, title: 'Date & Time', content: 'September 15, 2026 · 6:30 PM' },
                  { icon: MapPin, title: 'Venue', content: `${data.location.name}\n${data.location.address}` },
                  { icon: Users, title: 'Capacity', content: `Limited to ${data.maxGuests} guests` },
                  { icon: Mail, title: 'Contact', content: data.organizer.email },
                  { icon: Phone, title: 'Phone', content: data.organizer.phone },
                ].map((item, i) => (
                  <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.08, duration: 0.5 }}
                    className="flex gap-4 items-start p-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-card">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${accent}15` }}>
                      <item.icon size={17} style={{ color: accent }} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-0.5">{item.title}</p>
                      <p className="text-gray-900 dark:text-white font-medium text-sm whitespace-pre-line">{item.content}</p>
                    </div>
                  </motion.div>
                ))}

                <div className="flex items-center gap-4 pt-2">
                  <ShareButton accentColor={accent} title={data.eventTitle} text={data.subtitle} />
                  <QRCodeComp accentColor={accent} size={80} title="" showDownload={false} />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── MAP ── */}
        <section className="py-10 px-4 pb-16 bg-white dark:bg-gray-900">
          <div className="max-w-5xl mx-auto">
            <MapEmbed address={data.location.address} title={data.location.name} accentColor={accent} />
          </div>
        </section>

        {/* ── ADMIN ── */}
        <section className="py-8 px-4 pb-16" style={{ background: cream }}>
          <div className="max-w-4xl mx-auto">
            <AdminPanel submissions={submissions} onExport={exportToCSV} />
          </div>
        </section>

        <footer className="text-center py-10 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
          <p className="font-display text-lg font-bold text-gray-900 dark:text-white">{data.eventTitle}</p>
          <p className="text-gray-400 text-sm mt-1">{data.organizer.name}</p>
        </footer>
      </div>
    </HelmetProvider>
  );
}
