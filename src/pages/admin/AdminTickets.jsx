import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Send, ChevronDown } from 'lucide-react';
import AdminSidebar from '../../components/AdminSidebar';

const tickets = [
  { id: 'TK-8821', subject: 'Pro never showed up, want refund', user: 'Arjun K.', priority: 'High', status: 'Open', time: '2 hr ago', booking: 'FX-29541' },
  { id: 'TK-8819', subject: 'App crashed during booking', user: 'Priya S.', priority: 'Medium', status: 'In Progress', time: '4 hr ago', booking: null },
  { id: 'TK-8815', subject: 'Wrong amount charged to wallet', user: 'Rohit V.', priority: 'High', status: 'Open', time: '6 hr ago', booking: 'FX-29522' },
  { id: 'TK-8810', subject: 'How do I reschedule?', user: 'Sneha R.', priority: 'Low', status: 'Resolved', time: '1 day ago', booking: null },
  { id: 'TK-8808', subject: 'Pro was rude and unprofessional', user: 'Vikram N.', priority: 'High', status: 'In Progress', time: '1 day ago', booking: 'FX-29490' },
  { id: 'TK-8802', subject: 'Referral credits not credited', user: 'Meera I.', priority: 'Medium', status: 'Open', time: '2 days ago', booking: null },
];

const messages = [
  { role: 'user', text: 'The pro never showed up for my AC repair booking. I waited 2 hours and no one came. I want a full refund immediately.', time: '10:32 AM' },
  { role: 'agent', text: 'Hi Arjun, I sincerely apologize for this experience. I can see your booking FX-29541 was scheduled for 4:00 PM. Let me look into this right away and arrange a full refund for you.', time: '10:45 AM' },
  { role: 'user', text: 'It has been 30 minutes and I still haven\'t heard back. This is unacceptable.', time: '11:15 AM' },
];

const priorityColors = { High: ['#EF4444', '#FEE2E2'], Medium: ['#D97706', '#FEF3C7'], Low: ['#6B7280', '#F3F4F6'] };
const statusColors = { Open: ['#3E2A56', '#EDE6F8'], 'In Progress': ['#3B82F6', '#EFF6FF'], Resolved: ['#059669', '#D1FAE5'] };

const pv = { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0, transition: { duration: 0.4 } }, exit: { opacity: 0 } };

