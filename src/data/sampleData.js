// ─── WEDDING WEBSITE DATA ──────────────────────────────────────────────────
export const weddingData = {
  groom: { name: 'James Harrison', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80' },
  bride: { name: 'Sofia Moreau', photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80' },
  date: '2026-09-20T16:00:00',
  heroPhoto: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&q=80',
  story: [
    { year: '2020', title: 'First Meeting', description: 'We met at a rooftop gallery in Paris. One glance across the room and everything changed.' },
    { year: '2021', title: 'First Date', description: 'A candlelit dinner by the Seine, where we talked until the stars faded into dawn.' },
    { year: '2022', title: 'Moving In Together', description: 'We packed our worlds into one apartment and discovered just how perfectly we fit.' },
    { year: '2023', title: 'The Proposal', description: 'On the cliffs of Santorini, under a thousand golden lights, James asked the question of a lifetime.' },
    { year: '2026', title: 'The Wedding', description: 'Two hearts, one forever. We can\'t wait to share this moment with every person we love.' },
  ],
  schedule: [
    { time: '3:00 PM', event: 'Guest Arrival & Welcome Drinks', icon: '🥂', location: 'The Garden Terrace' },
    { time: '4:00 PM', event: 'Wedding Ceremony', icon: '💒', location: 'Chapel of Eternal Vows' },
    { time: '5:30 PM', event: 'Cocktail Hour & Photos', icon: '📸', location: 'Vineyard Courtyard' },
    { time: '7:00 PM', event: 'Dinner & Reception', icon: '🍽️', location: 'Grand Ballroom' },
    { time: '9:00 PM', event: 'First Dance & Speeches', icon: '💃', location: 'Grand Ballroom' },
    { time: '10:00 PM', event: 'Dancing & Celebrations', icon: '🎶', location: 'Grand Ballroom' },
  ],
  ceremony: {
    name: 'Chapel of Eternal Vows',
    address: '12 Vineyard Lane, Napa Valley, CA 94558',
    mapsUrl: 'https://maps.google.com/?q=Napa+Valley+CA',
  },
  reception: {
    name: 'The Grand Chateau Ballroom',
    address: '88 Heritage Drive, Napa Valley, CA 94558',
    mapsUrl: 'https://maps.google.com/?q=Napa+Valley+CA',
  },
  dressCode: {
    title: 'Black Tie Optional',
    description: 'We kindly request guests to dress in formal or semi-formal attire. Men in dark suits or tuxedos, women in floor-length gowns or elegant cocktail dresses.',
    colors: ['#1f2937', '#d4913a', '#f8fafc', '#831843'],
  },
  gifts: [
    { store: 'Williams Sonoma', url: '#', icon: '🏠' },
    { store: 'Pottery Barn', url: '#', icon: '🪴' },
    { store: 'Honeymoon Fund', url: '#', icon: '✈️' },
  ],
  gallery: [
    { src: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&q=80', alt: 'Engagement photo 1' },
    { src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&q=80', alt: 'Engagement photo 2' },
    { src: 'https://images.unsplash.com/photo-1591604021695-0c69b7c05981?w=600&q=80', alt: 'Engagement photo 3' },
    { src: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=80', alt: 'Engagement photo 4' },
    { src: 'https://images.unsplash.com/photo-1529636562765-cb8e38bef99d?w=600&q=80', alt: 'Engagement photo 5' },
    { src: 'https://images.unsplash.com/photo-1488684430052-f66a9c01bcf0?w=600&q=80', alt: 'Engagement photo 6' },
  ],
  messages: [
    { id: 1, name: 'Emily & Tom', message: 'We are so thrilled to witness your love story unfold! Wishing you a lifetime of happiness and adventure together. ❤️', timestamp: '2026-06-01T10:00:00', likes: 12 },
    { id: 2, name: 'Mia Chen', message: 'Sofia, you radiate joy and love. James, you are the luckiest man alive. Cannot wait to celebrate with you both!', timestamp: '2026-06-03T14:30:00', likes: 8 },
    { id: 3, name: 'Robert & Claire', message: 'Two beautiful souls finding each other — what a gift. Here\'s to forever!', timestamp: '2026-06-05T09:15:00', likes: 5 },
  ],
  contact: { email: 'james.sofia.2026@gmail.com', phone: '+1 (555) 234-5678' },
};

// ─── BIRTHDAY DATA ──────────────────────────────────────────────────────────
export const birthdayData = {
  name: 'Alexandra',
  age: 30,
  date: '2026-07-15T19:00:00',
  heroPhoto: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1600&q=80',
  tagline: 'Three decades of fabulous!',
  location: { name: 'Skyline Rooftop Lounge', address: '200 Fifth Avenue, New York, NY 10001' },
  schedule: [
    { time: '7:00 PM', event: 'Cocktails & Mingling', icon: '🍸' },
    { time: '8:00 PM', event: 'Dinner is Served', icon: '🍽️' },
    { time: '9:30 PM', event: 'Birthday Speeches', icon: '🎤' },
    { time: '10:00 PM', event: 'Cake Cutting Ceremony', icon: '🎂' },
    { time: '10:30 PM', event: 'Dance Party!', icon: '🎵' },
  ],
  gifts: ['Luxury skincare', 'Travel experiences', 'Fine jewelry', 'Books & art'],
  gallery: [
    { src: 'https://images.unsplash.com/photo-1464349153735-7db50ed83c84?w=600&q=80', alt: 'Birthday photo' },
    { src: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600&q=80', alt: 'Birthday photo' },
    { src: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=600&q=80', alt: 'Birthday photo' },
    { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', alt: 'Birthday photo' },
    { src: 'https://images.unsplash.com/photo-1496337589254-7e19d01cec44?w=600&q=80', alt: 'Birthday photo' },
    { src: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&q=80', alt: 'Birthday photo' },
  ],
};

// ─── BABY SHOWER DATA ───────────────────────────────────────────────────────
export const babyShowerData = {
  parents: { mom: 'Isabella', dad: 'Marco' },
  babyName: '???', // To be revealed
  dueDate: '2026-08-15',
  date: '2026-07-20T11:00:00',
  heroPhoto: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=1600&q=80',
  theme: 'Enchanted Garden',
  location: { name: 'The Blossom Garden Hall', address: '45 Willow Lane, Austin, TX 78701' },
  registry: [
    { store: 'Buy Buy Baby', url: '#', icon: '👶' },
    { store: 'Pottery Barn Kids', url: '#', icon: '🪴' },
    { store: 'Amazon Baby List', url: '#', icon: '📦' },
  ],
  gallery: [
    { src: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&q=80', alt: 'Family photo' },
    { src: 'https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=600&q=80', alt: 'Baby photo' },
    { src: 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=600&q=80', alt: 'Nursery' },
    { src: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=600&q=80', alt: 'Baby items' },
  ],
};

// ─── BABY ANNOUNCEMENT DATA ─────────────────────────────────────────────────
export const babyAnnouncementData = {
  baby: { name: 'Oliver James', gender: 'boy' },
  birthDate: 'June 10, 2026',
  birthTime: '3:42 AM',
  weight: '7 lbs 6 oz',
  height: '20.5 inches',
  parents: { mom: 'Jessica', dad: 'Daniel' },
  siblings: [],
  heroPhoto: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=1600&q=80',
  welcomeMessage: 'With hearts so full they might burst, we are overjoyed to welcome the newest member of our family. Every tiny finger, every little yawn — pure, perfect magic.',
  gallery: [
    { src: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600&q=80', alt: 'Baby' },
    { src: 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=600&q=80', alt: 'Family' },
    { src: 'https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=600&q=80', alt: 'Baby' },
    { src: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&q=80', alt: 'Family' },
  ],
  messages: [
    { id: 1, name: 'Grandma Rose', message: 'He is the most beautiful baby in the world! We love you little Oliver! 🌟', timestamp: '2026-06-10T08:00:00', likes: 24 },
    { id: 2, name: 'Uncle Chris', message: 'Welcome to the world, little man! Your adventures are just beginning!', timestamp: '2026-06-10T09:30:00', likes: 15 },
  ],
};

// ─── GRADUATION DATA ────────────────────────────────────────────────────────
export const graduationData = {
  name: 'Michael Chen',
  degree: 'Bachelor of Science in Computer Science',
  university: 'Massachusetts Institute of Technology',
  graduationDate: '2026-06-20T10:00:00',
  photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
  heroPhoto: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1600&q=80',
  achievements: [
    { title: 'Summa Cum Laude', icon: '🏆' },
    { title: "Dean's List — 4 Years", icon: '⭐' },
    { title: 'Research Published', icon: '📄' },
    { title: 'Internship at Google', icon: '💼' },
  ],
  timeline: [
    { year: '2022', title: 'First Year', description: 'Began the journey at MIT, discovered a passion for AI.' },
    { year: '2023', title: 'Research & Internship', description: 'Joined the AI lab, co-authored a paper on neural networks.' },
    { year: '2024', title: 'Google Summer Intern', description: 'Worked on Google DeepMind research team in Mountain View.' },
    { year: '2025', title: 'Senior Thesis', description: 'Completed thesis on Generative AI in healthcare diagnostics.' },
    { year: '2026', title: 'Graduation', description: 'Graduating with highest honors. Next stop: the world!' },
  ],
  party: { date: '2026-06-21T18:00:00', location: 'The Rooftop Terrace, Boston, MA' },
  gallery: [
    { src: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80', alt: 'Graduation' },
    { src: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&q=80', alt: 'Campus' },
    { src: 'https://images.unsplash.com/photo-1627556704302-624286467c65?w=600&q=80', alt: 'Graduate' },
    { src: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80', alt: 'Ceremony' },
  ],
};

// ─── ENGAGEMENT DATA ────────────────────────────────────────────────────────
export const engagementData = {
  partner1: { name: 'Elena', photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80' },
  partner2: { name: 'Lucas', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80' },
  heroPhoto: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=1600&q=80',
  announcementDate: 'June 8, 2026',
  proposalStory: 'Under a sky full of fireworks in Florence, Lucas got down on one knee and asked the question Elena had been dreaming of. With tears of joy and a resounding yes, a new chapter began.',
  partyDate: '2026-07-05T17:00:00',
  location: { name: 'Villa Montserrat Gardens', address: '33 Olive Grove Road, Malibu, CA 90265' },
  gifts: ['Dinner experience', 'Travel vouchers', 'Home essentials', 'Personalized art'],
  story: [
    { year: '2022', title: 'How We Met', description: 'A chance encounter at a Florence art gallery changed both our lives forever.' },
    { year: '2023', title: 'First Trip Together', description: 'Road-tripping through the Amalfi Coast, falling more in love with every mile.' },
    { year: '2025', title: 'Moving Together', description: 'Turning a house into a home, side by side.' },
    { year: '2026', title: "He Said She Said Yes", description: 'The most beautiful yes under Florentine fireworks.' },
  ],
  gallery: [
    { src: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=600&q=80', alt: 'Couple' },
    { src: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&q=80', alt: 'Engagement' },
    { src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&q=80', alt: 'Couple' },
    { src: 'https://images.unsplash.com/photo-1529636562765-cb8e38bef99d?w=600&q=80', alt: 'Together' },
  ],
};

// ─── PARTY DATA ─────────────────────────────────────────────────────────────
export const partyData = {
  title: 'NEON NIGHT',
  subtitle: 'The party of the decade',
  date: '2026-08-01T21:00:00',
  theme: 'Neon Glow',
  heroPhoto: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1600&q=80',
  location: { name: 'Pulse Nightclub & Lounge', address: '789 Electric Avenue, Miami, FL 33101' },
  dressCode: 'Neon, glow-in-the-dark, or all white',
  schedule: [
    { time: '9:00 PM', event: 'Doors Open', icon: '🚪' },
    { time: '9:30 PM', event: 'Welcome Drinks', icon: '🍹' },
    { time: '10:00 PM', event: 'DJ Set Begins', icon: '🎧' },
    { time: '12:00 AM', event: 'Midnight Surprise', icon: '🎆' },
    { time: '2:00 AM', event: 'Last Dance', icon: '💃' },
  ],
  playlist: ['Future Nostalgia — Dua Lipa', 'Levitating', 'Blinding Lights', 'As It Was', 'Starboy'],
  gallery: [
    { src: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=600&q=80', alt: 'Party' },
    { src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80', alt: 'Lights' },
    { src: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80', alt: 'Dance' },
    { src: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&q=80', alt: 'Music' },
  ],
};

// ─── RSVP LANDING DATA ──────────────────────────────────────────────────────
export const rsvpData = {
  eventTitle: 'Annual Gala Dinner 2026',
  subtitle: 'An evening of excellence, connection, and celebration',
  date: '2026-09-15T18:30:00',
  location: { name: 'The Ritz-Carlton Grand Ballroom', address: '160 E Pearson St, Chicago, IL 60611' },
  heroPhoto: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=1600&q=80',
  organizer: { name: 'The Harrison Foundation', email: 'events@harrison.org', phone: '+1 (312) 555-0100' },
  maxGuests: 200,
};
