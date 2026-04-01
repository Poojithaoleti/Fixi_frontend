import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Users, Briefcase, AlertTriangle, XCircle, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../../components/AdminSidebar';

const kpis = [
  { label: 'Total Revenue', value: '₹24.6L', sub: '↑ 18% this month', color: '#3E2A56', bg: '#EDE6F8', icon: TrendingUp },
  { label: 'Active Jobs', value: '84', sub: '23 pending assignment', color: '#059669', bg: '#D1FAE5', icon: Briefcase },
  { label: 'New Users (30d)', value: '1,247', sub: '↑ 312 vs last month', color: '#3E2A56', bg: '#EDE6F8', icon: Users },
  { label: 'Pending Verif.', value: '18', sub: 'Pro applications', color: '#D97706', bg: '#FEF3C7', icon: AlertTriangle },
  { label: 'Cancellation Rate', value: '4.2%', sub: '↑ 0.3% vs target', color: '#EF4444', bg: '#FEE2E2', icon: TrendingDown },
  { label: 'Platform Rating', value: '4.8★', sub: 'Across 12,450 reviews', color: '#D97706', bg: '#FEF3C7', icon: TrendingUp },
];

const recentBookings = [
  { id: 'FX-29541', service: 'AC Repair', customer: 'Arjun K.', pro: 'Ravi Kumar', city: 'Hyderabad', amount: '₹699', status: 'Active', sc: '#059669', sb: '#D1FAE5' },
  { id: 'FX-29538', service: 'Deep Cleaning', customer: 'Priya S.', pro: 'Pending', city: 'Bangalore', amount: '₹999', status: 'Pending', sc: '#D97706', sb: '#FEF3C7' },
  { id: 'FX-29522', service: 'Electrical', customer: 'Rohit V.', pro: 'Anand M.', city: 'Hyderabad', amount: '₹449', status: 'Completed', sc: '#6B7280', sb: '#F3F4F6' },
  { id: 'FX-29510', service: 'AC Install', customer: 'Sneha R.', pro: 'Ravi Kumar', city: 'Mumbai', amount: '₹1,299', status: 'Active', sc: '#059669', sb: '#D1FAE5' },
  { id: 'FX-29490', service: 'Plumbing', customer: 'Vikram N.', pro: 'Suresh P.', city: 'Delhi', amount: '₹599', status: 'Delayed', sc: '#EF4444', sb: '#FEE2E2' },
];

const topPros = [
  { name: 'Ravi Kumar', city: 'Hyderabad', category: 'AC Repair', jobs: 94, rating: 4.9 },
  { name: 'Anand M.', city: 'Bangalore', category: 'Electrical', jobs: 78, rating: 4.8 },
  { name: 'Suresh P.', city: 'Delhi', category: 'Plumbing', jobs: 71, rating: 4.8 },
  { name: 'Meena T.', city: 'Mumbai', category: 'Cleaning', jobs: 66, rating: 4.9 },
];

const monthlyRevenue = [
  { m: 'Oct', v: 1420000 }, { m: 'Nov', v: 1680000 }, { m: 'Dec', v: 2100000 },
  { m: 'Jan', v: 1890000 }, { m: 'Feb', v: 2350000 }, { m: 'Mar', v: 2460000 },
];
const maxRev = Math.max(...monthlyRevenue.map(r => r.v));

const pv = { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0, transition: { duration: 0.4 } }, exit: { opacity: 0 } };

