import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { Heart, Calendar, MapPin, Clock, Gift, Phone, Mail, ChevronDown, Users, Camera, Music, Utensils, Mic, Flower2, Star } from 'lucide-react';
import CountdownTimer from '../../components/ui/CountdownTimer';
import RSVPForm from '../../components/ui/RSVPForm';
import Gallery from '../../components/ui/Gallery';
import MapEmbed from '../../components/ui/MapEmbed';
import GuestMessages from '../../components/ui/GuestMessages';
import ShareButton from '../../components/ui/ShareButton';
import QRCodeComp from '../../components/ui/QRCode';
import SectionHeading from '../../components/ui/SectionHeading';
import { useRSVP } from '../../hooks/useRSVP';
import { weddingData as data } from '../../data/sampleData';

const gold = '#d4913a';
const cream = '#fdf8f0';

const scheduleIcons = [Users, Heart, Camera, Utensils, Music, Mic, Music];

function FloralPetal({ style }) {
  return (
    <motion.div className="absolute pointer-events-none select-none opacity-20" style={style}
      animate={{ y: [0, -28, 0], rotate: [0, 12, -12, 0], opacity: [0.15, 0.35, 0.15] }}
      transition={{ duration: Math.random() * 4 + 5, repeat: Infinity, ease: 'easeInOut', delay: Math.random() * 3 }}>
      <Flower2 size={Math.random() * 16 + 12} style={{ color: '#f4d9a0' }} />
    </motion.div>
  );
}

const petals = Array.from({ length: 10 }, (_, i) => ({ left: `${(i * 10 + 5) % 95}%`, top: `${(i * 13 + 5) % 80}%` }));

function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <motion.div className="absolute inset-0 z-0" style={{ y }}>
        <img src={data.heroPhoto} alt="Wedding" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/25 to-black/65" />
      </motion.div>
      {petals.map((s, i) => <FloralPetal key={i} style={s} />)}

      <motion.div style={{ opacity }} className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
        <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="text-xs uppercase tracking-[0.5em] mb-6 font-medium" style={{ color: '#eec168' }}>
          Together Forever
        </motion.p>
        <motion.h1 initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="font-script leading-tight drop-shadow-2xl" style={{ fontSize: 'clamp(4rem, 14vw, 9rem)' }}>
          {data.bride.name}
          <span className="block font-script text-4xl md:text-6xl mx-4" style={{ color: gold }}>&amp;</span>
          {data.groom.name}
        </motion.h1>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}
          className="flex items-center justify-center gap-3 mb-8 text-white/80">
          <div className="h-px w-16" style={{ background: gold }} />
          <Calendar size={14} style={{ color: gold }} />
          <span className="text-base font-light tracking-widest">September 20, 2026</span>
          <div className="h-px w-16" style={{ background: gold }} />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}
          className="bg-black/25 backdrop-blur-md rounded-3xl p-8 md:p-10 border border-white/10 mb-8">
          <CountdownTimer targetDate={data.date} accentColor={gold} bgClass="bg-white/10" textClass="text-white" label="Until We Say I Do" />
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
          className="flex flex-wrap justify-center gap-4">
          <motion.a href="#rsvp" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
            className="px-8 py-3 rounded-full font-semibold text-sm" style={{ background: gold, color: '#fff' }}>
            RSVP
          </motion.a>
          <ShareButton title={`${data.bride.name} & ${data.groom.name}'s Wedding`} text="We're getting married!" accentColor={gold} />
        </motion.div>
      </motion.div>
      <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 z-10">
        <ChevronDown size={28} />
      </motion.div>
    </section>
  );
}

const fadeUp = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 } };

