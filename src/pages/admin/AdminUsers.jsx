import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, Download, Eye, Edit2, Lock, X, ChevronUp, ChevronDown } from 'lucide-react';
import AdminSidebar from '../../components/AdminSidebar';

const users = [
  { id: 'U-10291', name: 'Arjun Kumar', email: 'arjun.k@gmail.com', phone: '+91 98765 43210', city: 'Hyderabad', bookings: 12, spent: '₹8,240', joined: 'Jan 15, 2024', status: 'Active' },
  { id: 'U-10284', name: 'Priya Sharma', email: 'priya.s@gmail.com', phone: '+91 91234 56789', city: 'Bangalore', bookings: 7, spent: '₹5,120', joined: 'Feb 3, 2024', status: 'Active' },
  { id: 'U-10277', name: 'Rohit Verma', email: 'rohit.v@gmail.com', phone: '+91 87654 32109', city: 'Mumbai', bookings: 3, spent: '₹1,899', joined: 'Mar 20, 2024', status: 'Active' },
  { id: 'U-10265', name: 'Sneha Pillai', email: 'sneha.p@gmail.com', phone: '+91 76543 21098', city: 'Delhi', bookings: 1, spent: '₹599', joined: 'Apr 1, 2025', status: 'Blocked' },
  { id: 'U-10258', name: 'Vikram Nair', email: 'vikram.n@gmail.com', phone: '+91 65432 10987', city: 'Chennai', bookings: 18, spent: '₹14,680', joined: 'Dec 8, 2023', status: 'Active' },
  { id: 'U-10244', name: 'Meera Iyer', email: 'meera.i@gmail.com', phone: '+91 54321 09876', city: 'Hyderabad', bookings: 9, spent: '₹6,745', joined: 'Nov 14, 2023', status: 'Active' },
  { id: 'U-10231', name: 'Karan Mehta', email: 'karan.m@gmail.com', phone: '+91 43210 98765', city: 'Pune', bookings: 2, spent: '₹1,198', joined: 'Jun 22, 2025', status: 'Active' },
];

const pv = { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0, transition: { duration: 0.4 } }, exit: { opacity: 0 } };