export default function AdminDashboard() {
  const navigate = useNavigate();
  return (
    <motion.div variants={pv} initial="initial" animate="animate" exit="exit" style={{ background: '#F8F5FF', minHeight: '100vh' }}>
      <div style={{ display: 'flex', gap: 20, maxWidth: 1320, margin: '0 auto', padding: '24px 20px', alignItems: 'flex-start' }}>
        <AdminSidebar />
        <main style={{ flex: 1, minWidth: 0 }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
            <div>
              <h1 style={{ fontSize: 'clamp(1.3rem,3vw,1.8rem)', color: '#1A1A2E', fontFamily: 'var(--font-serif)' }}>Dashboard Overview</h1>
              <p style={{ color: '#9B8AB0', fontSize: 13, marginTop: 3 }}>Monday, 30 March 2026 · All cities</p>
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <select style={{ padding: '8px 14px', border: '1.5px solid #EDE6F8', borderRadius: 10, fontSize: 13, background: 'white', color: '#1A1A2E', fontFamily: 'var(--font-sans)', outline: 'none', cursor: 'pointer' }}>
                {['Last 30 days','Last 7 days','This Month','Last Quarter'].map(o => <option key={o}>{o}</option>)}
              </select>
              <button onClick={() => navigate('/admin/bookings')} style={{ background: 'linear-gradient(135deg,#3E2A56,#6B4A8F)', color: 'white', borderRadius: 10, padding: '8px 18px', fontSize: 13, fontWeight: 700, border: 'none', cursor: 'pointer', fontFamily: 'var(--font-sans)', display: 'flex', alignItems: 'center', gap: 6 }}>
                <ArrowUpRight size={14} /> View Bookings
              </button>
            </div>
          </div>

          {/* KPIs */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(180px,1fr))', gap: 14, marginBottom: 22 }}>
            {kpis.map((k, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                style={{ background: 'white', borderRadius: 14, padding: '16px 18px', boxShadow: '0 2px 12px rgba(62,42,86,0.07)', border: '1px solid #F0EAF8', borderTop: `3px solid ${k.color}` }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: 11, color: '#9B8AB0', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{k.label}</span>
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: k.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <k.icon size={13} color={k.color} />
                  </div>
                </div>
                <div style={{ fontSize: 22, fontWeight: 800, color: k.color, fontFamily: 'var(--font-sans)', lineHeight: 1, marginBottom: 4 }}>{k.value}</div>
                <div style={{ fontSize: 11, color: '#9B8AB0' }}>{k.sub}</div>
              </motion.div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 18, marginBottom: 18 }} className="admin-two-col">
            {/* Revenue chart */}
            <div style={{ background: 'white', borderRadius: 16, padding: '20px 22px', boxShadow: '0 2px 12px rgba(62,42,86,0.07)', border: '1px solid #F0EAF8' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
                <span style={{ fontWeight: 700, color: '#1A1A2E', fontSize: 15 }}>Revenue Trend</span>
                <span style={{ background: '#D1FAE5', color: '#059669', borderRadius: 50, padding: '3px 10px', fontSize: 12, fontWeight: 600 }}>↑ 18%</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, height: 100 }}>
                {monthlyRevenue.map(({ m, v }, i) => (
                  <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                    <motion.div initial={{ height: 0 }} animate={{ height: `${(v / maxRev) * 88}px` }} transition={{ duration: 0.7, delay: 0.2 + i * 0.07 }}
                      style={{ width: '100%', background: i === 5 ? 'linear-gradient(0deg,#3E2A56,#6B4A8F)' : '#EDE6F8', borderRadius: '4px 4px 0 0', minHeight: 4 }} />
                    <span style={{ fontSize: 11, color: i === 5 ? '#3E2A56' : '#9B8AB0', fontWeight: i === 5 ? 700 : 400 }}>{m}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Pros */}
            <div style={{ background: 'white', borderRadius: 16, padding: '20px 22px', boxShadow: '0 2px 12px rgba(62,42,86,0.07)', border: '1px solid #F0EAF8' }}>
              <div style={{ fontWeight: 700, color: '#1A1A2E', fontSize: 15, marginBottom: 14 }}>Top Pros This Month</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {topPros.map((p, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg,#3E2A56,#6B4A8F)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 13, fontWeight: 700, flexShrink: 0 }}>{p.name[0]}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#1A1A2E' }}>{p.name}</div>
                      <div style={{ fontSize: 11, color: '#9B8AB0' }}>{p.category} · {p.city}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#3E2A56' }}>{p.jobs} jobs</div>
                      <div style={{ fontSize: 11, color: '#D97706' }}>{p.rating}★</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Bookings table */}
          <div style={{ background: 'white', borderRadius: 16, boxShadow: '0 2px 12px rgba(62,42,86,0.07)', border: '1px solid #F0EAF8', overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid #F0EAF8' }}>
              <span style={{ fontWeight: 700, color: '#1A1A2E', fontSize: 15 }}>Recent Bookings</span>
              <button onClick={() => navigate('/admin/bookings')} style={{ color: '#6B4A8F', fontSize: 13, fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>View All →</button>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr style={{ background: '#F8F5FF' }}>
                    {['Booking ID','Service','Customer','Pro','City','Amount','Status'].map(h => (
                      <th key={h} style={{ padding: '10px 16px', textAlign: 'left', color: '#3E2A56', fontWeight: 700, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.map((b, i) => (
                    <motion.tr key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                      onClick={() => navigate('/admin/bookings')}
                      style={{ borderBottom: '1px solid #F8F5FF', cursor: 'pointer', background: b.status === 'Delayed' ? '#FFF7ED' : 'white', borderLeft: b.status === 'Delayed' ? '3px solid #F59E0B' : '3px solid transparent' }}
                      onMouseEnter={e => e.currentTarget.style.background = '#F8F5FF'}
                      onMouseLeave={e => e.currentTarget.style.background = b.status === 'Delayed' ? '#FFF7ED' : 'white'}>
                      <td style={{ padding: '11px 16px', color: '#6B4A8F', fontWeight: 600 }}>{b.id}</td>
                      <td style={{ padding: '11px 16px', color: '#1A1A2E' }}>{b.service}</td>
                      <td style={{ padding: '11px 16px', color: '#4A4A6A' }}>{b.customer}</td>
                      <td style={{ padding: '11px 16px', color: b.pro === 'Pending' ? '#D97706' : '#4A4A6A', fontWeight: b.pro === 'Pending' ? 600 : 400 }}>{b.pro}</td>
                      <td style={{ padding: '11px 16px', color: '#9B8AB0' }}>{b.city}</td>
                      <td style={{ padding: '11px 16px', color: '#1A1A2E', fontWeight: 700 }}>{b.amount}</td>
                      <td style={{ padding: '11px 16px' }}>
                        <span style={{ background: b.sb, color: b.sc, borderRadius: 50, padding: '3px 10px', fontSize: 11, fontWeight: 700 }}>{b.status}</span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </motion.div>
  );
}
