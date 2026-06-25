import React from 'react';
import { motion } from 'framer-motion';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Baby, Heart, Calendar, Clock, Scale, Ruler, Users, Share2, Star } from 'lucide-react';
import Gallery from '../../components/ui/Gallery';
import GuestMessages from '../../components/ui/GuestMessages';
import ShareButton from '../../components/ui/ShareButton';
import SectionHeading from '../../components/ui/SectionHeading';
import { babyAnnouncementData as data } from '../../data/sampleData';

const sky = '#4A90B8';
const warm = '#C47B5A';
const cream = '#FEF9F0';

const fadeUp = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

function BirthStat({ icon: Icon, label, value, accent }) {
  return (
    <motion.div {...fadeUp}
      className="flex flex-col items-center gap-2 p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-card border"
      style={{ borderColor: `${accent}20` }}>
      <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: `${accent}12` }}>
        <Icon size={18} style={{ color: accent }} />
      </div>
      <span className="text-xs uppercase tracking-widest font-semibold text-gray-400">{label}</span>
      <span className="font-bold text-gray-900 dark:text-white text-sm text-center">{value}</span>
    </motion.div>
  );
}

export default function BabyAnnouncement() {
  const accent = data.baby.gender === 'boy' ? sky : '#D4829A';

  return (
    <HelmetProvider>
      <div className="min-h-screen" style={{ background: cream }}>
        <Helmet>
          <title>Welcome {data.baby.name} — Birth Announcement</title>
          <meta name="description" content={`${data.baby.name} has arrived — ${data.birthDate}`} />
        </Helmet>

        {/* ── HERO ── */}
        <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
          <div className="absolute inset-0">
            <img src={data.heroPhoto} alt="Baby" className="w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(254,249,240,0.1) 0%, rgba(254,249,240,0.97) 60%)' }} />
          </div>

          <div className="relative z-10 text-center max-w-2xl mx-auto pt-32 md:pt-48">
            <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 160 }}
              className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg"
              style={{ background: `linear-gradient(135deg, ${accent}, ${accent}99)` }}>
              <Baby size={34} className="text-white" />
            </motion.div>

            <motion.p initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
              className="text-xs uppercase tracking-[0.5em] font-semibold mb-3" style={{ color: accent }}>
              {data.parents.mom} &amp; {data.parents.dad} announce
            </motion.p>

            <motion.h1 initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7 }}
              className="font-script leading-none mb-4" style={{ fontSize: 'clamp(4rem, 14vw, 9rem)', color: '#2C1A14' }}>
              {data.baby.name}
            </motion.h1>

            <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.9 }}
              className="w-16 h-0.5 mx-auto mb-6 rounded-full" style={{ background: accent }} />

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
              className="text-gray-500 text-lg leading-relaxed max-w-lg mx-auto mb-10">
              {data.welcomeMessage}
            </motion.p>

            {/* Birth stats */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
              <BirthStat icon={Calendar} label="Born" value={data.birthDate} accent={accent} />
              <BirthStat icon={Clock} label="Time" value={data.birthTime} accent={accent} />
              <BirthStat icon={Scale} label="Weight" value={data.weight} accent={accent} />
              <BirthStat icon={Ruler} label="Height" value={data.height} accent={accent} />
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
              className="flex flex-wrap items-center justify-center gap-4">
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <Heart size={14} style={{ color: '#E87070' }} fill="#E87070" />
                <span>With love from <strong className="text-gray-700 dark:text-gray-200">{data.parents.mom} &amp; {data.parents.dad}</strong></span>
              </div>
              <ShareButton
                title={`Welcome ${data.baby.name}!`}
                text={`${data.parents.mom} & ${data.parents.dad} are thrilled to announce the arrival of ${data.baby.name}!`}
                accentColor={accent}
              />
            </motion.div>
          </div>
        </section>

        {/* ── WELCOME MESSAGE ── */}
        <section className="py-20 px-4 bg-white dark:bg-gray-900">
          <div className="max-w-2xl mx-auto">
            <motion.div {...fadeUp}
              className="rounded-3xl p-10 md:p-14 border text-center"
              style={{ borderColor: `${accent}20`, background: `${accent}06` }}>
              <Baby size={36} className="mx-auto mb-5" style={{ color: accent }} />
              <h2 className="font-display text-3xl font-bold text-gray-900 dark:text-white mb-5">
                Welcome to the World
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed italic">
                "{data.welcomeMessage}"
              </p>
              <div className="mt-6 flex items-center justify-center gap-2 text-sm font-semibold" style={{ color: accent }}>
                <Heart size={14} fill={accent} />
                {data.parents.mom} &amp; {data.parents.dad}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── GALLERY ── */}
        <section className="py-20 px-4" style={{ background: cream }}>
          <div className="max-w-5xl mx-auto">
            <SectionHeading title="First Moments" subtitle="A glimpse of our newest joy" accentColor={accent} />
            <Gallery images={data.gallery} columns={2} accentColor={accent} showTitle={false} />
          </div>
        </section>

        {/* ── MESSAGES ── */}
        <section className="py-20 px-4 bg-white dark:bg-gray-900">
          <div className="max-w-2xl mx-auto">
            <GuestMessages messages={data.messages} accentColor={accent}
              title="Send Your Love" subtitle="Write a message to the new family"
              placeholder="Write your congratulations and well wishes..." />
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="py-14 text-center border-t" style={{ borderColor: `${accent}20`, background: cream }}>
          <div className="w-14 h-14 rounded-full mx-auto mb-5 flex items-center justify-center shadow-md"
            style={{ background: `linear-gradient(135deg, ${accent}, ${accent}99)` }}>
            <Baby size={26} className="text-white" />
          </div>
          <p className="font-script text-5xl mb-1" style={{ color: '#2C1A14' }}>{data.baby.name}</p>
          <p className="text-gray-400 text-sm mt-1">Born {data.birthDate} · {data.birthTime}</p>
          <p className="text-gray-300 text-xs mt-1">{data.weight} · {data.height}</p>
        </footer>
      </div>
    </HelmetProvider>
  );
}