export default function AdminUsers() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedUser, setSelectedUser] = useState(null);
  const [sortKey, setSortKey] = useState('joined');
  const [sortDir, setSortDir] = useState('desc');

  const filtered = users
    .filter(u => {
      const matchS = !search || u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()) || u.id.includes(search);
      const matchStatus = statusFilter === 'All' || u.status === statusFilter;
      return matchS && matchStatus;
    })
    .sort((a, b) => {
      if (sortKey === 'bookings') return sortDir === 'asc' ? a.bookings - b.bookings : b.bookings - a.bookings;
      return 0;
    });

  const handleSort = (key) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('desc'); }
  };

  const SortIcon = ({ k }) => sortKey === k
    ? (sortDir === 'asc' ? <ChevronUp size={12} /> : <ChevronDown size={12} />)
    : <ChevronDown size={12} style={{ opacity: 0.3 }} />;

  return (
    <motion.div variants={pv} initial="initial" animate="animate" exit="exit" style={{ background: '#F8F5FF', minHeight: '100vh' }}>
      <div style={{ display: 'flex', gap: 20, maxWidth: 1320, margin: '0 auto', padding: '24px 20px', alignItems: 'flex-start' }}>
        <AdminSidebar />
        <main style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
            <h1 style={{ fontSize: 'clamp(1.3rem,3vw,1.8rem)', color: '#1A1A2E', fontFamily: 'var(--font-serif)' }}>Customer Accounts</h1>
            <button style={{ display: 'flex', alignItems: 'center', gap: 6, border: '1.5px solid #3E2A56', color: '#3E2A56', borderRadius: 10, padding: '8px 16px', fontSize: 13, fontWeight: 600, background: 'white', cursor: 'pointer' }}>
              <Download size={14} /> Export CSV
            </button>
          </div>

          {/* Filters */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 200, display: 'flex', alignItems: 'center', gap: 8, background: 'white', border: '1.5px solid #EDE6F8', borderRadius: 10, padding: '9px 14px' }}>
              <Search size={15} color="#6B4A8F" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, email or ID..."
                style={{ border: 'none', outline: 'none', fontSize: 13, width: '100%', fontFamily: 'var(--font-sans)', color: '#1A1A2E' }} />
            </div>
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
              style={{ padding: '9px 14px', border: '1.5px solid #EDE6F8', borderRadius: 10, fontSize: 13, background: 'white', color: '#1A1A2E', fontFamily: 'var(--font-sans)', outline: 'none', cursor: 'pointer' }}>
              {['All', 'Active', 'Blocked'].map(s => <option key={s}>{s}</option>)}
            </select>
          </div>

          {/* Table */}
          <div style={{ background: 'white', borderRadius: 16, boxShadow: '0 2px 12px rgba(62,42,86,0.07)', border: '1px solid #F0EAF8', overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr style={{ background: '#F8F5FF' }}>
                    {[['User', null],['Email', null],['City', null],['Bookings','bookings'],['Spent', null],['Joined', null],['Status', null],['Actions', null]].map(([h, k]) => (
                      <th key={h} onClick={() => k && handleSort(k)} style={{ padding: '11px 14px', textAlign: 'left', color: '#3E2A56', fontWeight: 700, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.04em', whiteSpace: 'nowrap', cursor: k ? 'pointer' : 'default', userSelect: 'none' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>{h}{k && <SortIcon k={k} />}</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((u, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #F8F5FF' }}
                      onMouseEnter={e => e.currentTarget.style.background = '#FAFAFA'}
                      onMouseLeave={e => e.currentTarget.style.background = 'white'}>
                      <td style={{ padding: '11px 14px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                          <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg,#3E2A56,#6B4A8F)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 13, fontWeight: 700, flexShrink: 0 }}>{u.name[0]}</div>
                          <div>
                            <div style={{ fontWeight: 600, color: '#1A1A2E' }}>{u.name}</div>
                            <div style={{ fontSize: 11, color: '#9B8AB0' }}>{u.id}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '11px 14px', color: '#4A4A6A' }}>{u.email}</td>
                      <td style={{ padding: '11px 14px', color: '#9B8AB0' }}>{u.city}</td>
                      <td style={{ padding: '11px 14px', color: '#1A1A2E', fontWeight: 600 }}>{u.bookings}</td>
                      <td style={{ padding: '11px 14px', color: '#3E2A56', fontWeight: 700 }}>{u.spent}</td>
                      <td style={{ padding: '11px 14px', color: '#9B8AB0' }}>{u.joined}</td>
                      <td style={{ padding: '11px 14px' }}>
                        <span style={{ background: u.status === 'Active' ? '#D1FAE5' : '#FEE2E2', color: u.status === 'Active' ? '#059669' : '#DC2626', borderRadius: 50, padding: '3px 10px', fontSize: 11, fontWeight: 700 }}>{u.status}</span>
                      </td>
                      <td style={{ padding: '11px 14px' }}>
                        <div style={{ display: 'flex', gap: 8 }}>
                          <button onClick={() => setSelectedUser(u)} title="View" style={{ background: '#EDE6F8', border: 'none', borderRadius: 6, padding: '5px', cursor: 'pointer', color: '#6B4A8F' }}><Eye size={14} /></button>
                          <button title="Edit" style={{ background: '#F0F9FF', border: 'none', borderRadius: 6, padding: '5px', cursor: 'pointer', color: '#3B82F6' }}><Edit2 size={14} /></button>
                          <button title={u.status === 'Active' ? 'Block' : 'Unblock'} style={{ background: u.status === 'Active' ? '#FEE2E2' : '#D1FAE5', border: 'none', borderRadius: 6, padding: '5px', cursor: 'pointer', color: u.status === 'Active' ? '#DC2626' : '#059669' }}><Lock size={14} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderTop: '1px solid #F0EAF8', flexWrap: 'wrap', gap: 8 }}>
              <span style={{ fontSize: 12, color: '#9B8AB0' }}>Showing {filtered.length} of {users.length} users</span>
              <div style={{ display: 'flex', gap: 4 }}>
                {[1, 2, 3, '...', 12].map((p, i) => (
                  <button key={i} style={{ width: 30, height: 30, borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: p === 1 ? 700 : 400, background: p === 1 ? 'linear-gradient(135deg,#3E2A56,#6B4A8F)' : 'white', color: p === 1 ? 'white' : '#4A4A6A', fontFamily: 'var(--font-sans)' }}>{p}</button>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Side Drawer */}
      <AnimatePresence>
        {selectedUser && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedUser(null)}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 900 }} />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 26 }}
              style={{ position: 'fixed', right: 0, top: 0, bottom: 0, width: 380, background: 'white', zIndex: 901, overflowY: 'auto', boxShadow: '-8px 0 32px rgba(0,0,0,0.15)' }}>
              <div style={{ padding: '20px 24px', borderBottom: '1px solid #F0EAF8', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 700, color: '#1A1A2E', fontSize: 16 }}>User Profile</span>
                <button onClick={() => setSelectedUser(null)} style={{ background: '#F0EAF8', border: 'none', borderRadius: 8, padding: '6px', cursor: 'pointer' }}><X size={16} color="#6B4A8F" /></button>
              </div>
              <div style={{ padding: '20px 24px' }}>
                <div style={{ textAlign: 'center', marginBottom: 20 }}>
                  <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'linear-gradient(135deg,#3E2A56,#6B4A8F)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 26, fontWeight: 700, margin: '0 auto 10px' }}>{selectedUser.name[0]}</div>
                  <div style={{ fontWeight: 700, color: '#1A1A2E', fontSize: 18 }}>{selectedUser.name}</div>
                  <div style={{ color: '#9B8AB0', fontSize: 13 }}>{selectedUser.id}</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
                  {[['Email', selectedUser.email], ['Phone', selectedUser.phone], ['City', selectedUser.city], ['Joined', selectedUser.joined]].map(([k, v]) => (
                    <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: '#F8F5FF', borderRadius: 10 }}>
                      <span style={{ color: '#9B8AB0', fontSize: 13 }}>{k}</span>
                      <span style={{ color: '#1A1A2E', fontWeight: 600, fontSize: 13 }}>{v}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
                  {[['Total Bookings', selectedUser.bookings, '#3E2A56'], ['Total Spent', selectedUser.spent, '#059669']].map(([l, v, c]) => (
                    <div key={l} style={{ background: 'white', border: '1px solid #EDE6F8', borderRadius: 12, padding: '14px', textAlign: 'center' }}>
                      <div style={{ fontSize: 11, color: '#9B8AB0', marginBottom: 4 }}>{l}</div>
                      <div style={{ fontSize: 20, fontWeight: 800, color: c }}>{v}</div>
                    </div>
                  ))}
                </div>
                <button style={{ width: '100%', background: 'linear-gradient(135deg,#EF4444,#DC2626)', color: 'white', borderRadius: 50, padding: '12px', fontWeight: 700, fontSize: 14, border: 'none', cursor: 'pointer', fontFamily: 'var(--font-sans)' }}>
                  {selectedUser.status === 'Active' ? 'Block Account' : 'Unblock Account'}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
