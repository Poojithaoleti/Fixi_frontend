import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Download, Lock, ChevronDown } from 'lucide-react';
import AdminSidebar from '../../components/AdminSidebar';

const logs = [
  { ts: '2026-03-30 14:32:41', admin: 'rahul.d@fixi.in', action: 'Approval', type: 'Approval', entity: 'Pro P-4818 (Anita Menon)', details: 'Pro application approved after document review', ip: '103.21.58.12' },
  { ts: '2026-03-30 13:18:22', admin: 'sneha.t@fixi.in', action: 'Block', type: 'Edit', entity: 'User U-10265 (Sneha Pillai)', details: 'Account blocked — duplicate account detected', ip: '49.206.11.88' },
  { ts: '2026-03-30 12:05:09', admin: 'pooja.m@fixi.in', action: 'Delete', type: 'Delete', entity: 'Review R-1019', details: 'Spam review removed from platform', ip: '122.161.42.7' },
  { ts: '2026-03-30 11:44:55', admin: 'rahul.d@fixi.in', action: 'Edit', type: 'Edit', entity: 'Service: AC Repair — Hyderabad', details: 'Standard price updated from ₹649 to ₹699', ip: '103.21.58.12' },
  { ts: '2026-03-30 10:30:17', admin: 'admin@fixi.in', action: 'Login', type: 'Login', entity: '—', details: 'Super admin login from new device', ip: '49.36.74.195' },
  { ts: '2026-03-29 18:21:33', admin: 'sneha.t@fixi.in', action: 'Approval', type: 'Approval', entity: 'Pro P-4810 (Rajesh Patel)', details: 'Pro application rejected — incomplete docs', ip: '49.206.11.88' },
  { ts: '2026-03-29 16:55:08', admin: 'pooja.m@fixi.in', action: 'Edit', type: 'Edit', entity: 'Promo SUMMER30', details: 'Max redemptions increased from 200 to 500', ip: '122.161.42.7' },
  { ts: '2026-03-29 15:40:22', admin: 'rahul.d@fixi.in', action: 'Edit', type: 'Edit', entity: 'Zone: Hyderabad — Zone D', details: 'Zone D deactivated temporarily', ip: '103.21.58.12' },
  { ts: '2026-03-29 11:12:44', admin: 'admin@fixi.in', action: 'Delete', type: 'Delete', entity: 'Ticket TK-8790', details: 'Duplicate ticket closed and merged with TK-8788', ip: '49.36.74.195' },
  { ts: '2026-03-28 17:08:31', admin: 'sneha.t@fixi.in', action: 'Login', type: 'Login', entity: '—', details: 'Admin login — verified via 2FA', ip: '49.206.11.88' },
];

const actionColors = {
  Approval: ['#059669', '#D1FAE5'],
  Edit: ['#3B82F6', '#EFF6FF'],
  Delete: ['#EF4444', '#FEE2E2'],
  Login: ['#6B7280', '#F3F4F6'],
};

const pv = { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0, transition: { duration: 0.4 } }, exit: { opacity: 0 } };

