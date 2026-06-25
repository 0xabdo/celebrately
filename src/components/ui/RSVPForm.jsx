import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { CheckCircle, Loader2, User, Mail, Phone, Users, MessageSquare } from 'lucide-react';

export default function RSVPForm({
  onSubmit,
  status = 'idle',
  accentColor = '#d4913a',
  accentColorHover = '#b8762f',
  title = 'RSVP',
  subtitle = 'We would love to celebrate with you',
  showGuestCount = true,
  showPhone = true,
}) {
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm();
  const selectedAttendance = watch('attendance');
  const [localStatus, setLocalStatus] = useState('idle');
  const currentStatus = status !== 'idle' ? status : localStatus;

  async function handleFormSubmit(data) {
    setLocalStatus('loading');
    try {
      if (onSubmit) await onSubmit(data);
      else await new Promise(r => setTimeout(r, 1200));
      setLocalStatus('success');
      reset();
    } catch {
      setLocalStatus('error');
    }
  }

  if (currentStatus === 'success') {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
        className="text-center py-14 px-8">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}>
          <CheckCircle size={72} className="mx-auto mb-5" style={{ color: accentColor }} />
        </motion.div>
        <h3 className="text-3xl font-display font-bold mb-3 text-gray-900 dark:text-white">You're on the list!</h3>
        <p className="text-gray-400 text-base mb-8">We can't wait to celebrate with you. A confirmation will be sent to your email.</p>
        <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
          onClick={() => setLocalStatus('idle')}
          className="btn-primary text-white" style={{ background: accentColor }}>
          Submit Another Response
        </motion.button>
      </motion.div>
    );
  }

  const inputBase = `input-field focus:ring-2 dark:bg-gray-800/50 dark:text-white dark:border-gray-600`;

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-display font-bold text-gray-900 dark:text-white mb-2">{title}</h2>
        <p className="text-gray-400">{subtitle}</p>
        <div className="w-14 h-1 rounded-full mx-auto mt-4" style={{ background: accentColor }} />
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
        {/* Name */}
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><User size={17} /></div>
          <input {...register('name', { required: 'Full name is required' })}
            placeholder="Full Name *"
            className={`${inputBase} pl-11 ${errors.name ? 'border-red-400' : ''}`} />
          {errors.name && <p className="text-red-400 text-xs mt-1 ml-1">{errors.name.message}</p>}
        </div>

        {/* Email */}
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><Mail size={17} /></div>
          <input {...register('email', {
            required: 'Email is required',
            pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email' }
          })} type="email" placeholder="Email Address *"
            className={`${inputBase} pl-11 ${errors.email ? 'border-red-400' : ''}`} />
          {errors.email && <p className="text-red-400 text-xs mt-1 ml-1">{errors.email.message}</p>}
        </div>

        {/* Phone + Guests */}
        <div className={`grid gap-5 ${showPhone && showGuestCount ? 'grid-cols-2' : 'grid-cols-1'}`}>
          {showPhone && (
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><Phone size={17} /></div>
              <input {...register('phone')} type="tel" placeholder="Phone Number"
                className={`${inputBase} pl-11`} />
            </div>
          )}
          {showGuestCount && (
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><Users size={17} /></div>
              <select {...register('guestCount', { required: 'Required' })}
                className={`${inputBase} pl-11 appearance-none cursor-pointer ${errors.guestCount ? 'border-red-400' : ''}`}>
                <option value="">Number of Guests</option>
                {[1,2,3,4,5,6,7,8].map(n => (
                  <option key={n} value={n}>{n} Guest{n > 1 ? 's' : ''}</option>
                ))}
              </select>
              {errors.guestCount && <p className="text-red-400 text-xs mt-1 ml-1">{errors.guestCount.message}</p>}
            </div>
          )}
        </div>

        {/* Attendance */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Will you be attending? *</label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { value: 'yes', label: 'Joyfully Accept' },
              { value: 'no', label: 'Regretfully Decline' },
              { value: 'maybe', label: 'Perhaps' },
            ].map(opt => {
              const isChecked = selectedAttendance === opt.value;
              return (
                <label key={opt.value} className="cursor-pointer">
                  <input {...register('attendance', { required: 'Please select' })}
                    type="radio" value={opt.value} className="sr-only" />
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="border-2 rounded-xl p-3 text-center text-xs font-semibold tracking-wide transition-all duration-200"
                    style={{ 
                      backgroundColor: isChecked ? accentColor : 'transparent',
                      borderColor: isChecked ? accentColor : '#e2e8f0',
                      color: isChecked ? '#ffffff' : '#64748b'
                    }}>
                    {opt.label}
                  </motion.div>
                </label>
              );
            })}
          </div>
          {errors.attendance && <p className="text-red-400 text-xs mt-1 ml-1">{errors.attendance.message}</p>}
        </div>

        {/* Message */}
        <div className="relative">
          <div className="absolute left-4 top-4 text-gray-400"><MessageSquare size={17} /></div>
          <textarea {...register('message')}
            placeholder="Leave a message or any dietary requirements..."
            rows={4} className={`${inputBase} pl-11 resize-none`} />
        </div>

        {/* Submit */}
        <motion.button type="submit" disabled={currentStatus === 'loading'}
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          className="w-full btn-primary text-white font-semibold text-base py-4 rounded-2xl disabled:opacity-70 disabled:cursor-not-allowed"
          style={{ background: `linear-gradient(135deg, ${accentColor}, ${accentColorHover})` }}>
          {currentStatus === 'loading' ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 size={19} className="animate-spin" />
              Sending RSVP...
            </span>
          ) : (
            'Send My RSVP'
          )}
        </motion.button>

        {currentStatus === 'error' && (
          <p className="text-center text-red-400 text-sm">Something went wrong. Please try again.</p>
        )}
      </form>
    </div>
  );
}
