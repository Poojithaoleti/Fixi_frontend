import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Calendar, Clock, Star, CreditCard, Wallet, Bell, Gift, HelpCircle, LogOut, Wrench, ChevronRight } from 'lucide-react';

const navItems = [
  { icon: User, label: 'My Profile', page: 'profile' },
  { icon: Calendar, label: 'Active Bookings', page: 'active-bookings', badge: 2 },
  { icon: Clock, label: 'Booking History', page: 'booking-history' },
  { icon: Star, label: 'Ratings & Reviews', page: 'ratings' },
  { icon: CreditCard, label: 'Payment Methods', page: 'payment-methods' },
  { icon: Wallet, label: 'Wallet & Credits', page: 'wallet' },
  { icon: Bell, label: 'Notifications', page: 'notifications', badge: 5 },
  { icon: Gift, label: 'Referral Program', page: 'referral' },
  { icon: HelpCircle, label: 'Help Center', page: 'help' },
];

export default function DashboardSidebar() {
  const navigate = useNavigate();
  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      style={{
        width: 260, flexShrink: 0,
        background: 'linear-gradient(180deg, #3E2A56 0%, #2A1B3D 100%)',
        borderRadius: 16, padding: '24px 0',
        display: 'flex', flexDirection: 'column',
        minHeight: 'calc(100vh - 120px)',
        position: 'sticky', top: 100,
      }}>

      {/* User info */}
      <div style={{ padding: '0 20px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 44, height: 44, borderRadius: '50%',
            background: 'linear-gradient(135deg, #6B4A8F, #9B7EC8)',
            border: '2px solid rgba(237,230,248,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 800, color: 'white', fontSize: 16,
          }}>A</div>
          <div>
            <div style={{ color: 'white', fontWeight: 700, fontSize: 14 }}>Arjun Kumar</div>
            <div style={{ color: '#B0A0C8', fontSize: 12 }}>Member since 2024</div>
          </div>
        </div>
        {/* Wallet quick view */}
        <div style={{
          marginTop: 14, background: 'rgba(107,74,143,0.3)', borderRadius: 10, padding: '10px 14px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div>
            <div style={{ color: '#B0A0C8', fontSize: 11 }}>Wallet Balance</div>
            <div style={{ color: 'white', fontWeight: 800, fontSize: 16 }}>₹470</div>
          </div>
          <button onClick={() => navigate('/dashboard/wallet')}
            style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: 6, padding: '5px 10px', color: 'white', fontSize: 11, fontWeight: 600, cursor: 'pointer' }}>
            Add Money
          </button>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '12px 12px' }}>
        {navItems.map(({ icon: Icon, label, page, badge }) => {
          const active = currentPage === page;
          return (
            <motion.button
              key={page}
              onClick={() => onNavigate(page)}
              whileHover={{ x: 2 }}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                padding: '11px 12px', borderRadius: 10, border: 'none', cursor: 'pointer',
                background: active ? 'rgba(255,255,255,0.12)' : 'transparent',
                borderLeft: active ? '3px solid white' : '3px solid transparent',
                color: active ? 'white' : '#B0A0C8',
                fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: active ? 600 : 500,
                textAlign: 'left', transition: 'all 0.2s', marginBottom: 2,
              }}>
              <Icon size={16} />
              <span style={{ flex: 1 }}>{label}</span>
              {badge && (
                <span style={{
                  background: 'linear-gradient(135deg, #3E2A56, #6B4A8F)',
                  color: 'white', fontSize: 10, fontWeight: 700,
                  borderRadius: 50, padding: '2px 6px', minWidth: 18, textAlign: 'center',
                }}>{badge}</span>
              )}
            </motion.button>
          );
        })}
      </nav>

      {/* Logout */}
      <div style={{ padding: '12px 20px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <button onClick={() => navigate('/')}
          style={{
            width: '100%', display: 'flex', alignItems: 'center', gap: 10,
            padding: '10px 12px', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: 'rgba(239,68,68,0.12)', color: '#F87171',
            fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 600,
          }}>
          <LogOut size={16} /> Log Out
        </button>
      </div>
    </motion.aside>
  );
}
