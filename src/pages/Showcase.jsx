import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Sparkles, ArrowRight, ArrowLeft, Zap, Star, Heart, Diamond, Cake, Baby, GraduationCap, Flower2, Music, ClipboardList, Mail, CheckCircle2, QrCode, ArrowUpRight } from 'lucide-react';
import logoImg from '../../celebrately.jpg';

const templates = [
  {
    id: 1,
    title: 'Wedding Invitation',
    path: 'https://celebrately.online/wedding-template-1',
    category: 'wedding',
    description: 'Complete wedding site with love story, gallery, countdown, RSVP, and guestbook.',
    icon: Heart,
    image: 'https://res.cloudinary.com/dwxge4uwm/image/authenticated/s--O5QYcZS---/35e04efe-f54e-42b0-b8d0-82437e132d96.png',
    accent: '#2b3394',
    tag: 'Most Popular',
    features: ['Countdown Timer', 'RSVP Form', 'Love Story', 'Gallery'],
  },
  {
    id: 2,
    title: 'Wedding Invitation',
    path: 'https://celebrately.online/wedding-template-2',
    category: 'wedding',
    description: 'Elegant digital invitation card with animations and social sharing.',
    icon: Mail,
    image: 'https://res.cloudinary.com/dwxge4uwm/image/authenticated/s--yAcTKS5d--/5e9c3c62-2a8d-4e5b-b9b9-834e441f789c.png',
    accent: '#2b3394',
    tag: 'Elegant',
    features: ['Invitation Card', 'RSVP', 'Countdown', 'QR Code'],
  },
  {
    id: 3,
    title: 'Wedding Invitation',
    path: 'https://celebrately.online/wedding-template-3',
    category: 'wedding',
    description: 'Elegant digital invitation card with animations and social sharing.',
    icon: Mail,
    image: 'https://res.cloudinary.com/dwxge4uwm/image/authenticated/s--DfENi3uv--/c4c9613a-468f-4386-8f6a-9a4021433034.png',
    accent: '#2b3394',
    tag: 'Elegant',
    features: ['Invitation Card', 'RSVP', 'Countdown', 'QR Code'],
  },
  {
    id: 4,
    title: 'Wedding Invitation',
    path: 'https://celebrately.online/wedding-template-4',
    category: 'wedding',
    description: 'Elegant digital invitation card with animations and social sharing.',
    icon: Cake,
    image: 'https://res.cloudinary.com/dwxge4uwm/image/authenticated/s--MQNT492e--/0ad145b5-ac48-490a-aa47-32247136b52d.png',
    accent: '#2b3394',
    tag: 'Refined',
    features: ['Invitation Card', 'RSVP', 'Countdown', 'QR Code'],
  },
  {
    id: 5,
    title: 'Wedding Invitation',
    path: 'https://celebrately.online/wedding-template-5',
    category: 'wedding',
    description: 'Soft garden bloom aesthetic with name reveal teaser and gift registry.',
    icon: Flower2,
    image: 'https://res.cloudinary.com/dwxge4uwm/image/authenticated/s--zroniWNY--/79f24f08-e77d-4f2b-a9a1-9c2d2f7e5d09.png',
    accent: '#2b3394',
    tag: 'Adorable',
    features: ['Invitation Card', 'RSVP', 'Countdown', 'QR Code'],
  },
  {
    id: 6,
    title: 'Wedding Invitation',
    path: 'https://celebrately.online/wedding-template-6',
    category: 'wedding',
    description: 'Soft garden bloom aesthetic with name reveal teaser and gift registry.',
    icon: Cake,
    image: 'https://res.cloudinary.com/dwxge4uwm/image/authenticated/s--6olYXBMl--/dcda2486-ef61-4e2d-bd9e-d8a0621ad8c7.png',
    accent: '#2b3394',
    tag: 'Emotional',
    features: ['Invitation Card', 'RSVP', 'Countdown', 'QR Code'],
  },  

];

//{ id: 'family',   label: '',           emoji: '' },
//{ id: 'social',   label: '',     emoji: '' },
//{ id: 'milestone',label: '',      emoji: '' },


