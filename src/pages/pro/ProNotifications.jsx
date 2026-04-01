import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCheck, Clock } from 'lucide-react';
import ProSidebar from '../../components/ProSidebar';

const tabs = ['All', 'Job Leads', 'Payments', 'System'];

const notifications = [
  { id: 1, title: 'New job lead nearby!', desc: 'AC Repair · Madhapur · ₹520 payout · Expires in 4:32', time: '2 min ago', icon: '⚡', iconBg: 'linear-gradient(135deg,#3E2A56,#6B4A8F)', iconColor: 'white', unread: true, tab: 'Job Leads', urgent: true },
  { id: 2, title: '₹468 payout sent!', desc: 'Payment for FX-29200 (AC Service — Arjun K.) has been credited to HDFC ••7842.', time: '1 hr ago', icon: '💸', iconBg: '#D1FAE5', iconColor: '#059669', unread: true, tab: 'Payments' },
  { id: 3, title: '5★ review received', desc: 'Arjun K. gave you 5 stars: "Ravi was punctual and professional. Fixed the AC perfectly!"', time: '3 hr ago', icon: '⭐', iconBg: '#FEF3C7', iconColor: '#D97706', unread: true, tab: 'System' },
  { id: 4, title: 'New job lead nearby!', desc: 'Deep Cleaning · Gachibowli · ₹780 payout · Expires in 12:05', time: '5 hr ago', icon: '⚡', iconBg: 'linear-gradient(135deg,#3E2A56,#6B4A8F)', iconColor: 'white', unread: false, tab: 'Job Leads' },
  { id: 5, title: 'Weekly payout processed', desc: 'Your weekly earnings of ₹12,450 have been transferred. Expected arrival: Friday.', time: 'Yesterday', icon: '🏦', iconBg: '#D1FAE5', iconColor: '#059669', unread: false, tab: 'Payments' },
  { id: 6, title: 'Profile completion reminder', desc: "You're at 78% profile completion. Add a bio to get 30% more bookings.", time: '2 days ago', icon: '👤', iconBg: '#EDE6F8', iconColor: '#6B4A8F', unread: false, tab: 'System' },
  { id: 7, title: 'Platform update', desc: 'FIXI Pro app v3.2 is available. New: instant job alerts, improved navigation.', time: '3 days ago', icon: '🔔', iconBg: '#EDE6F8', iconColor: '#6B4A8F', unread: false, tab: 'System' },
];

const pv = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
};

export default function ProNotifications() {
  const [tab, setTab] = useState('All');
  const [items, setItems] = useState(notifications);

  const filtered = tab === 'All' ? items : items.filter(n => n.tab === tab);
  const markAllRead = () => setItems(p => p.map(n => ({ ...n, unread: false })));
  const unreadCount = items.filter(n => n.unread).length;

  return (
    <motion.div variants={pv} initial="initial" animate="animate" exit="exit">
      <div style={{ display: 'flex', gap: 28, maxWidth: 1200, margin: '0 auto', padding: '100px 24px 60px', alignItems: 'flex-start' }}>
        <ProSidebar currentPage="pro-notifications" />

        <main style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <h1 style={{ fontSize: 'clamp(1.3rem,3vw,1.8rem)', color: '#1A1A2E', fontFamily: 'var(--font-serif)' }}>Notifications</h1>
              {unreadCount > 0 && <span style={{ background: 'linear-gradient(135deg,#3E2A56,#6B4A8F)', color: 'white', borderRadius: 50, fontSize: 12, fontWeight: 700, padding: '2px 9px' }}>{unreadCount}</span>}
            </div>
            {unreadCount > 0 && (
              <button onClick={markAllRead} style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#6B4A8F', fontWeight: 600, fontSize: 13, background: 'none', border: 'none', cursor: 'pointer' }}>
                <CheckCheck size={15} /> Mark all as read
              </button>
            )}
          </div>

          {/* Tab filter */}
          <div style={{ display: 'flex', gap: 6, marginBottom: 20, flexWrap: 'wrap' }}>
            {tabs.map(t => (
              <button key={t} onClick={() => setTab(t)} style={{ padding: '8px 16px', borderRadius: 50, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-sans)', transition: 'all 0.2s', background: tab === t ? 'linear-gradient(135deg,#3E2A56,#6B4A8F)' : 'white', color: tab === t ? 'white' : '#9B8AB0', border: tab === t ? 'none' : '1.5px solid #EDE6F8' }}>{t}</button>
            ))}
          </div>

          <div style={{ background: 'white', borderRadius: 16, boxShadow: '0 4px 20px rgba(62,42,86,0.07)', border: '1px solid #F0EAF8', overflow: 'hidden' }}>
            <AnimatePresence>
              {filtered.map((n, i) => (
                <motion.div key={n.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                  onClick={() => setItems(p => p.map(x => x.id === n.id ? { ...x, unread: false } : x))}
                  style={{ display: 'flex', gap: 14, padding: '16px 20px', borderBottom: i < filtered.length - 1 ? '1px solid #F8F5FF' : 'none', background: n.unread ? '#F8F5FF' : 'white', cursor: 'pointer', borderLeft: n.unread ? '3px solid #3E2A56' : '3px solid transparent', transition: 'background 0.2s' }}>
                  {/* Icon */}
                  <div style={{ width: 44, height: 44, borderRadius: '50%', background: n.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{n.icon}</div>

                  {/* Content */}
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 4 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                        <span style={{ fontWeight: n.unread ? 700 : 600, color: '#1A1A2E', fontSize: 14 }}>{n.title}</span>
                        {n.urgent && <span style={{ background: '#FEF3C7', color: '#D97706', borderRadius: 50, fontSize: 11, fontWeight: 700, padding: '1px 8px', display: 'flex', alignItems: 'center', gap: 3 }}><Clock size={10} /> Urgent</span>}
                      </div>
                      <span style={{ color: '#9B8AB0', fontSize: 12, flexShrink: 0 }}>{n.time}</span>
                    </div>
                    <p style={{ color: '#6B6B8A', fontSize: 13, lineHeight: 1.5 }}>{n.desc}</p>
                  </div>

                  {n.unread && <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#3E2A56', flexShrink: 0, marginTop: 6 }} />}
                </motion.div>
              ))}
            </AnimatePresence>

            {filtered.length === 0 && (
              <div style={{ textAlign: 'center', padding: '60px 40px' }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>🔔</div>
                <h3 style={{ fontSize: 17, color: '#1A1A2E', marginBottom: 6 }}>No notifications</h3>
                <p style={{ color: '#9B8AB0', fontSize: 13 }}>You're all caught up!</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </motion.div>
  );
}