export default function WeddingWebsite() {
  const { submitRSVP, status } = useRSVP('wedding-2026');

  return (
    <HelmetProvider>
      <div className="bg-[#fdf8f0] dark:bg-gray-950">
        <Helmet>
          <title>{data.bride.name} &amp; {data.groom.name} — Wedding</title>
          <meta name="description" content={`Join the wedding of ${data.bride.name} and ${data.groom.name} on September 20, 2026.`} />
          <meta property="og:image" content={data.heroPhoto} />
        </Helmet>

        <HeroSection />

        {/* Couple intro */}
        <section className="py-24 px-4 bg-white dark:bg-gray-900">
          <div className="max-w-4xl mx-auto text-center">
            <SectionHeading title="The Happy Couple" subtitle="Two hearts, one forever" accentColor={gold} tag="Meet Us" />
            <div className="flex flex-col md:flex-row items-center justify-center gap-12">
              {[data.bride, data.groom].map((person, i) => (
                <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.2, duration: 0.6 }} className="text-center">
                  <div className="w-36 h-36 rounded-full overflow-hidden mx-auto mb-4 border-4" style={{ borderColor: '#f4d9a0' }}>
                    <img src={person.photo} alt={person.name} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="font-script text-3xl text-gray-900 dark:text-white">{person.name}</h3>
                  <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest">{i === 0 ? 'The Bride' : 'The Groom'}</p>
                </motion.div>
              ))}
              <div className="hidden md:flex items-center">
                <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ repeat: Infinity, duration: 2.5 }}
                  className="w-16 h-16 rounded-full flex items-center justify-center shadow-gold"
                  style={{ background: `linear-gradient(135deg, ${gold}, #b8762f)` }}>
                  <Heart size={26} className="text-white" fill="white" />
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Love Story */}
        <section className="py-24 px-4 bg-[#fdf8f0] dark:bg-gray-950">
          <div className="max-w-4xl mx-auto">
            <SectionHeading title="Our Love Story" subtitle="Every great love story has a beginning" accentColor={gold} tag="The Journey" />
            <div className="relative">
              <div className="absolute left-1/2 -translate-x-1/2 h-full w-px hidden md:block" style={{ background: `linear-gradient(to bottom, transparent, ${gold}60, transparent)` }} />
              {data.story.map((item, i) => (
                <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1, duration: 0.6 }}
                  className={`flex items-center gap-8 mb-12 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : ''}`}>
                    <span className="text-xs font-bold uppercase tracking-widest mb-1 block" style={{ color: gold }}>{item.year}</span>
                    <h3 className="text-xl font-display font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                    <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm">{item.description}</p>
                  </div>
                  <div className="shrink-0 w-11 h-11 rounded-full flex items-center justify-center z-10 border-4 border-white dark:border-gray-950"
                    style={{ background: `linear-gradient(135deg, ${gold}, #eec168)` }}>
                    <Heart size={16} className="text-white" fill="white" />
                  </div>
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="py-24 px-4 bg-white dark:bg-gray-900">
          <div className="max-w-5xl mx-auto">
            <SectionHeading title="Engagement Photos" subtitle="Moments captured in love" accentColor={gold} tag="Gallery" />
            <Gallery images={data.gallery} columns={3} accentColor={gold} showTitle={false} />
          </div>
        </section>

        {/* Schedule */}
        <section className="py-24 px-4 bg-[#fdf8f0] dark:bg-gray-950">
          <div className="max-w-2xl mx-auto">
            <SectionHeading title="Wedding Day" subtitle="A perfect day, perfectly planned" accentColor={gold} tag="Schedule" />
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
                      <div className="flex items-center gap-2 mb-0.5">
                        <Clock size={12} style={{ color: gold }} />
                        <span className="text-xs font-semibold" style={{ color: gold }}>{item.time}</span>
                      </div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">{item.event}</h4>
                      {item.location && <p className="text-xs text-gray-400 mt-0.5">{item.location}</p>}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Ceremony Map */}
        <section className="py-24 px-4 bg-white dark:bg-gray-900">
          <div className="max-w-3xl mx-auto">
            <SectionHeading title="Ceremony" subtitle="Where we say our vows" accentColor={gold} tag="Location" />
            <MapEmbed address={data.ceremony.address} title={data.ceremony.name} mapsUrl={data.ceremony.mapsUrl} accentColor={gold} />
          </div>
        </section>

        {/* Reception Map */}
        <section className="py-24 px-4 bg-[#fdf8f0] dark:bg-gray-950">
          <div className="max-w-3xl mx-auto">
            <SectionHeading title="Reception" subtitle="Where we celebrate all night" accentColor={gold} tag="Location" />
            <MapEmbed address={data.reception.address} title={data.reception.name} mapsUrl={data.reception.mapsUrl} accentColor={gold} />
          </div>
        </section>

        {/* Dress Code */}
        <section className="py-24 px-4 bg-white dark:bg-gray-900">
          <div className="max-w-2xl mx-auto text-center">
            <SectionHeading title="Dress Code" subtitle={data.dressCode.title} accentColor={gold} tag="Attire" />
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-8 text-sm">{data.dressCode.description}</p>
            <div className="flex justify-center gap-4">
              {data.dressCode.colors.map((c, i) => (
                <motion.div key={i} whileHover={{ scale: 1.2, y: -5 }}
                  className="w-12 h-12 rounded-full shadow-lg border-2 border-white" style={{ background: c }} />
              ))}
            </div>
          </div>
        </section>

        {/* Gift Registry */}
        <section className="py-24 px-4 bg-[#fdf8f0] dark:bg-gray-950">
          <div className="max-w-2xl mx-auto text-center">
            <SectionHeading title="Gift Registry" subtitle="Your presence is the greatest gift of all" accentColor={gold} tag="Registry" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {data.gifts.map((g, i) => (
                <motion.a key={i} href={g.url} {...fadeUp} transition={{ delay: i * 0.1, duration: 0.5 }}
                  whileHover={{ y: -4 }}
                  className="p-6 bg-white dark:bg-gray-800 rounded-2xl border group transition-all"
                  style={{ borderColor: `${gold}20` }}>
                  <Gift size={24} className="mx-auto mb-3" style={{ color: gold }} />
                  <span className="font-semibold text-sm text-gray-800 dark:text-white group-hover:text-wedding-600 transition-colors">{g.store}</span>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* RSVP */}
        <section id="rsvp" className="py-24 px-4 bg-white dark:bg-gray-900">
          <div className="max-w-2xl mx-auto">
            <RSVPForm onSubmit={submitRSVP} status={status} accentColor={gold} accentColorHover="#b8762f"
              title="RSVP" subtitle="Kindly respond by August 1, 2026" />
          </div>
        </section>

        {/* Guestbook */}
        <section className="py-24 px-4 bg-[#fdf8f0] dark:bg-gray-950">
          <div className="max-w-2xl mx-auto">
            <GuestMessages messages={data.messages} accentColor={gold} title="Guestbook"
              subtitle="Leave your heartfelt wishes for the couple"
              placeholder="Write your heartfelt message for the happy couple..." />
          </div>
        </section>

        {/* QR + Contact */}
        <section className="py-24 px-4 bg-white dark:bg-gray-900">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-10 text-center">
              <div>
                <h3 className="font-display text-xl font-bold text-gray-900 dark:text-white mb-2">Share This Page</h3>
                <p className="text-gray-400 text-sm mb-5">Invite friends &amp; family</p>
                <div className="flex justify-center">
                  <ShareButton accentColor={gold} title={`${data.bride.name} & ${data.groom.name}'s Wedding`} />
                </div>
              </div>
              <QRCodeComp accentColor={gold} title="Scan for wedding website" />
              <div>
                <h3 className="font-display text-xl font-bold text-gray-900 dark:text-white mb-4">Contact</h3>
                <div className="space-y-3">
                  <a href={`mailto:${data.contact.email}`} className="flex items-center gap-2 justify-center text-gray-500 hover:text-yellow-600 transition-colors text-sm">
                    <Mail size={14} />{data.contact.email}
                  </a>
                  <a href={`tel:${data.contact.phone}`} className="flex items-center gap-2 justify-center text-gray-500 hover:text-yellow-600 transition-colors text-sm">
                    <Phone size={14} />{data.contact.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="text-center py-14 bg-[#fdf8f0] dark:bg-gray-950 border-t border-yellow-100 dark:border-gray-800">
          <Flower2 size={22} className="mx-auto mb-4" style={{ color: gold }} />
          <p className="font-script text-4xl" style={{ color: gold }}>{data.bride.name} &amp; {data.groom.name}</p>
          <p className="text-gray-400 text-sm mt-2">September 20, 2026 · Napa Valley, California</p>
          <div className="flex items-center justify-center gap-2 mt-3 text-gray-300 text-xs">
            <Heart size={10} style={{ color: gold }} fill={gold} />
            <span>Forever &amp; Always</span>
            <Heart size={10} style={{ color: gold }} fill={gold} />
          </div>
        </footer>
      </div>
    </HelmetProvider>
  );
}
