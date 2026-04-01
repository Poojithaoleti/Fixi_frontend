import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Bell, Wallet, Calendar, ArrowRight, Zap, Search, MapPin } from 'lucide-react';
import DashboardSidebar from '../../components/DashboardSidebar';

const quickServices = [
  { icon: '❄️', label: 'AC Repair', page: 'service-detail' },
  { icon: '🔧', label: 'Plumbing', page: 'service-detail' },
  { icon: '⚡', label: 'Electrical', page: 'service-detail' },
  { icon: '🧹', label: 'Cleaning', page: 'service-detail' },
  { icon: '🔨', label: 'Carpentry', page: 'service-detail' },
  { icon: '🎨', label: 'Painting', page: 'service-detail' },
];

const upcomingBooking = {
  service: 'AC Service & Repair',
  icon: '❄️',
  pro: 'Ravi Kumar',
  date: 'Tomorrow, 1 Apr',
  time: '10:00 AM',
  status: 'Technician Assigned',
};

const recentOffers = [
  { title: '20% off Electrical', desc: 'Use code POWER20 · Valid till Apr 5', bg: 'linear-gradient(135deg, #3E2A56, #4D3569)', accent: '⚡' },
  { title: 'Free AC Filter Clean', desc: 'On Standard plan bookings this week', bg: 'linear-gradient(135deg, #1D4ED8, #3B82F6)', accent: '❄️' },
];

const stagger = {
  container: { hidden: {}, show: { transition: { staggerChildren: 0.07 } } },
  item: { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } },
};


function MobileBottomNav({ navigate }) {
  const items = [
    { icon: '🏠', label: 'Home', path: '/dashboard' },
    { icon: '📅', label: 'Bookings', path: '/dashboard/active-bookings' },
    { icon: '🔍', label: 'Services', path: '/services' },
    { icon: '👤', label: 'Profile', path: '/dashboard/profile' },
    { icon: '❓', label: 'Help', path: '/dashboard/help' },
  ];
  return (
    <nav className="mobile-bottom-nav">
      {items.map(({ icon, label, path }) => (
        <button key={path} onClick={() => navigate(path)}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, background: 'none', border: 'none', cursor: 'pointer', padding: '4px 8px', fontFamily: 'var(--font-sans)' }}>
          <span style={{ fontSize: 20 }}>{icon}</span>
          <span style={{ fontSize: 10, color: '#9B8AB0', fontWeight: 500 }}>{label}</span>
        </button>
      ))}
    </nav>
  );
}

