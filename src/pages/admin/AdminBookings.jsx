import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ChevronDown, RefreshCw } from 'lucide-react';
import AdminSidebar from '../../components/AdminSidebar';

const bookings = [
  { id: 'FX-29541', service: 'AC Repair', customer: 'Arjun K.', pro: 'Ravi Kumar', city: 'Hyderabad', date: '30 Mar · 4:00 PM', amount: '₹699', status: 'Active', flag: false },
  { id: 'FX-29538', service: 'Deep Cleaning', customer: 'Priya S.', pro: 'Pending', city: 'Bangalore', date: '31 Mar · 9:00 AM', amount: '₹999', status: 'Pending', flag: false },
  { id: 'FX-29522', service: 'Electrical', customer: 'Rohit V.', pro: 'Anand M.', city: 'Hyderabad', date: '30 Mar · 6:00 PM', amount: '₹449', status: 'Delayed', flag: true },
  { id: 'FX-29510', service: 'AC Installation', customer: 'Sneha R.', pro: 'Ravi Kumar', city: 'Mumbai', date: '1 Apr · 11:00 AM', amount: '₹1,299', status: 'Active', flag: false },
  { id: 'FX-29490', service: 'Plumbing', customer: 'Vikram N.', pro: 'Suresh P.', city: 'Delhi', date: '29 Mar · 2:00 PM', amount: '₹599', status: 'Completed', flag: false },
  { id: 'FX-29477', service: 'Pest Control', customer: 'Meera I.', pro: 'SafeHome Pro', city: 'Hyderabad', date: '29 Mar · 10:00 AM', amount: '₹899', status: 'Cancelled', flag: false },
  { id: 'FX-29460', service: 'Carpentry', customer: 'Karan M.', pro: 'Pending', city: 'Pune', date: '2 Apr · 3:00 PM', amount: '₹849', status: 'Pending', flag: false },
  { id: 'FX-29444', service: 'Painting', customer: 'Divya R.', pro: 'ColorPro', city: 'Chennai', date: '28 Mar · 8:00 AM', amount: '₹2,499', status: 'Delayed', flag: true },
];

const statusColors = {
  Active: ['#3B82F6', '#EFF6FF'], Pending: ['#D97706', '#FEF3C7'],
  Completed: ['#059669', '#D1FAE5'], Cancelled: ['#6B7280', '#F3F4F6'],
  Delayed: ['#EF4444', '#FEE2E2'],
};

const timeline = [
  { label: 'Booking Created', done: true, time: '3:45 PM' },
  { label: 'Pro Assigned', done: true, time: '3:52 PM' },
  { label: 'Pro On the Way', done: true, time: '4:15 PM' },
  { label: 'Service Started', done: false, time: '' },
  { label: 'Completed', done: false, time: '' },
];

const pv = { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0, transition: { duration: 0.4 } }, exit: { opacity: 0 } };

