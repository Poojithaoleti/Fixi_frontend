import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCheck } from 'lucide-react';
import DashboardSidebar from '../../components/DashboardSidebar';

const tabs = ['All', 'Bookings', 'Promos', 'Reminders'];

const notifications = [
  { id: 1, title: 'Technician assigned!', desc: "Ravi Kumar (\u2605 4.8) has accepted your AC repair job. He'll arrive by 10:00 AM.", time: '2 min ago', icon: '🔧', iconBg: 'linear-gradient(135deg, #3E2A56, #6B4A8F)', iconColor: 'white', unread: true, tab: 'Bookings' },
  { id: 2, title: '₹100 cashback credited!', desc: 'Your March booking cashback has been added to your FIXI Wallet.', time: '1 hr ago', icon: '💸', iconBg: '#FEF3C7', iconColor: '#D97706', unread: true, tab: 'Promos' },
  { id: 3, title: 'Booking confirmed', desc: 'AC Service on 1 April 2026 at 10:00 AM is confirmed. Booking ID: #FX-29483.', time: '3 hr ago', icon: '✅', iconBg: '#D1FAE5', iconColor: '#059669', unread: true, tab: 'Bookings' },
  { id: 4, title: 'Rate your experience', desc: 'How was your Deep Cleaning service by CleanPro Team? Share your feedback.', time: 'Yesterday', icon: '⭐', iconBg: '#FEF3C7', iconColor: '#D97706', unread: false, tab: 'Reminders' },
  { id: 5, title: 'Weekend offer — 20% off', desc: 'Book any electrical service this weekend and save 20%. Use code POWER20.', time: '2 days ago', icon: '🏷️', iconBg: '#EDE6F8', iconColor: '#6B4A8F', unread: false, tab: 'Promos' },
  { id: 6, title: 'Service reminder', desc: "Your AC hasn't been serviced in 6 months. Book a checkup before summer!", time: '3 days ago', icon: '🔔', iconBg: '#FEF3C7', iconColor: '#D97706', unread: false, tab: 'Reminders' },
  { id: 7, title: 'Referral bonus earned', desc: 'Your friend Priya M. made their first booking! ₹100 has been added to your wallet.', time: '5 days ago', icon: '🎁', iconBg: '#EDE6F8', iconColor: '#6B4A8F', unread: false, tab: 'Promos' },
];

export default function Notifications() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('All');
  const filtered = tab === 'All' ? notifications : notifications.filter(n => n.tab === tab);
  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <div className="dashboard-layout" style={{ display: 'flex', gap: 28, alignItems: 'flex-start', maxWidth: 1100, margin: '0 auto', padding: '100px 24px 60px' }}>
      <DashboardSidebar currentPage="notifications" />

      <main style={{ flex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <div>
              <h1 style={{ fontSize: '1.6rem', color: '#1A1A2E', marginBottom: 4 }}>Notifications</h1>
              <p style={{ color: '#9B8AB0', fontSize: 14 }}>{unreadCount} unread notifications</p>
            </div>
            <button style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#6B4A8F', fontWeight: 700, fontSize: 13, background: 'none', border: 'none', cursor: 'pointer' }}>
              <CheckCheck size={15} /> Mark all as read
            </button>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
            {tabs.map(t => (
              <button key={t} onClick={() => setTab(t)}
                style={{
                  padding: '8px 18px', borderRadius: 50, fontWeight: 700, fontSize: 13,
                  cursor: 'pointer', border: 'none', fontFamily: 'var(--font-sans)',
                  background: tab === t ? 'linear-gradient(135deg, #3E2A56, #6B4A8F)' : 'white',
                  color: tab === t ? 'white' : '#4A4A6A',
                  boxShadow: tab === t ? '0 4px 12px rgba(62,42,86,0.3)' : '0 0 0 1.5px #EDE6F8',
                  transition: 'all 0.2s',
                }}>
                {t}
              </button>
            ))}
          </div>

          {/* Notification list */}
          <div style={{ background: 'white', borderRadius: 16, overflow: 'hidden', boxShadow: '0 2px 16px rgba(62,42,86,0.06)', border: '1px solid #F0ECFD' }}>
            {filtered.length === 0 ? (
              <div style={{ padding: '60px', textAlign: 'center' }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>🔔</div>
                <div style={{ fontSize: 15, fontWeight: 600, color: '#9B8AB0' }}>No notifications here</div>
              </div>
            ) : (
              <AnimatePresence>
                {filtered.map((n, i) => (
                  <motion.div
                    key={n.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    style={{
                      display: 'flex', gap: 14, padding: '16px 20px', cursor: 'pointer',
                      background: n.unread ? '#F8F5FF' : 'white',
                      borderLeft: n.unread ? '3px solid #3E2A56' : '3px solid transparent',
                      borderBottom: i < filtered.length - 1 ? '1px solid #F8F5FF' : 'none',
                      transition: 'background 0.2s',
                    }}
                    whileHover={{ background: '#F0ECFD' }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: '50%',
                      background: n.iconBg, flexShrink: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 18,
                    }}>{n.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: n.unread ? 700 : 600, fontSize: 14, color: '#1A1A2E', marginBottom: 3 }}>{n.title}</div>
                      <div style={{ fontSize: 13, color: '#9B8AB0', lineHeight: 1.5, marginBottom: 6 }}>{n.desc}</div>
                      <div style={{ fontSize: 11, color: '#B0A0C8', fontWeight: 600 }}>{n.time}</div>
                    </div>
                    {n.unread && <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#3E2A56', flexShrink: 0, marginTop: 6 }} />}
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