export default function DashboardHome() {
  const navigate = useNavigate();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="dashboard-layout" style={{ display: 'flex', gap: 28, alignItems: 'flex-start', maxWidth: 1100, margin: '0 auto', padding: '100px 24px 60px' }}>
      <DashboardSidebar currentPage="dashboard" />

      <main style={{ flex: 1 }}>
        <motion.div variants={stagger.container} initial="hidden" animate="show">

          {/* Header */}
          <motion.div variants={stagger.item} style={{ marginBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
              <div>
                <p style={{ color: '#9B8AB0', fontSize: 14, marginBottom: 4 }}>{greeting} 👋</p>
                <h1 style={{ fontSize: '1.8rem', color: '#1A1A2E', lineHeight: 1.2 }}>Arjun Kumar</h1>
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <button onClick={() => navigate('/dashboard/notifications')}
                  style={{ position: 'relative', width: 42, height: 42, borderRadius: '50%', background: 'white', border: '1px solid #EDE6F8', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(62,42,86,0.08)' }}>
                  <Bell size={18} color="#3E2A56" />
                  <span style={{ position: 'absolute', top: 6, right: 6, width: 8, height: 8, borderRadius: '50%', background: '#EF4444', border: '2px solid white' }} />
                </button>
                <button onClick={() => navigate('/dashboard/wallet')}
                  style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'white', border: '1px solid #EDE6F8', borderRadius: 50, padding: '8px 16px', cursor: 'pointer', boxShadow: '0 2px 8px rgba(62,42,86,0.08)' }}>
                  <Wallet size={15} color="#3E2A56" />
                  <span style={{ fontWeight: 700, fontSize: 14, color: '#3E2A56' }}>₹470</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Search bar */}
          <motion.div variants={stagger.item}
            style={{ background: 'white', borderRadius: 14, padding: '14px 18px', marginBottom: 20, boxShadow: '0 2px 16px rgba(62,42,86,0.08)', border: '1px solid #F0ECFD', display: 'flex', gap: 12, alignItems: 'center', cursor: 'text' }}
            onClick={() => navigate('/search')}>
            <Search size={18} color="#9B8AB0" />
            <span style={{ fontSize: 14, color: '#B0A0C8', flex: 1 }}>Search for a service…</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#9B8AB0' }}>
              <MapPin size={13} /> Hyderabad
            </div>
          </motion.div>

          {/* Upcoming booking */}
          {upcomingBooking && (
            <motion.div variants={stagger.item}
              style={{ background: 'linear-gradient(135deg, #3E2A56, #5A3878)', borderRadius: 18, padding: '20px 24px', marginBottom: 20, position: 'relative', overflow: 'hidden', cursor: 'pointer' }}
              onClick={() => navigate('/dashboard/active-bookings')}
              whileHover={{ y: -2, boxShadow: '0 12px 40px rgba(62,42,86,0.35)' }}>
              <div style={{ position: 'absolute', right: -20, top: -20, width: 140, height: 140, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
              <div style={{ position: 'absolute', right: 40, bottom: -30, width: 90, height: 90, borderRadius: '50%', background: 'rgba(255,255,255,0.03)' }} />

              <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', position: 'relative' }}>
                <div style={{ fontSize: 30 }}>{upcomingBooking.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <span style={{ background: 'rgba(255,255,255,0.15)', color: 'white', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 50 }}>Upcoming</span>
                    <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11 }}>#{upcomingBooking.status}</span>
                  </div>
                  <div style={{ color: 'white', fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{upcomingBooking.service}</div>
                  <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>
                    with {upcomingBooking.pro} · {upcomingBooking.date} at {upcomingBooking.time}
                  </div>
                </div>
                <div style={{ color: 'rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, flexShrink: 0 }}>
                  Track <ArrowRight size={14} />
                </div>
              </div>
            </motion.div>
          )}

          {/* Quick book */}
          <motion.div variants={stagger.item} style={{ marginBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#1A1A2E', fontFamily: 'var(--font-sans)' }}>Book a Service</h2>
              <button onClick={() => navigate('/services')} style={{ color: '#6B4A8F', fontWeight: 700, fontSize: 13, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
                See all <ArrowRight size={13} />
              </button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 10 }}>
              {quickServices.map(({ icon, label, page }) => (
                <motion.button
                  key={label}
                  onClick={() => onNavigate(page)}
                  whileHover={{ y: -4, boxShadow: '0 8px 24px rgba(62,42,86,0.15)' }}
                  whileTap={{ scale: 0.96 }}
                  style={{
                    background: 'white', borderRadius: 14, padding: '16px 8px', border: '1px solid #F0ECFD',
                    cursor: 'pointer', fontFamily: 'var(--font-sans)', transition: 'box-shadow 0.2s',
                    boxShadow: '0 2px 8px rgba(62,42,86,0.05)',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                  }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: '#F8F5FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{icon}</div>
                  <span style={{ fontSize: 11, fontWeight: 600, color: '#4A4A6A', textAlign: 'center', lineHeight: 1.3 }}>{label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Stats row */}
          <motion.div variants={stagger.item}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 24 }}>
            {[
              { label: 'Total Bookings', val: '12', icon: Calendar, color: '#3E2A56', bg: '#EDE6F8' },
              { label: 'Avg Rating Given', val: '4.8 ★', icon: Star, color: '#D97706', bg: '#FEF3C7' },
              { label: 'Credits Earned', val: '₹800', icon: Zap, color: '#059669', bg: '#D1FAE5' },
            ].map(({ label, val, icon: Icon, color, bg }) => (
              <div key={label} style={{ background: 'white', borderRadius: 14, padding: '16px 18px', boxShadow: '0 2px 12px rgba(62,42,86,0.06)', border: '1px solid #F0ECFD', display: 'flex', gap: 12, alignItems: 'center' }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size={18} color={color} />
                </div>
                <div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: '#1A1A2E', lineHeight: 1 }}>{val}</div>
                  <div style={{ fontSize: 12, color: '#9B8AB0', marginTop: 3 }}>{label}</div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Offers */}
          <motion.div variants={stagger.item}>
            <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#1A1A2E', fontFamily: 'var(--font-sans)', marginBottom: 14 }}>Offers for You</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {recentOffers.map((offer, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -3, boxShadow: '0 10px 30px rgba(62,42,86,0.3)' }}
                  onClick={() => navigate('/services')}
                  style={{ background: offer.bg, borderRadius: 16, padding: '20px', cursor: 'pointer', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', right: -10, top: -10, fontSize: 60, opacity: 0.12 }}>{offer.accent}</div>
                  <div style={{ fontSize: 28, marginBottom: 10 }}>{offer.accent}</div>
                  <div style={{ color: 'white', fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{offer.title}</div>
                  <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, lineHeight: 1.5 }}>{offer.desc}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </motion.div>
      </main>
    </div>
  );
}
