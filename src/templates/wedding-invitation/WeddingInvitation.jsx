import React from 'react';
import { motion } from 'framer-motion';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Heart, Calendar, Clock, MapPin, Flower2, Diamond } from 'lucide-react';
import CountdownTimer from '../../components/ui/CountdownTimer';
import RSVPForm from '../../components/ui/RSVPForm';
import MapEmbed from '../../components/ui/MapEmbed';
import ShareButton from '../../components/ui/ShareButton';
import QRCodeComp from '../../components/ui/QRCode';
import { useRSVP } from '../../hooks/useRSVP';
import { weddingData as data } from '../../data/sampleData';

const gold = '#d4913a';
const cream = '#fdf8f0';
const amber = '#f4d9a0';

function Ornament() {
  return (
    <div className="flex items-center gap-4 my-8">
      <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, transparent, ${gold}70)` }} />
      <Flower2 size={13} style={{ color: gold }} />
      <div className="flex-1 h-px" style={{ background: `linear-gradient(to left, transparent, ${gold}70)` }} />
    </div>
  );
}

export default function WeddingInvitation() {
  const { submitRSVP, status } = useRSVP('wedding-invitation');

  return (
    <HelmetProvider>
      <div className="min-h-screen py-10 px-4" style={{ background: `linear-gradient(135deg, ${cream} 0%, ${amber} 35%, ${cream} 65%, #faefd8 100%)` }}>
        <Helmet>
          <title>Wedding Invitation — {data.bride.name} &amp; {data.groom.name}</title>
          <meta name="description" content={`Cordially invited to the wedding of ${data.bride.name} and ${data.groom.name}.`} />
        </Helmet>

        <motion.div initial={{ opacity: 0, y: 50, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-xl mx-auto">

          {/* Cover */}
          <div className="relative rounded-t-3xl overflow-hidden" style={{ height: '360px' }}>
            <img src={data.heroPhoto} alt="Wedding" className="w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.15), rgba(15,10,5,0.82))' }} />

            {/* Floral corner accents */}
            <motion.div className="absolute top-5 left-5 opacity-40"
              animate={{ rotate: [0, 8, -8, 0] }} transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}>
              <Flower2 size={32} style={{ color: amber }} />
            </motion.div>
            <motion.div className="absolute top-5 right-5 opacity-40"
              animate={{ rotate: [0, -8, 8, 0] }} transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut', delay: 1 }}>
              <Flower2 size={32} style={{ color: amber }} />
            </motion.div>

            <div className="absolute inset-0 flex flex-col items-center justify-end p-8 text-white text-center">
              <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                className="text-xs uppercase tracking-[0.4em] mb-3" style={{ color: `${amber}cc` }}>
                You are cordially invited to the wedding of
              </motion.p>
              <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
                className="font-script leading-tight drop-shadow-2xl" style={{ fontSize: 'clamp(3rem, 10vw, 5rem)' }}>
                {data.bride.name}
                <span className="block font-script text-3xl my-1" style={{ color: gold }}>&amp;</span>
                {data.groom.name}
              </motion.h1>
            </div>
          </div>

          {/* Card body */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            className="bg-white dark:bg-gray-900 rounded-b-3xl shadow-premium px-8 md:px-14 py-10"
            style={{ borderTop: `3px solid ${gold}` }}>

            <div className="text-center mb-6">
              <Diamond size={24} className="mx-auto mb-3" style={{ color: gold }} />
              <p className="font-serif text-gray-600 dark:text-gray-300 text-base leading-relaxed italic">
                Together with their families, request the honor of your presence at the celebration of their marriage.
              </p>
            </div>

            <Ornament />

            {/* Date & Time */}
            <div className="text-center my-6">
              <div className="flex items-center justify-center gap-2 text-gray-400 mb-3">
                <Calendar size={14} style={{ color: gold }} />
                <span className="text-xs uppercase tracking-widest font-semibold">Date &amp; Time</span>
              </div>
              <p className="font-display text-3xl font-bold text-gray-900 dark:text-white">Saturday, September 20</p>
              <p className="font-display text-2xl text-gray-600 dark:text-gray-300 mt-0.5">2026</p>
              <div className="flex items-center justify-center gap-1.5 mt-2 text-gray-400 text-sm">
                <Clock size={13} />
                <span>Ceremony begins at 4:00 PM</span>
              </div>
            </div>

            <Ornament />

            {/* Venue */}
            <div className="text-center my-6">
              <div className="flex items-center justify-center gap-2 text-gray-400 mb-3">
                <MapPin size={14} style={{ color: gold }} />
                <span className="text-xs uppercase tracking-widest font-semibold">Venue</span>
              </div>
              <p className="font-display text-xl font-bold text-gray-900 dark:text-white">{data.ceremony.name}</p>
              <p className="text-gray-400 text-sm mt-1">{data.ceremony.address}</p>
            </div>

            <Ornament />

            <div className="my-8">
              <CountdownTimer targetDate={data.date} accentColor={gold} bgClass="bg-amber-50 dark:bg-gray-800" label="Until the Big Day" />
            </div>

            <Ornament />

            <div className="my-8">
              <MapEmbed address={data.ceremony.address} title={data.ceremony.name} accentColor={gold} />
            </div>

            <Ornament />

            <div className="my-8">
              <RSVPForm onSubmit={submitRSVP} status={status} accentColor={gold} accentColorHover="#b8762f"
                title="Kindly Reply" subtitle="Please respond by August 1, 2026" />
            </div>

            <Ornament />

            <div className="flex flex-col md:flex-row items-center justify-center gap-8 mt-6">
              <div className="text-center">
                <p className="text-xs text-gray-400 mb-3 uppercase tracking-wider">Share</p>
                <ShareButton title={`Wedding of ${data.bride.name} & ${data.groom.name}`}
                  text="You're invited to our wedding!" accentColor={gold} />
              </div>
              <QRCodeComp accentColor={gold} size={110} title="Scan for details" />
            </div>

            <div className="text-center mt-8 pt-6 border-t" style={{ borderColor: `${gold}20` }}>
              <p className="font-script text-2xl" style={{ color: gold }}>{data.bride.name} &amp; {data.groom.name}</p>
              <p className="text-gray-300 text-xs mt-1">#JamesAndSofia2026</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </HelmetProvider>
  );
}
