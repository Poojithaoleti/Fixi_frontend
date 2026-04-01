import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Download, RefreshCw } from 'lucide-react';
import DashboardSidebar from '../../components/DashboardSidebar';

const tabs = ['All', 'Completed', 'Cancelled'];

const bookings = [
  { id: 'FX-29200', service: 'AC Service & Repair', icon: '❄️', pro: 'Ravi Kumar', date: 'Mar 15, 2026', status: 'Completed', statusColor: '#059669', statusBg: '#D1FAE5', price: '₹699', rating: 5 },
  { id: 'FX-28900', service: 'Electrical Wiring Repair', icon: '⚡', pro: 'Anand M.', date: 'Mar 2, 2026', status: 'Completed', statusColor: '#059669', statusBg: '#D1FAE5', price: '₹450', rating: 4 },
  { id: 'FX-28700', service: 'Plumbing Leak Fix', icon: '🔧', pro: 'Suresh P.', date: 'Feb 20, 2026', status: 'Cancelled', statusColor: '#6B7280', statusBg: '#F3F4F6', price: '₹0', rating: null },
  { id: 'FX-28500', service: 'Home Deep Cleaning', icon: '🧹', pro: 'CleanPro Team', date: 'Feb 10, 2026', status: 'Completed', statusColor: '#059669', statusBg: '#D1FAE5', price: '₹1299', rating: 5 },
  { id: 'FX-28100', service: 'Pest Control — Cockroach', icon: '🪲', pro: 'SafeHome Pro', date: 'Jan 28, 2026', status: 'Completed', statusColor: '#059669', statusBg: '#D1FAE5', price: '₹599', rating: 4 },
];

export default function BookingHistory() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('All');

  const filtered = tab === 'All' ? bookings : bookings.filter(b => b.status === tab);
  const totalSpent = bookings.filter(b => b.status === 'Completed').reduce((s, b) => s + parseInt(b.price.slice(1)), 0);
  const avgRating = (bookings.filter(b => b.rating).reduce((s, b) => s + b.rating, 0) / bookings.filter(b => b.rating).length).toFixed(1);

  return (
    <div className="dashboard-layout" style={{ display: 'flex', gap: 28, alignItems: 'flex-start', maxWidth: 1100, margin: '0 auto', padding: '100px 24px 60px' }}>
      <DashboardSidebar currentPage="booking-history" />

      <main style={{ flex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 style={{ fontSize: '1.6rem', color: '#1A1A2E', marginBottom: 20 }}>Booking History</h1>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 24 }}>
            {[
              { label: 'Total Bookings', val: bookings.length },
              { label: 'Amount Spent', val: `₹${totalSpent.toLocaleString()}` },
              { label: 'Avg Rating Given', val: `${avgRating} ★` },
            ].map(({ label, val }) => (
              <div key={label} style={{
                background: 'white', borderRadius: 14, padding: '18px 20px',
                boxShadow: '0 2px 12px rgba(62,42,86,0.06)', border: '1px solid #F0ECFD',
                borderTop: '3px solid transparent',
                borderImage: 'linear-gradient(135deg, #3E2A56, #6B4A8F) 1',
              }}>
                <div style={{ fontSize: 24, fontWeight: 800, color: '#3E2A56', marginBottom: 4 }}>{val}</div>
                <div style={{ fontSize: 12, color: '#9B8AB0', fontWeight: 600 }}>{label}</div>
              </div>
            ))}
          </div>

          {/* Filter tabs */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
            {tabs.map(t => (
              <button key={t} onClick={() => setTab(t)}
                style={{
                  padding: '9px 20px', borderRadius: 50, fontWeight: 700, fontSize: 13,
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

          {/* History list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {filtered.map((b, i) => (
              <motion.div
                key={b.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                style={{
                  background: 'white', borderRadius: 14, padding: '18px 20px',
                  boxShadow: '0 2px 12px rgba(62,42,86,0.05)', border: '1px solid #F0ECFD',
                  display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap',
                }}>
                {/* Icon */}
                <div style={{ width: 44, height: 44, borderRadius: 12, background: '#F8F5FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{b.icon}</div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 140 }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: '#1A1A2E', marginBottom: 2 }}>{b.service}</div>
                  <div style={{ fontSize: 12, color: '#9B8AB0', marginBottom: 6 }}>by {b.pro} · {b.date}</div>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <span style={{ background: b.statusBg, color: b.statusColor, fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 50 }}>{b.status}</span>
                    {b.rating && (
                      <div style={{ display: 'flex', gap: 2 }}>
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={11} style={{ fill: i < b.rating ? '#FBBF24' : '#EDE6F8', color: i < b.rating ? '#FBBF24' : '#EDE6F8' }} />
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Price + actions */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
                  <div style={{ fontWeight: 800, fontSize: 16, color: '#3E2A56' }}>{b.price}</div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button style={{
                      padding: '7px 14px', borderRadius: 8, border: '1.5px solid #EDE6F8',
                      background: 'white', color: '#6B4A8F', fontWeight: 600, fontSize: 12,
                      cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4,
                    }}>
                      <Download size={12} /> Invoice
                    </button>
                    {b.status === 'Completed' && (
                      <motion.button
                        onClick={() => navigate('/booking/flow')}
                        whileHover={{ y: -1 }}
                        style={{
                          padding: '7px 14px', borderRadius: 8, border: 'none',
                          background: 'linear-gradient(135deg, #3E2A56, #6B4A8F)',
                          color: 'white', fontWeight: 700, fontSize: 12,
                          cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4,
                        }}>
                        <RefreshCw size={12} /> Rebook
                      </motion.button>
                    )}
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