const categoryGroups = [
  { id: 'wedding',   label: 'Weddings & Engagements', emoji: '' },
  
];

const features = [
  {
    icon: Zap,
    title: 'Fast on Any Device',
    description: 'Pages load instantly, whether a guest opens them on a phone at the venue or a laptop at home.'
  },
  {
    icon: Star,
    title: 'Designed to Impress',
    description: 'Soft gradients, smooth motion, and layouts that feel custom-made instead of templated.'
  },
  {
    icon: ClipboardList,
    title: 'Built-in RSVP Form',
    description: 'Guests respond right on your page — meal choices, plus-ones, and notes, all in one place.'
  },
  {
    icon: QrCode,
    title: 'Share with a QR Code',
    description: 'Print it on invitations or signage so guests can pull up your page with a single scan.'
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 25 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
};

/* ─────────────────────────────────────────────
   CategoryRow  –  horizontal scrollable carousel
───────────────────────────────────────────── */
function CategoryRow({ group, items }) {
  const trackRef = useRef(null);
  const [canLeft,  setCanLeft]  = useState(false);
  const [canRight, setCanRight] = useState(false);

  const checkScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    checkScroll();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [checkScroll, items]);

  const scroll = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 360, behavior: 'smooth' });
  };

  return (
    <section className="relative z-10 py-14 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Row header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{group.emoji}</span>
            <h2 className="font-heading text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              {group.label}
            </h2>
            <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">
              {items.length} template{items.length !== 1 ? 's' : ''}
            </span>
          </div>
          {/* Arrow controls – only visible when overflow exists */}
          <div className="flex items-center gap-2">
            <motion.button
              onClick={() => scroll(-1)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={!canLeft}
              className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-200 ${
                canLeft
                  ? 'bg-white border-slate-200 text-slate-700 hover:bg-[#2b3394] hover:text-white hover:border-[#2b3394] shadow-sm'
                  : 'bg-slate-50 border-slate-100 text-slate-300 cursor-not-allowed'
              }`}
            >
              <ArrowLeft size={14} />
            </motion.button>
            <motion.button
              onClick={() => scroll(1)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={!canRight}
              className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-200 ${
                canRight
                  ? 'bg-white border-slate-200 text-slate-700 hover:bg-[#2b3394] hover:text-white hover:border-[#2b3394] shadow-sm'
                  : 'bg-slate-50 border-slate-100 text-slate-300 cursor-not-allowed'
              }`}
            >
              <ArrowRight size={14} />
            </motion.button>
          </div>
        </div>

        {/* Scrollable track */}
        <div
          ref={trackRef}
          className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {items.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.06, ease: [0.16,1,0.3,1] }}
              whileHover={{ y: -6 }}
              className="group flex-shrink-0 w-[300px] snap-start rounded-3xl overflow-hidden glass-liquid-light border border-slate-200/50 hover:border-[#2b3394]/30 shadow-sm hover:shadow-lg transition-all duration-400 flex flex-col"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={t.image}
                  alt={t.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent" />
                <div className="absolute top-3 left-3 w-9 h-9 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center border border-white/30 shadow-sm">
                  <t.icon size={15} style={{ color: '#2b3394' }} />
                </div>
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[9px] uppercase tracking-wider font-extrabold text-white backdrop-blur-sm" style={{ backgroundColor: 'rgba(43,51,148,0.85)' }}>
                  {t.tag}
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="font-heading text-base font-bold text-slate-900 mb-1.5 group-hover:text-[#2b3394] transition-colors">
                  {t.title}
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed mb-4 flex-grow">{t.description}</p>

                {/* Feature pills */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {t.features.map((f, j) => (
                    <span key={j} className="text-[9px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-500 border border-slate-200/50">
                      {f}
                    </span>
                  ))}
                </div>

                <Link to={t.path}>
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-2xl font-bold text-[10px] uppercase tracking-wider text-white transition-colors"
                    style={{ backgroundColor: '#2b3394' }}
                  >
                    Launch Template <ArrowUpRight size={12} />
                  </motion.div>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Fade edges when scrollable */}
        {canLeft && (
          <div className="absolute left-4 md:left-6 top-[5.5rem] bottom-4 w-16 bg-gradient-to-r from-white/90 to-transparent pointer-events-none z-10 rounded-l-3xl" />
        )}
        {canRight && (
          <div className="absolute right-4 md:right-6 top-[5.5rem] bottom-4 w-16 bg-gradient-to-l from-white/90 to-transparent pointer-events-none z-10 rounded-r-3xl" />
        )}
      </div>
    </section>
  );
}