export default function AdminBookings() {
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filtered = bookings.filter(b => {
    const matchS = !search || b.id.includes(search) || b.customer.toLowerCase().includes(search.toLowerCase()) || b.service.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All' || b.status === statusFilter;
    return matchS && matchStatus;
  });

  const stats = { active: bookings.filter(b => b.status === 'Active').length, pending: bookings.filter(b => b.status === 'Pending').length, delayed: bookings.filter(b => b.status === 'Delayed').length };

  return (
    <motion.div variants={pv} initial="initial" animate="animate" exit="exit" style={{ background: '#F8F5FF', minHeight: '100vh' }}>
      <div style={{ display: 'flex', gap: 20, maxWidth: 1320, margin: '0 auto', padding: '24px 20px', alignItems: 'flex-start' }}>
        <AdminSidebar />
        <main style={{ flex: 1, minWidth: 0 }}>
          <h1 style={{ fontSize: 'clamp(1.3rem,3vw,1.8rem)', color: '#1A1A2E', fontFamily: 'var(--font-serif)', marginBottom: 16 }}>All Bookings</h1>

          {/* Stats bar */}
          <div style={{ background: 'white', borderRadius: 14, padding: '14px 20px', marginBottom: 16, display: 'flex', gap: 24, flexWrap: 'wrap', boxShadow: '0 2px 12px rgba(62,42,86,0.07)', border: '1px solid #F0EAF8' }}>
            {[['Active', stats.active, '#059669'], ['Pending', stats.pending, '#D97706'], ['Delayed', stats.delayed, '#EF4444'], ['Total', bookings.length, '#3E2A56']].map(([l, v, c]) => (
              <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
                <span style={{ fontSize: 13, color: '#9B8AB0' }}>{l}:</span>
                <span style={{ fontSize: 15, fontWeight: 800, color: c }}>{v}</span>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 14, flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 200, display: 'flex', alignItems: 'center', gap: 8, background: 'white', border: '1.5px solid #EDE6F8', borderRadius: 10, padding: '8px 14px' }}>
              <Search size={14} color="#6B4A8F" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search ID, customer, service..."
                style={{ border: 'none', outline: 'none', fontSize: 13, width: '100%', fontFamily: 'var(--font-sans)', color: '#1A1A2E' }} />
            </div>
            {['All', 'Active', 'Pending', 'Completed', 'Delayed', 'Cancelled'].map(s => (
              <button key={s} onClick={() => setStatusFilter(s)} style={{ padding: '8px 14px', borderRadius: 50, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-sans)', background: statusFilter === s ? 'linear-gradient(135deg,#3E2A56,#6B4A8F)' : 'white', color: statusFilter === s ? 'white' : '#9B8AB0', border: statusFilter === s ? 'none' : '1.5px solid #EDE6F8' }}>{s}</button>
            ))}
          </div>

          {/* Table */}
          <div style={{ background: 'white', borderRadius: 16, boxShadow: '0 2px 12px rgba(62,42,86,0.07)', border: '1px solid #F0EAF8', overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr style={{ background: '#F8F5FF' }}>
                    {['Booking ID', 'Service', 'Customer', 'Pro', 'City', 'Date', 'Amount', 'Status', ''].map(h => (
                      <th key={h} style={{ padding: '11px 14px', textAlign: 'left', color: '#3E2A56', fontWeight: 700, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((b, i) => {
                    const [sc, sb] = statusColors[b.status] || ['#6B7280', '#F3F4F6'];
                    return (
                      <tr key={i} style={{ borderBottom: '1px solid #F8F5FF', background: b.flag ? '#FFF7ED' : 'white', borderLeft: b.flag ? '3px solid #F59E0B' : '3px solid transparent', cursor: 'pointer' }}
                        onMouseEnter={e => e.currentTarget.style.background = b.flag ? '#FEF3C7' : '#FAFAFA'}
                        onMouseLeave={e => e.currentTarget.style.background = b.flag ? '#FFF7ED' : 'white'}>
                        <td style={{ padding: '11px 14px', color: '#6B4A8F', fontWeight: 600 }}>{b.id}{b.flag && <span style={{ marginLeft: 6, fontSize: 14 }}>⚠️</span>}</td>
                        <td style={{ padding: '11px 14px', color: '#1A1A2E' }}>{b.service}</td>
                        <td style={{ padding: '11px 14px', color: '#4A4A6A' }}>{b.customer}</td>
                        <td style={{ padding: '11px 14px', color: b.pro === 'Pending' ? '#D97706' : '#4A4A6A', fontWeight: b.pro === 'Pending' ? 600 : 400 }}>{b.pro}</td>
                        <td style={{ padding: '11px 14px', color: '#9B8AB0' }}>{b.city}</td>
                        <td style={{ padding: '11px 14px', color: '#9B8AB0', whiteSpace: 'nowrap' }}>{b.date}</td>
                        <td style={{ padding: '11px 14px', fontWeight: 700, color: '#1A1A2E' }}>{b.amount}</td>
                        <td style={{ padding: '11px 14px' }}><span style={{ background: sb, color: sc, borderRadius: 50, padding: '3px 10px', fontSize: 11, fontWeight: 700 }}>{b.status}</span></td>
                        <td style={{ padding: '11px 14px' }}><button onClick={() => setSelected(b)} style={{ color: '#6B4A8F', fontSize: 12, fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>View →</button></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* Detail Drawer */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelected(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 900 }} />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 26 }}
              style={{ position: 'fixed', right: 0, top: 0, bottom: 0, width: 400, background: 'white', zIndex: 901, overflowY: 'auto', boxShadow: '-8px 0 32px rgba(0,0,0,0.15)' }}>
              <div style={{ padding: '20px 24px', borderBottom: '1px solid #F0EAF8', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 700, color: '#1A1A2E', fontSize: 15 }}>{selected.id}</span>
                <button onClick={() => setSelected(null)} style={{ background: '#F0EAF8', border: 'none', borderRadius: 8, padding: '6px', cursor: 'pointer' }}><X size={16} color="#6B4A8F" /></button>
              </div>
              <div style={{ padding: '20px 24px' }}>
                <div style={{ background: 'linear-gradient(135deg,#3E2A56,#6B4A8F)', borderRadius: 14, padding: '16px 18px', marginBottom: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12 }}>Service</span>
                    <span style={{ color: 'white', fontWeight: 700, fontSize: 14 }}>{selected.service}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12 }}>Amount</span>
                    <span style={{ color: 'white', fontWeight: 800, fontSize: 18 }}>{selected.amount}</span>
                  </div>
                </div>

                {/* Timeline */}
                <div style={{ marginBottom: 18 }}>
                  <div style={{ fontWeight: 700, color: '#1A1A2E', fontSize: 14, marginBottom: 12 }}>Booking Timeline</div>
                  <div style={{ position: 'relative', paddingLeft: 24 }}>
                    <div style={{ position: 'absolute', left: 7, top: 6, bottom: 6, width: 2, background: '#EDE6F8' }} />
                    {timeline.map((t, i) => (
                      <div key={i} style={{ position: 'relative', marginBottom: 14, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ position: 'absolute', left: -20, width: 16, height: 16, borderRadius: '50%', background: t.done ? 'linear-gradient(135deg,#3E2A56,#6B4A8F)' : '#EDE6F8', border: '2px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
                          {t.done && <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'white' }} />}
                        </div>
                        <span style={{ fontSize: 13, color: t.done ? '#1A1A2E' : '#9B8AB0', fontWeight: t.done ? 600 : 400 }}>{t.label}</span>
                        <span style={{ fontSize: 12, color: '#9B8AB0' }}>{t.time}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reassign */}
                <div style={{ marginBottom: 14 }}>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#4A4A6A', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Reassign Pro</label>
                  <select style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #EDE6F8', borderRadius: 10, fontSize: 13, fontFamily: 'var(--font-sans)', color: '#1A1A2E', background: 'white', outline: 'none' }}>
                    <option>Select a pro...</option>
                    {['Ravi Kumar (4.9★)', 'Anand M. (4.8★)', 'Suresh P. (4.8★)'].map(p => <option key={p}>{p}</option>)}
                  </select>
                </div>

                <button style={{ width: '100%', background: '#FEF3C7', color: '#D97706', borderRadius: 50, padding: '12px', fontWeight: 700, fontSize: 14, border: '1.5px solid #F59E0B', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                  ⚠️ Flag for Review
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
