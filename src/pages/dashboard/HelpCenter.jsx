import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, MessageCircle, Phone, Plus } from 'lucide-react';
import DashboardSidebar from '../../components/DashboardSidebar';

const categories = [
  { icon: '📅', label: 'Bookings & Scheduling' },
  { icon: '💳', label: 'Payments & Refunds' },
  { icon: '👨‍🔧', label: 'Service Professionals' },
  { icon: '📍', label: 'Tracking & Arrival' },
  { icon: '⭐', label: 'Ratings & Reviews' },
  { icon: '🔐', label: 'Account & Security' },
];

const faqs = [
  { q: 'How do I cancel or reschedule a booking?', a: 'You can cancel or reschedule up to 2 hours before the scheduled time from your Active Bookings page. Cancellations within 2 hours may incur a small fee.' },
  { q: 'When will my refund be processed?', a: 'Refunds are processed within 3–5 business days to your original payment method. Wallet refunds are instant.' },
  { q: 'How are service professionals vetted?', a: 'All FIXI pros undergo background verification, skill certification, and a trial period before being listed on the platform.' },
  { q: 'What if the technician doesn\'t show up?', a: 'If your technician is more than 30 minutes late without contact, you can request a free reassignment or a full refund from the Live Tracking page.' },
  { q: 'Can I request a specific professional?', a: 'Yes! You can view a pro\'s profile and ratings before booking, or book a pro you\'ve worked with before from your Booking History.' },
];

export default function HelpCenter() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);
  const [search, setSearch] = useState('');

  return (
    <div className="dashboard-layout" style={{ display: 'flex', gap: 28, alignItems: 'flex-start', maxWidth: 1100, margin: '0 auto', padding: '100px 24px 60px' }}>
      <DashboardSidebar currentPage="help" />

      <main style={{ flex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <h1 style={{ fontSize: '1.8rem', color: '#1A1A2E', marginBottom: 8 }}>How can we help you?</h1>
            <p style={{ color: '#9B8AB0', fontSize: 15 }}>Search our help center or browse by category</p>
          </div>

          {/* Search bar */}
          <div style={{ position: 'relative', marginBottom: 32, maxWidth: 560, margin: '0 auto 32px' }}>
            <Search size={18} color="#9B8AB0" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }} />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search for help topics, FAQs…"
              style={{
                width: '100%', padding: '15px 56px 15px 48px', borderRadius: 12,
                border: '2px solid #EDE6F8', outline: 'none', fontSize: 15,
                fontFamily: 'var(--font-sans)', color: '#1A1A2E', boxSizing: 'border-box',
                boxShadow: '0 4px 20px rgba(62,42,86,0.08)',
              }}
              onFocus={e => e.target.style.borderColor = '#3E2A56'}
              onBlur={e => e.target.style.borderColor = '#EDE6F8'}
            />
            {search && (
              <button onClick={() => setSearch('')}
                style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#9B8AB0' }}>
                ✕
              </button>
            )}
          </div>

          {/* Categories */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 32 }}>
            {categories.map(({ icon, label }) => (
              <motion.button
                key={label}
                whileHover={{ y: -3, boxShadow: '0 8px 24px rgba(62,42,86,0.12)' }}
                whileTap={{ scale: 0.97 }}
                style={{
                  background: 'white', borderRadius: 14, padding: '20px 16px', border: '1px solid #F0ECFD',
                  cursor: 'pointer', fontFamily: 'var(--font-sans)', transition: 'all 0.2s',
                  boxShadow: '0 2px 12px rgba(62,42,86,0.05)',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
                }}>
                <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#F8F5FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{icon}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#1A1A2E', textAlign: 'center', lineHeight: 1.3 }}>{label}</div>
              </motion.button>
            ))}
          </div>

          {/* FAQs */}
          <div style={{ background: 'white', borderRadius: 16, overflow: 'hidden', boxShadow: '0 2px 16px rgba(62,42,86,0.06)', border: '1px solid #F0ECFD', marginBottom: 24 }}>
            <div style={{ padding: '18px 24px', borderBottom: '1px solid #F8F5FF', fontWeight: 700, fontSize: 13, color: '#3E2A56', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'var(--font-sans)' }}>
              Popular Questions
            </div>
            {faqs.map((faq, i) => (
              <div key={i} style={{ borderBottom: i < faqs.length - 1 ? '1px solid #F8F5FF' : 'none' }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{
                    width: '100%', padding: '18px 24px', textAlign: 'left', background: openFaq === i ? '#F8F5FF' : 'white',
                    border: 'none', cursor: 'pointer', fontFamily: 'var(--font-sans)',
                    borderLeft: openFaq === i ? '3px solid #3E2A56' : '3px solid transparent',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12,
                    transition: 'all 0.2s',
                  }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: openFaq === i ? '#3E2A56' : '#1A1A2E', flex: 1 }}>{faq.q}</span>
                  <motion.div animate={{ rotate: openFaq === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown size={18} color={openFaq === i ? '#3E2A56' : '#9B8AB0'} />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      style={{ overflow: 'hidden' }}>
                      <div style={{ padding: '0 24px 18px 27px', fontSize: 14, color: '#4A4A6A', lineHeight: 1.7 }}>{faq.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Live support */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 20 }}>
            <motion.div whileHover={{ y: -2 }} style={{
              background: 'linear-gradient(135deg, #3E2A56, #6B4A8F)',
              borderRadius: 14, padding: '20px', cursor: 'pointer',
            }}>
              <MessageCircle size={24} color="white" style={{ marginBottom: 10 }} />
              <div style={{ color: 'white', fontWeight: 700, fontSize: 15, marginBottom: 4 }}>Live Chat</div>
              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>Avg reply: 2 min</div>
            </motion.div>
            <motion.div whileHover={{ y: -2 }} style={{
              background: 'white', borderRadius: 14, padding: '20px', cursor: 'pointer',
              border: '2px solid #3E2A56', boxShadow: '0 2px 12px rgba(62,42,86,0.06)',
            }}>
              <Phone size={24} color="#3E2A56" style={{ marginBottom: 10 }} />
              <div style={{ color: '#1A1A2E', fontWeight: 700, fontSize: 15, marginBottom: 4 }}>Call Us</div>
              <div style={{ color: '#9B8AB0', fontSize: 13 }}>1800-FIXI-PRO</div>
            </motion.div>
          </div>

          {/* Raise ticket */}
          <div style={{ background: 'white', borderRadius: 14, padding: '20px 24px', boxShadow: '0 2px 12px rgba(62,42,86,0.06)', border: '1px solid #F0ECFD', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15, color: '#1A1A2E', marginBottom: 4 }}>Didn't find your answer?</div>
              <div style={{ fontSize: 13, color: '#9B8AB0' }}>Our support team will respond within 24 hours</div>
            </div>
            <button style={{
              padding: '11px 22px', borderRadius: 10, border: '2px solid #3E2A56',
              color: '#3E2A56', fontWeight: 700, fontSize: 14, background: 'transparent',
              cursor: 'pointer', fontFamily: 'var(--font-sans)', display: 'flex', alignItems: 'center', gap: 6,
              transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#3E2A56'; e.currentTarget.style.color = 'white'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#3E2A56'; }}>
              <Plus size={15} /> Raise a Ticket
            </button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