export default function Showcase() {
  const [activeFaq, setActiveFaq] = useState(null);

  const templatesByCategory = categoryGroups.map(g => ({
    group: g,
    items: templates.filter(t => t.category === g.id),
  }));

  return (
    <HelmetProvider>
      <div className="bg-white dark:bg-slate-950 min-h-screen transition-colors duration-300 relative overflow-hidden bg-grid-pattern dark:bg-grid-pattern-dark pt-24">
        <Helmet>
          <title>Celebrately — Premium Digital Invitations & RSVP Hub</title>
          <meta name="description" content="9 premium website templates for weddings, birthdays, baby showers, and milestones. Built with liquid glass design." />
        </Helmet>

        {/* ── BACKGROUND GLOWS ── */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-12 left-1/4 w-96 h-96 rounded-full bg-brand-500/10 dark:bg-brand-500/15 blur-3xl" />
          <div className="absolute top-48 right-1/4 w-96 h-96 rounded-full bg-blue-400/10 dark:bg-indigo-500/10 blur-3xl" />
          <div className="absolute bottom-1/3 left-1/3 w-[500px] h-[500px] rounded-full bg-cyan-400/5 dark:bg-brand-600/5 blur-3xl" />
        </div>

        {/* ── HERO SECTION ── */}
        <section className="relative z-10 pt-20 pb-16 px-4 md:px-6">
          <div className="max-w-5xl mx-auto text-center">
            {/* Badge */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              transition={{ delay: 0.1, type: 'spring' }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-500/20 dark:border-brand-400/20 bg-brand-50/50 dark:bg-brand-950/20 backdrop-blur-sm text-brand-600 dark:text-brand-400 text-xs font-bold uppercase tracking-wider mb-8"
            >
              <Sparkles size={12} className="animate-pulse" />
              Wedding Sites, Invites & RSVPs
            </motion.div>

            {/* Heading */}
            <motion.h1 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading font-black tracking-tight text-slate-900 dark:text-white mb-6 leading-[1.1]"
              style={{ fontSize: 'clamp(2.5rem, 7.5vw, 5rem)' }}
            >
              Make Every Celebration <br />
              <span className="text-gradient-brand">Unforgettable</span>
            </motion.h1>

            {/* Description */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed font-normal"
            >
              Pick a template, add your own photos and details, and have a wedding site, invitation, or RSVP page ready to share the same day.
            </motion.p>

            {/* CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap justify-center gap-4 mb-16"
            >
              <motion.a 
                href="#templates" 
                whileHover={{ scale: 1.03, y: -1 }} 
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3.5 rounded-2xl font-bold text-white text-sm bg-[#2b3394] hover:bg-[#1d2370] shadow-md shadow-brand-500/10 transition-all flex items-center gap-2"
              >
                Explore Templates
                <ArrowRight size={16} />
              </motion.a>
              <motion.a 
                href="#features" 
                whileHover={{ scale: 1.03, y: -1 }} 
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3.5 rounded-2xl font-bold text-slate-700 dark:text-slate-200 text-sm bg-slate-100 hover:bg-slate-200 dark:bg-slate-900/60 dark:hover:bg-slate-900/90 border border-slate-200/50 dark:border-slate-800 transition-all"
              >
                See What's Included
              </motion.a>
            </motion.div>

            {/* Quick Metrics */}
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 0.4, duration: 1 }}
              className="grid grid-cols-3 gap-6 max-w-md mx-auto pt-4 border-t border-slate-100 dark:border-slate-900/50"
            >
              {[
                { value: '99+', label: 'Templates' },
                { value: '100%', label: 'Customizable' },
                { value: 'Live', label: 'RSVP Tracking' }
              ].map((m, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-2xl font-black text-brand-500 dark:text-brand-400">{m.value}</div>
                  <div className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400 mt-1">{m.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── TEMPLATES BY CATEGORY ── */}
        <div id="templates" className="relative z-10">
          {/* Header */}
          <div className="max-w-7xl mx-auto px-4 md:px-6 pt-20 pb-4 text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-[#2b3394] bg-blue-50 px-4 py-1.5 rounded-full">
              Browse by Category
            </span>
            <h2 className="font-heading text-3xl md:text-5xl font-extrabold text-slate-950 mt-5 tracking-tight mb-3">
              Pick Your Occasion
            </h2>
            <p className="text-slate-500 text-base max-w-md mx-auto">
              Weddings, birthdays, baby showers, and more — scroll sideways to see every template in each category.
            </p>
          </div>

          {/* One carousel per category */}
          <div className="divide-y divide-slate-100">
            {templatesByCategory.map(({ group, items }) => (
              <CategoryRow key={group.id} group={group} items={items} />
            ))}
          </div>
        </div>

        {/* ── FEATURES SECTION ── */}
        <section id="features" className="relative z-10 py-24 px-4 md:px-6 bg-slate-50/50 dark:bg-slate-950/20 border-y border-slate-100 dark:border-slate-900/50">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-heading text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight mb-3">
                What You Get
              </h2>
              <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto text-sm">
                Everything you need to share your event and keep track of who's coming.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((f, i) => (
                <motion.div 
                  key={i} 
                  {...fadeUp} 
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="p-6 rounded-3xl glass-liquid-light dark:glass-liquid-dark border border-slate-200/40 dark:border-slate-800/80 hover:border-brand-500/30 dark:hover:border-brand-400/20 text-center transition-all hover:shadow-premium"
                >
                  <div className="w-12 h-12 rounded-2xl bg-brand-500/10 dark:bg-brand-500/20 border border-brand-500/20 flex items-center justify-center mx-auto mb-4">
                    <f.icon size={20} className="text-brand-500 dark:text-brand-400" />
                  </div>
                  <h4 className="font-heading font-bold text-slate-950 dark:text-white text-sm mb-2">{f.title}</h4>
                  <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">{f.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

      

        {/* ── TESTIMONIALS (LOVE LETTERS) ── */}
        <section className="relative z-10 py-24 px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-[#2b3394] bg-blue-50 px-4 py-1.5 rounded-full">
                Testimonials
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-slate-950 mt-4 tracking-tight">
                Love Letters from Hosts
              </h2>
              <p className="text-slate-500 text-sm max-w-sm mx-auto mt-2">
                Real stories from couples and families who built their page with Celebrately.
              </p>
            </div>

            {/* Testimonials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  quote: "The RSVP tracker was an absolute lifesaver. We exported our guest list to CSV and sent it straight to the caterer. Beautiful layout!",
                  author: "Liam & Olivia",
                  event: "Wedding Website",
                  avatar: "💑",
                },
                {
                  quote: "Adding the countdown timer to my page got everyone excited. Setting up venue coordinates was incredibly simple. Highly recommend!",
                  author: "Arthur",
                  event: "Milestone Graduation",
                  avatar: "🎓",
                },
                {
                  quote: "The liquid glass aesthetic got so many compliments from my guests. A beautiful way to share registry details.",
                  author: "Sophia",
                  event: "Baby Announcement",
                  avatar: "👶",
                },
              ].map((t, idx) => (
                <motion.div
                  key={idx}
                  {...fadeUp}
                  transition={{ delay: idx * 0.08 }}
                  whileHover={{ y: -5 }}
                  className="p-6 rounded-3xl glass-liquid-light border border-slate-200/80 shadow-md flex flex-col justify-between"
                >
                  <p className="text-slate-600 text-xs italic leading-relaxed mb-6">
                    "{t.quote}"
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                    <span className="text-xl">{t.avatar}</span>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{t.author}</h4>
                      <p className="text-[10px] text-slate-400 font-semibold">{t.event}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ACCORDION SECTION ── */}
        <section className="relative z-10 py-24 px-4 md:px-6 bg-slate-50/50 border-t border-slate-100">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-[#2b3394] bg-blue-50 px-4 py-1.5 rounded-full">
                Help & FAQ
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-slate-950 mt-4 tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="text-slate-500 text-sm max-w-sm mx-auto mt-2">
                Have questions? Here are quick answers to get you started.
              </p>
            </div>

            {/* Accordion List */}
            <div className="space-y-4">
              {[
                {
                  q: "Can I download my guest list responses?",
                  a: "Yes! The RSVP page comes with a built-in admin dashboard allowing you to view and export all RSVP responses into a CSV format instantly with a single click."
                },
                {
                  q: "Are these templates mobile friendly?",
                  a: "Absolutely. Every template is crafted with a mobile-first philosophy, ensuring your invitations look stunning and load fast on any phone or screen size."
                },
                {
                  q: "How do I customize the text?",
                  a: "You can modify sample data objects inside the code or connect it to any CMS/database system of your choice."
                },
                {
                  q: "Do these work on all modern browsers?",
                  a: "Yes, they are compiled to standard HTML5 and React components, fully optimized for Safari, Chrome, Edge, and mobile viewports."
                }
              ].map((faq, i) => {
                const isOpen = activeFaq === i;
                return (
                  <div 
                    key={i}
                    className="rounded-2xl border border-slate-200/80 glass-liquid-light overflow-hidden transition-all duration-300"
                  >
                    <button
                      onClick={() => setActiveFaq(isOpen ? null : i)}
                      className="w-full flex items-center justify-between p-5 text-left font-bold text-slate-800 text-sm hover:text-[#2b3394] transition-colors focus:outline-none"
                    >
                      <span>{faq.q}</span>
                      <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-slate-400 font-normal text-xs"
                      >
                        ▼
                      </motion.span>
                    </button>
                    
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="p-5 pt-0 text-xs text-slate-500 leading-relaxed border-t border-slate-100">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── DYNAMIC CTA SECTION ── */}
        <section className="relative z-10 py-20 px-4 md:px-6 mb-16">
          <motion.div 
            {...fadeUp}
            className="max-w-4xl mx-auto rounded-[32px] overflow-hidden border border-slate-200/85 relative shadow-premium bg-gradient-to-br from-slate-50 via-white to-blue-50/70"
          >
            {/* Glowing inner backdrops */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-brand-500/5 blur-3xl" />
              <div className="absolute bottom-0 left-0 w-85 h-85 rounded-full bg-blue-500/5 blur-3xl" />
            </div>

            <div className="relative z-10 p-10 md:p-16 text-center text-slate-900">
              {/* Logo icon frame */}
              <div className="w-14 h-14 rounded-3xl overflow-hidden mx-auto mb-6 border border-brand-500/20 shadow-md">
                <img src={logoImg} alt="Celebrately Logo" className="w-full h-full object-cover" />
              </div>
              
              <h2 className="font-heading text-3xl md:text-5xl font-black mb-4 tracking-tight leading-none text-slate-950">
                Start Celebrating Today
              </h2>
              <p className="text-slate-500 text-sm md:text-base mb-8 max-w-md mx-auto leading-relaxed">
                Pick a template, add your details, and have your page ready to share in minutes.
              </p>
              
              <motion.a 
                href="#templates" 
                whileHover={{ scale: 1.03 }} 
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-10 py-4 rounded-2xl font-bold text-xs uppercase tracking-wider text-white shadow-xl hover:shadow-2xl transition-all"
                style={{ backgroundColor: '#2b3394' }}
              >
                Browse All Templates
                <ArrowRight size={14} className="text-white" />
              </motion.a>
            </div>
          </motion.div>
        </section>
      </div>
    </HelmetProvider>
  );
}