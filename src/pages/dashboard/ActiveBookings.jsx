import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageCircle, MapPin, Phone, X, Eye } from 'lucide-react';
import DashboardSidebar from '../../components/DashboardSidebar';

const bookings = [
  {
    id: 'FX-29483', service: 'AC Service & Repair', icon: '❄️',
    pro: 'Ravi Kumar', proRating: 4.8, proAvatar: 'R',
    date: 'Tue, 1 Apr 2026', time: '10:00 AM',
    status: 'Technician Assigned', statusColor: '#3E2A56', statusBg: '#EDE6F8',
    borderColor: '#3E2A56', actions: ['Track Live', 'Chat'],
  },
  {
    id: 'FX-29401', service: 'Deep Cleaning — 2BHK', icon: '🧹',
    pro: 'Sruthi V.', proRating: 4.9, proAvatar: 'S',
    date: 'Mon, 31 Mar 2026', time: '9:00 AM',
    status: 'In Progress', statusColor: '#059669', statusBg: '#D1FAE5',
    borderColor: '#10B981', actions: ['View Details'],
  },
  {
    id: 'FX-29340', service: 'Electrical Wiring Fix', icon: '⚡',
    pro: null, proAvatar: '?',
    date: 'Wed, 2 Apr 2026', time: 'Flexible',
    status: 'Pending Assignment', statusColor: '#D97706', statusBg: '#FEF3C7',
    borderColor: '#F59E0B', actions: ['Cancel'],
  },
];

export default function ActiveBookings() {
  const navigate = useNavigate();
  return (
    <div className="dashboard-layout" style={{ display: 'flex', gap: 28, alignItems: 'flex-start', maxWidth: 1100, margin: '0 auto', padding: '100px 24px 60px' }}>
      <DashboardSidebar currentPage="active-bookings" />

      <main style={{ flex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <div>
              <h1 style={{ fontSize: '1.6rem', color: '#1A1A2E', marginBottom: 4 }}>Active Bookings</h1>
              <p style={{ color: '#9B8AB0', fontSize: 14 }}>3 bookings in progress</p>
            </div>
            <button onClick={() => navigate('/booking/flow')}
              style={{
                background: 'linear-gradient(135deg, #3E2A56, #6B4A8F)', color: 'white',
                border: 'none', borderRadius: 10, padding: '10px 20px', fontWeight: 700, fontSize: 14,
                cursor: 'pointer', fontFamily: 'var(--font-sans)',
              }}>
              + New Booking
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {bookings.map((b, i) => (
              <motion.div
                key={b.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                style={{
                  background: 'white', borderRadius: 16,
                  boxShadow: '0 2px 16px rgba(62,42,86,0.06)',
                  border: `1px solid #F0ECFD`,
                  borderLeft: `4px solid ${b.borderColor}`,
                  padding: '20px 24px',
                }}>
                <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                  {/* Service icon + info */}
                  <div style={{ display: 'flex', gap: 14, flex: 1, minWidth: 200, alignItems: 'flex-start' }}>
                    <div style={{
                      width: 48, height: 48, borderRadius: 12, background: '#F8F5FF',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 22, flexShrink: 0,
                    }}>{b.icon}</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 15, color: '#1A1A2E', marginBottom: 4 }}>{b.service}</div>
                      <div style={{ fontSize: 12, color: '#9B8AB0', marginBottom: 6 }}>📅 {b.date} · 🕐 {b.time}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{
                          background: b.statusBg, color: b.statusColor,
                          fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 50,
                        }}>● {b.status}</span>
                        <span style={{ color: '#B0A0C8', fontSize: 11 }}>#{b.id}</span>
                      </div>
                    </div>
                  </div>

                  {/* Pro info */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, borderLeft: '1px solid #F0ECFD', paddingLeft: 16 }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: '50%',
                      background: b.pro ? 'linear-gradient(135deg, #6B4A8F, #9B7EC8)' : '#EDE6F8',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontWeight: 700, color: b.pro ? 'white' : '#B0A0C8', fontSize: 14,
                    }}>{b.proAvatar}</div>
                    {b.pro ? (
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 13, color: '#1A1A2E' }}>{b.pro}</div>
                        <div style={{ fontSize: 12, color: '#F59E0B', fontWeight: 600 }}>★ {b.proRating}</div>
                      </div>
                    ) : (
                      <div style={{ fontSize: 13, color: '#B0A0C8', fontStyle: 'italic' }}>Assigning…</div>
                    )}
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                    {b.actions.map(action => (
                      <motion.button
                        key={action}
                        onClick={() => {
                          if (action === 'Track Live') navigate('/dashboard/live-tracking');
                          else if (action === 'View Details') navigate('/dashboard/booking-history');
                        }}
                        whileHover={{ y: -1 }}
                        style={{
                          padding: '9px 16px', borderRadius: 10, fontWeight: 700, fontSize: 13,
                          cursor: 'pointer', fontFamily: 'var(--font-sans)',
                          background: action === 'Track Live' || action === 'View Details'
                            ? 'linear-gradient(135deg, #3E2A56, #6B4A8F)' : 'white',
                          color: action === 'Track Live' || action === 'View Details' ? 'white' : '#4A4A6A',
                          border: action === 'Cancel' ? '1.5px solid #EDE6F8' : 'none',
                          transition: 'all 0.2s',
                        }}>
                        {action === 'Chat' ? <><MessageCircle size={12} style={{ display: 'inline', marginRight: 4 }} />Chat</> : action}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