export default function AdminAuditLogs() {
  const [search, setSearch] = useState('');
  const [actionFilter, setActionFilter] = useState('All');
  const [adminFilter, setAdminFilter] = useState('All');
  const [expanded, setExpanded] = useState(null);

  const admins = ['All', ...new Set(logs.map(l => l.admin))];

  const filtered = logs.filter(l => {
    const matchA = actionFilter === 'All' || l.type === actionFilter;
    const matchAdmin = adminFilter === 'All' || l.admin === adminFilter;
    const matchS = !search || l.entity.toLowerCase().includes(search.toLowerCase()) || l.admin.toLowerCase().includes(search.toLowerCase()) || l.details.toLowerCase().includes(search.toLowerCase());
    return matchA && matchAdmin && matchS;
  });

  return (
    <motion.div variants={pv} initial="initial" animate="animate" exit="exit" style={{ background: '#F8F5FF', minHeight: '100vh' }}>
      <div style={{ display: 'flex', gap: 20, maxWidth: 1320, margin: '0 auto', padding: '24px 20px', alignItems: 'flex-start' }}>
        <AdminSidebar />
        <main style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 12 }}>
            <div>
              <h1 style={{ fontSize: 'clamp(1.3rem,3vw,1.8rem)', color: '#1A1A2E', fontFamily: 'var(--font-serif)' }}>Audit Logs</h1>
              <p style={{ color: '#9B8AB0', fontSize: 13, marginTop: 3, display: 'flex', alignItems: 'center', gap: 6 }}>
                <Lock size={12} /> Immutable — all logs are read-only
              </p>
            </div>
            <button style={{ display: 'flex', alignItems: 'center', gap: 6, border: '1.5px solid #3E2A56', color: '#3E2A56', borderRadius: 10, padding: '8px 16px', fontSize: 13, fontWeight: 600, background: 'white', cursor: 'pointer' }}>
              <Download size={14} /> Export CSV
            </button>
          </div>

          {/* Filters */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 200, display: 'flex', alignItems: 'center', gap: 8, background: 'white', border: '1.5px solid #EDE6F8', borderRadius: 10, padding: '8px 14px' }}>
              <Search size={14} color="#6B4A8F" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search entity, admin, or action..."
                style={{ border: 'none', outline: 'none', fontSize: 13, width: '100%', fontFamily: 'var(--font-sans)', color: '#1A1A2E' }} />
            </div>
            <div style={{ position: 'relative' }}>
              <select value={actionFilter} onChange={e => setActionFilter(e.target.value)}
                style={{ appearance: 'none', padding: '8px 32px 8px 12px', border: '1.5px solid #EDE6F8', borderRadius: 10, fontSize: 13, background: 'white', color: '#1A1A2E', fontFamily: 'var(--font-sans)', outline: 'none', cursor: 'pointer' }}>
                {['All', 'Approval', 'Edit', 'Delete', 'Login'].map(a => <option key={a}>{a}</option>)}
              </select>
              <ChevronDown size={12} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', color: '#6B4A8F', pointerEvents: 'none' }} />
            </div>
            <div style={{ position: 'relative' }}>
              <select value={adminFilter} onChange={e => setAdminFilter(e.target.value)}
                style={{ appearance: 'none', padding: '8px 32px 8px 12px', border: '1.5px solid #EDE6F8', borderRadius: 10, fontSize: 13, background: 'white', color: '#1A1A2E', fontFamily: 'var(--font-sans)', outline: 'none', cursor: 'pointer', maxWidth: 180 }}>
                {admins.map(a => <option key={a}>{a}</option>)}
              </select>
              <ChevronDown size={12} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', color: '#6B4A8F', pointerEvents: 'none' }} />
            </div>
          </div>

          {/* Table */}
          <div style={{ background: 'white', borderRadius: 16, boxShadow: '0 2px 12px rgba(62,42,86,0.07)', border: '1px solid #F0EAF8', overflow: 'hidden' }}>
            {/* Immutable badge */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 18px', borderBottom: '1px solid #F0EAF8', background: '#F8F5FF' }}>
              <span style={{ fontSize: 12, color: '#9B8AB0' }}>Showing {filtered.length} of {logs.length} entries</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#EDE6F8', borderRadius: 50, padding: '4px 12px' }}>
                <Lock size={11} color="#6B4A8F" />
                <span style={{ fontSize: 11, fontWeight: 700, color: '#6B4A8F' }}>Immutable Logs</span>
              </div>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#EDE6F8' }}>
                    {['Timestamp', 'Admin User', 'Action', 'Entity Affected', 'Details', 'IP Address'].map(h => (
                      <th key={h} style={{ padding: '10px 14px', textAlign: 'left', color: '#3E2A56', fontWeight: 700, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((log, i) => {
                    const [ac, ab] = actionColors[log.type] || ['#6B7280', '#F3F4F6'];
                    const isExpanded = expanded === i;
                    return (
                      <tr key={i} onClick={() => setExpanded(isExpanded ? null : i)}
                        style={{ borderBottom: '1px solid #F8F5FF', background: i % 2 === 0 ? 'white' : '#FAFAFA', cursor: 'pointer' }}
                        onMouseEnter={e => e.currentTarget.style.background = '#F8F5FF'}
                        onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? 'white' : '#FAFAFA'}>
                        <td style={{ padding: '10px 14px', fontFamily: 'monospace', fontSize: 12, color: '#6B6B8A', whiteSpace: 'nowrap' }}>{log.ts}</td>
                        <td style={{ padding: '10px 14px' }}>
                          <div style={{ fontWeight: 600, color: '#1A1A2E', fontSize: 13 }}>{log.admin.split('@')[0]}</div>
                          <div style={{ fontSize: 11, color: '#9B8AB0' }}>{log.admin}</div>
                        </td>
                        <td style={{ padding: '10px 14px' }}>
                          <span style={{ background: ab, color: ac, borderRadius: 50, padding: '3px 10px', fontSize: 11, fontWeight: 700 }}>{log.action}</span>
                        </td>
                        <td style={{ padding: '10px 14px', color: '#4A4A6A', fontSize: 13, maxWidth: 180 }}>
                          <span style={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: isExpanded ? 'normal' : 'nowrap' }}>{log.entity}</span>
                        </td>
                        <td style={{ padding: '10px 14px', color: '#6B6B8A', fontSize: 12, maxWidth: 240 }}>
                          <span style={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: isExpanded ? 'normal' : 'nowrap' }}>{log.details}</span>
                        </td>
                        <td style={{ padding: '10px 14px', fontFamily: 'monospace', fontSize: 12, color: '#9B8AB0' }}>{log.ip}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </motion.div>
  );
}