export default function AdminTickets() {
  const [selected, setSelected] = useState(tickets[0]);
  const [reply, setReply] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = tickets.filter(t => {
    const matchS = statusFilter === 'All' || t.status === statusFilter;
    const matchQ = !search || t.subject.toLowerCase().includes(search.toLowerCase()) || t.user.toLowerCase().includes(search.toLowerCase()) || t.id.includes(search);
    return matchS && matchQ;
  });

  return (
    <motion.div variants={pv} initial="initial" animate="animate" exit="exit" style={{ background: '#F8F5FF', minHeight: '100vh' }}>
      <div style={{ display: 'flex', gap: 20, maxWidth: 1320, margin: '0 auto', padding: '24px 20px', alignItems: 'flex-start' }}>
        <AdminSidebar />
        <main style={{ flex: 1, minWidth: 0 }}>
          <h1 style={{ fontSize: 'clamp(1.3rem,3vw,1.8rem)', color: '#1A1A2E', fontFamily: 'var(--font-serif)', marginBottom: 16 }}>Support Tickets</h1>

          {/* Stats */}
          <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
            {[
              ['Open', tickets.filter(t=>t.status==='Open').length, '#3E2A56', '#EDE6F8'],
              ['High Priority', tickets.filter(t=>t.priority==='High').length, '#EF4444', '#FEE2E2'],
              ['Avg Resolution', '3.2 hrs', '#059669', '#D1FAE5'],
            ].map(([l,v,c,bg]) => (
              <div key={l} style={{ background: 'white', borderRadius: 12, padding: '12px 18px', display: 'flex', alignItems: 'center', gap: 10, boxShadow: '0 2px 10px rgba(62,42,86,0.07)', border: '1px solid #F0EAF8' }}>
                <span style={{ fontSize: 11, color: '#9B8AB0', fontWeight: 600, textTransform: 'uppercase' }}>{l}</span>
                <span style={{ fontSize: 18, fontWeight: 800, color: c }}>{v}</span>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 16 }} className="admin-two-col">
            {/* Ticket list */}
            <div style={{ background: 'white', borderRadius: 16, boxShadow: '0 2px 12px rgba(62,42,86,0.07)', border: '1px solid #F0EAF8', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              {/* Search + filter */}
              <div style={{ padding: '14px 16px', borderBottom: '1px solid #F0EAF8', display: 'flex', gap: 8 }}>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 7, background: '#F8F5FF', borderRadius: 8, padding: '7px 12px' }}>
                  <Search size={13} color="#6B4A8F" />
                  <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search tickets..."
                    style={{ border: 'none', outline: 'none', fontSize: 12, width: '100%', fontFamily: 'var(--font-sans)', color: '#1A1A2E', background: 'transparent' }} />
                </div>
                <div style={{ position: 'relative' }}>
                  <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
                    style={{ appearance: 'none', padding: '7px 28px 7px 10px', border: '1.5px solid #EDE6F8', borderRadius: 8, fontSize: 12, fontFamily: 'var(--font-sans)', color: '#1A1A2E', background: 'white', outline: 'none', cursor: 'pointer' }}>
                    {['All','Open','In Progress','Resolved'].map(s => <option key={s}>{s}</option>)}
                  </select>
                  <ChevronDown size={12} style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', color: '#6B4A8F', pointerEvents: 'none' }} />
                </div>
              </div>

              {/* List */}
              <div style={{ flex: 1, overflowY: 'auto' }}>
                {filtered.map((t, i) => {
                  const [pc, pb] = priorityColors[t.priority];
                  const [sc, sb] = statusColors[t.status];
                  const isActive = selected?.id === t.id;
                  return (
                    <div key={t.id} onClick={() => setSelected(t)}
                      style={{ padding: '13px 16px', borderBottom: '1px solid #F8F5FF', cursor: 'pointer', background: isActive ? '#F8F5FF' : 'white', borderLeft: isActive ? '3px solid #3E2A56' : '3px solid transparent', transition: 'all 0.15s' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                        <span style={{ fontWeight: isActive ? 700 : 600, color: '#1A1A2E', fontSize: 13 }}>{t.subject.length > 38 ? t.subject.slice(0,38)+'…' : t.subject}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                        <span style={{ fontSize: 11, color: '#9B8AB0' }}>{t.id} · {t.user}</span>
                        <span style={{ background: pb, color: pc, borderRadius: 50, padding: '1px 7px', fontSize: 10, fontWeight: 700 }}>{t.priority}</span>
                        <span style={{ background: sb, color: sc, borderRadius: 50, padding: '1px 7px', fontSize: 10, fontWeight: 700 }}>{t.status}</span>
                        <span style={{ fontSize: 11, color: '#C4AFDE', marginLeft: 'auto' }}>{t.time}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Thread view */}
            {selected && (
              <div style={{ background: 'white', borderRadius: 16, boxShadow: '0 2px 12px rgba(62,42,86,0.07)', border: '1px solid #F0EAF8', display: 'flex', flexDirection: 'column', maxHeight: 560 }}>
                {/* Header */}
                <div style={{ padding: '14px 18px', borderBottom: '1px solid #F0EAF8', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontWeight: 700, color: '#1A1A2E', fontSize: 14, marginBottom: 4 }}>{selected.subject}</div>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      <span style={{ fontSize: 12, color: '#9B8AB0' }}>{selected.id} · {selected.user}</span>
                      {selected.booking && <span style={{ background: '#EDE6F8', color: '#6B4A8F', borderRadius: 50, padding: '1px 8px', fontSize: 11, fontWeight: 600 }}>📋 {selected.booking}</span>}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <select defaultValue={selected.status} style={{ padding: '5px 10px', border: '1.5px solid #EDE6F8', borderRadius: 8, fontSize: 12, fontFamily: 'var(--font-sans)', color: '#1A1A2E', background: 'white', outline: 'none', cursor: 'pointer' }}>
                      {['Open','In Progress','Resolved'].map(s => <option key={s}>{s}</option>)}
                    </select>
                    <div style={{ position: 'relative' }}>
                      <select defaultValue="Assign agent" style={{ padding: '5px 10px', border: '1.5px solid #EDE6F8', borderRadius: 8, fontSize: 12, fontFamily: 'var(--font-sans)', color: '#1A1A2E', background: 'white', outline: 'none', cursor: 'pointer' }}>
                        <option>Assign agent</option>
                        {['Rahul D.','Sneha T.','Pooja M.'].map(a => <option key={a}>{a}</option>)}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '14px 18px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {messages.map((m, i) => (
                    <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: m.role === 'agent' ? 'flex-end' : 'flex-start' }}>
                      <div style={{
                        maxWidth: '80%', padding: '10px 14px', borderRadius: m.role === 'agent' ? '14px 14px 4px 14px' : '14px 14px 14px 4px', fontSize: 13, lineHeight: 1.6,
                        background: m.role === 'agent' ? 'linear-gradient(135deg,#3E2A56,#6B4A8F)' : '#F8F5FF',
                        color: m.role === 'agent' ? 'white' : '#1A1A2E',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
                      }}>
                        {m.text}
                      </div>
                      <span style={{ fontSize: 11, color: '#C4AFDE', marginTop: 3, paddingLeft: 4 }}>{m.role === 'agent' ? 'Agent · ' : selected.user + ' · '}{m.time}</span>
                    </div>
                  ))}
                </div>

                {/* Reply box */}
                <div style={{ padding: '12px 16px', borderTop: '1px solid #F0EAF8', display: 'flex', gap: 10 }}>
                  <input value={reply} onChange={e => setReply(e.target.value)}
                    placeholder="Type your reply..."
                    style={{ flex: 1, padding: '10px 14px', border: '1.5px solid #EDE6F8', borderRadius: 10, fontSize: 13, outline: 'none', fontFamily: 'var(--font-sans)', color: '#1A1A2E' }}
                    onFocus={e => e.target.style.borderColor = '#3E2A56'}
                    onBlur={e => e.target.style.borderColor = '#EDE6F8'}
                    onKeyDown={e => { if (e.key === 'Enter' && reply.trim()) setReply(''); }} />
                  <button onClick={() => setReply('')}
                    style={{ background: 'linear-gradient(135deg,#3E2A56,#6B4A8F)', color: 'white', borderRadius: 10, padding: '10px 16px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontWeight: 600, fontSize: 13, fontFamily: 'var(--font-sans)', flexShrink: 0 }}>
                    <Send size={14} /> Send
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </motion.div>
  );
}
