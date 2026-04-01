import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Calendar, MapPin, Star, Download } from 'lucide-react';

export default function BookingConfirmation() {
  const navigate = useNavigate();
  return (
    <div style={{ minHeight: '100vh', background: '#F8F5FF', paddingTop: 90, paddingBottom: 60 }}>
      <div style={{ maxWidth: 560, margin: '0 auto', padding: '24px' }}>

        {/* Success animation */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            width: 90, height: 90, borderRadius: '50%',
            background: 'linear-gradient(135deg, #3E2A56, #6B4A8F)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 20px',
            boxShadow: '0 12px 40px rgba(62,42,86,0.35)',
          }}>
            <CheckCircle size={42} color="white" />
          </div>
          <h1 style={{ fontSize: '2rem', color: '#1A1A2E', marginBottom: 8 }}>
            Booking Confirmed! 🎉
          </h1>
          <p style={{ color: '#9B8AB0', fontSize: 15, lineHeight: 1.6 }}>
            Your AC service is all set. We'll assign the best pro near you shortly.
          </p>
        </motion.div>

        {/* Booking Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{
            background: 'white', borderRadius: 20, overflow: 'hidden',
            boxShadow: '0 8px 40px rgba(62,42,86,0.1)', marginBottom: 20,
          }}>
          {/* Top gradient strip */}
          <div style={{ background: 'linear-gradient(135deg, #3E2A56, #6B4A8F)', padding: '16px 24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Booking ID</div>
              <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 50, padding: '4px 12px', color: 'white', fontSize: 13, fontWeight: 700 }}>#FX-29483</div>
            </div>
          </div>

          <div style={{ padding: '24px' }}>
            {[
              { icon: '❄️', label: 'Service', val: 'AC Service & Repair — Standard', sub: null },
              { icon: '👤', label: 'Technician', val: 'Being assigned…', sub: 'You\'ll be notified within 30 min', pending: true },
              { icon: '📅', label: 'Date & Time', val: 'Tuesday, 1 April 2026', sub: '10:00 AM – 12:00 PM' },
              { icon: '📍', label: 'Address', val: 'Flat 4B, Sunridge Apts', sub: 'Banjara Hills, Hyderabad 500034' },
              { icon: '💳', label: 'Total & Payment', val: '₹699', sub: 'VISA •••• 4242' },
            ].map(({ icon, label, val, sub, pending }) => (
              <div key={label} style={{
                display: 'flex', gap: 14, alignItems: 'flex-start', paddingBottom: 16, marginBottom: 16,
                borderBottom: '1px dashed #F0ECFD',
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10, background: '#F8F5FF',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, fontSize: 16,
                }}>{icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, color: '#9B8AB0', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 3 }}>{label}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: pending ? '#9B8AB0' : '#1A1A2E', fontStyle: pending ? 'italic' : 'normal' }}>{val}</div>
                  {sub && <div style={{ fontSize: 12, color: '#B0A0C8', marginTop: 2 }}>{sub}</div>}
                </div>
              </div>
            ))}

            {/* Rating prompt */}
            <div style={{ background: '#FFF8F0', borderRadius: 10, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
              <Star size={16} color="#F59E0B" style={{ fill: '#F59E0B', flexShrink: 0 }} />
              <span style={{ fontSize: 13, color: '#78634A' }}>After the service, you'll get a chance to rate your experience.</span>
            </div>
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <motion.button
            onClick={() => navigate('/dashboard/live-tracking')}
            whileHover={{ y: -2, boxShadow: '0 8px 25px rgba(62,42,86,0.35)' }}
            whileTap={{ scale: 0.98 }}
            style={{
              width: '100%', padding: '15px', borderRadius: 12, border: 'none',
              background: 'linear-gradient(135deg, #3E2A56, #6B4A8F)',
              color: 'white', fontWeight: 700, fontSize: 15,
              fontFamily: 'var(--font-sans)', cursor: 'pointer',
            }}>
            📍 Track My Booking
          </motion.button>
          <button
            onClick={() => navigate('/dashboard/active-bookings')}
            style={{
              width: '100%', padding: '14px', borderRadius: 12,
              border: '2px solid #3E2A56', color: '#3E2A56',
              fontWeight: 700, fontSize: 15, background: 'transparent',
              fontFamily: 'var(--font-sans)', cursor: 'pointer',
            }}>
            View All Bookings
          </button>
          <button style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            color: '#6B4A8F', fontWeight: 600, fontSize: 14,
            background: 'none', border: 'none', cursor: 'pointer', padding: '8px',
          }}>
            <Download size={15} /> Add to Calendar
          </button>
        </motion.div>
      </div>
    </div>
  );
}
