import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Heart, User } from 'lucide-react';

export default function GuestMessages({
  messages = [],
  accentColor = '#d4913a',
  title = 'Guestbook',
  subtitle = 'Leave your warm wishes',
  onSubmit,
  placeholder = 'Write your message here...',
}) {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [localMessages, setLocalMessages] = useState(messages);
  const [submitting, setSubmitting] = useState(false);
  const [liked, setLiked] = useState({});

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 800));
    const newMsg = { id: Date.now(), name: name.trim(), message: message.trim(), timestamp: new Date().toISOString(), likes: 0 };
    if (onSubmit) await onSubmit(newMsg);
    setLocalMessages(prev => [newMsg, ...prev]);
    setName('');
    setMessage('');
    setSubmitting(false);
  }

  function toggleLike(id) {
    setLiked(prev => ({ ...prev, [id]: !prev[id] }));
    setLocalMessages(prev => prev.map(m => m.id === id ? { ...m, likes: m.likes + (liked[id] ? -1 : 1) } : m));
  }

  function formatDate(iso) {
    try { return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }); }
    catch { return ''; }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-display font-bold text-gray-900 dark:text-white mb-2">{title}</h2>
        <p className="text-gray-400">{subtitle}</p>
        <div className="w-14 h-1 rounded-full mx-auto mt-4" style={{ background: accentColor }} />
      </div>

      {/* Submit form */}
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-card mb-8 border border-gray-100 dark:border-gray-700">
        <input value={name} onChange={e => setName(e.target.value)}
          placeholder="Your Name *"
          className="input-field mb-4 dark:bg-gray-700 dark:text-white dark:border-gray-600" required />
        <textarea value={message} onChange={e => setMessage(e.target.value)}
          placeholder={placeholder} rows={3}
          className="input-field mb-4 resize-none dark:bg-gray-700 dark:text-white dark:border-gray-600" required />
        <motion.button type="submit" disabled={submitting || !name.trim() || !message.trim()}
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ background: accentColor }}>
          <Send size={15} />
          {submitting ? 'Posting...' : 'Post Message'}
        </motion.button>
      </form>

      {/* Messages */}
      <div className="space-y-4">
        <AnimatePresence>
          {localMessages.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-center py-14 text-gray-300 dark:text-gray-600">
              <Heart size={36} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm">Be the first to leave a message</p>
            </motion.div>
          ) : (
            localMessages.map((msg, idx) => (
              <motion.div key={msg.id || idx}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }} transition={{ delay: idx * 0.04 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-card border border-gray-100 dark:border-gray-700">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-white font-bold text-sm"
                    style={{ background: `linear-gradient(135deg, ${accentColor}, ${accentColor}99)` }}>
                    {msg.name[0]?.toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-gray-900 dark:text-white text-sm">{msg.name}</span>
                      <span className="text-xs text-gray-300 dark:text-gray-500">{formatDate(msg.timestamp)}</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{msg.message}</p>
                    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.8 }}
                      onClick={() => toggleLike(msg.id || idx)}
                      className="flex items-center gap-1.5 mt-3 text-xs transition-colors"
                      style={{ color: liked[msg.id || idx] ? accentColor : '#9ca3af' }}>
                      <Heart size={13} fill={liked[msg.id || idx] ? accentColor : 'none'} />
                      {(msg.likes || 0) + (liked[msg.id || idx] ? 1 : 0)} likes
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
