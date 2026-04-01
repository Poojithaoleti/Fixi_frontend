import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, XCircle, Eye } from 'lucide-react';
import AdminSidebar from '../../components/AdminSidebar';

const tabs = ['Pending Verification', 'Verified', 'Rejected'];

const providers = {
  'Pending Verification': [
    { id: 'P-4821', name: 'Suresh Reddy', city: 'Hyderabad', category: ['AC Repair', 'Electrical'], submitted: 'Mar 28, 2026', docs: 3, totalDocs: 4, bgCheck: 'In Progress' },
    { id: 'P-4818', name: 'Anita Menon', city: 'Bangalore', category: ['Deep Cleaning'], submitted: 'Mar 27, 2026', docs: 4, totalDocs: 4, bgCheck: 'Cleared' },
    { id: 'P-4810', name: 'Rajesh Patel', city: 'Mumbai', category: ['Carpentry', 'Painting'], submitted: 'Mar 25, 2026', docs: 2, totalDocs: 4, bgCheck: 'Pending' },
    { id: 'P-4805', name: 'Divya Krishnan', city: 'Chennai', category: ['Pest Control'], submitted: 'Mar 24, 2026', docs: 4, totalDocs: 4, bgCheck: 'Cleared' },
    { id: 'P-4799', name: 'Kiran Sharma', city: 'Delhi', category: ['Plumbing'], submitted: 'Mar 23, 2026', docs: 3, totalDocs: 4, bgCheck: 'In Progress' },
  ],
  'Verified': [
    { id: 'P-4780', name: 'Ravi Kumar', city: 'Hyderabad', category: ['AC Repair'], submitted: 'Mar 10, 2026', docs: 4, totalDocs: 4, bgCheck: 'Cleared' },
    { id: 'P-4770', name: 'Anand M.', city: 'Bangalore', category: ['Electrical'], submitted: 'Mar 5, 2026', docs: 4, totalDocs: 4, bgCheck: 'Cleared' },
  ],
  'Rejected': [
    { id: 'P-4760', name: 'Mohan T.', city: 'Pune', category: ['Plumbing'], submitted: 'Feb 20, 2026', docs: 2, totalDocs: 4, bgCheck: 'Failed' },
  ],
};

const bgColors = { Cleared: '#D1FAE5', 'In Progress': '#FEF3C7', Pending: '#EDE6F8', Failed: '#FEE2E2' };
const bgText = { Cleared: '#059669', 'In Progress': '#D97706', Pending: '#6B4A8F', Failed: '#DC2626' };

const pv = { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0, transition: { duration: 0.4 } }, exit: { opacity: 0 } };

export default function AdminProviders() {
  const [tab, setTab] = useState('Pending Verification');
  const [selected, setSelected] = useState(null);
  const [reason, setReason] = useState('');

  const list = providers[tab] || [];

  return (
    <motion.div variants={pv} initial="initial" animate="animate" exit="exit" style={{ background: '#F8F5FF', minHeight: '100vh' }}>
      <div style={{ display: 'flex', gap: 20, maxWidth: 1320, margin: '0 auto', padding: '24px 20px', alignItems: 'flex-start' }}>
        <AdminSidebar />
        <main style={{ flex: 1, minWidth: 0 }}>
          <h1 style={{ fontSize: 'clamp(1.3rem,3vw,1.8rem)', color: '#1A1A2E', fontFamily: 'var(--font-serif)', marginBottom: 20 }}>Provider Management</h1>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: 6, marginBottom: 20, flexWrap: 'wrap' }}>
            {tabs.map(t => (
              <button key={t} onClick={() => setTab(t)} style={{ padding: '9px 18px', borderRadius: 50, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-sans)', transition: 'all 0.2s', background: tab === t ? 'linear-gradient(135deg,#3E2A56,#6B4A8F)' : 'white', color: tab === t ? 'white' : '#9B8AB0', border: tab === t ? 'none' : '1.5px solid #EDE6F8' }}>
                {t} {tab === t && <span style={{ background: 'rgba(255,255,255,0.25)', borderRadius: 50, padding: '1px 7px', marginLeft: 4, fontSize: 11 }}>{list.length}</span>}
              </button>
            ))}
          </div>

          {/* Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {list.map((p, i) => (
              <motion.div key={p.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                style={{ background: 'white', borderRadius: 16, padding: '18px 22px', boxShadow: '0 2px 12px rgba(62,42,86,0.07)', border: '1px solid #F0EAF8' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                  {/* Avatar */}
                  <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'linear-gradient(135deg,#3E2A56,#6B4A8F)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 20, fontWeight: 700, flexShrink: 0, border: '3px solid #EDE6F8' }}>{p.name[0]}</div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 150 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 4 }}>
                      <span style={{ fontWeight: 700, color: '#1A1A2E', fontSize: 15 }}>{p.name}</span>
                      <span style={{ color: '#9B8AB0', fontSize: 12 }}>{p.id} · {p.city}</span>
                    </div>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 8 }}>
                      {p.category.map(c => <span key={c} style={{ background: '#EDE6F8', color: '#6B4A8F', borderRadius: 50, padding: '2px 10px', fontSize: 11, fontWeight: 600 }}>{c}</span>)}
                    </div>
                    {/* Docs progress */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ fontSize: 12, color: '#9B8AB0' }}>{p.docs}/{p.totalDocs} docs</span>
                      <div style={{ flex: 1, height: 6, background: '#F0EAF8', borderRadius: 4, maxWidth: 120 }}>
                        <div style={{ width: `${(p.docs / p.totalDocs) * 100}%`, height: '100%', background: p.docs === p.totalDocs ? 'linear-gradient(90deg,#059669,#10B981)' : 'linear-gradient(90deg,#3E2A56,#6B4A8F)', borderRadius: 4, transition: 'width 0.5s' }} />
                      </div>
                      <span style={{ background: bgColors[p.bgCheck], color: bgText[p.bgCheck], borderRadius: 50, padding: '2px 9px', fontSize: 11, fontWeight: 600 }}>
                        BG: {p.bgCheck}
                      </span>
                    </div>
                  </div>

                  {/* Submitted date + actions */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8, flexShrink: 0 }}>
                    <span style={{ fontSize: 12, color: '#9B8AB0' }}>Submitted {p.submitted}</span>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button onClick={() => setSelected(p)} style={{ display: 'flex', alignItems: 'center', gap: 5, border: '1.5px solid #3E2A56', color: '#3E2A56', borderRadius: 50, padding: '7px 14px', fontSize: 12, fontWeight: 600, background: 'white', cursor: 'pointer', fontFamily: 'var(--font-sans)' }}>
                        <Eye size={13} /> Review
                      </button>
                      {tab === 'Pending Verification' && (
                        <>
                          <button style={{ background: 'linear-gradient(135deg,#059669,#10B981)', color: 'white', borderRadius: 50, padding: '7px 14px', fontSize: 12, fontWeight: 700, border: 'none', cursor: 'pointer' }}>Approve</button>
                          <button style={{ border: '1.5px solid #EF4444', color: '#EF4444', borderRadius: 50, padding: '7px 14px', fontSize: 12, fontWeight: 600, background: 'white', cursor: 'pointer' }}>Reject</button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </main>
      </div>

      {/* Review Drawer */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelected(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 900 }} />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 26 }}
              style={{ position: 'fixed', right: 0, top: 0, bottom: 0, width: 420, background: 'white', zIndex: 901, overflowY: 'auto', boxShadow: '-8px 0 32px rgba(0,0,0,0.15)' }}>
              <div style={{ padding: '20px 24px', borderBottom: '1px solid #F0EAF8', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 700, color: '#1A1A2E', fontSize: 16 }}>Review: {selected.name}</span>
                <button onClick={() => setSelected(null)} style={{ background: '#F0EAF8', border: 'none', borderRadius: 8, padding: '6px', cursor: 'pointer' }}><X size={16} color="#6B4A8F" /></button>
              </div>
              <div style={{ padding: '20px 24px' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#9B8AB0', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12 }}>Documents</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
                  {['Aadhaar Card', 'Skill Certificate', 'Selfie', 'Bank Details'].map((doc, i) => (
                    <div key={doc} style={{ background: i < selected.docs ? '#F0FDF4' : '#F8F5FF', border: `1px solid ${i < selected.docs ? '#BBF7D0' : '#EDE6F8'}`, borderRadius: 10, padding: '12px', display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 20 }}>{i < selected.docs ? '✅' : '⬜'}</span>
                      <span style={{ fontSize: 12, fontWeight: 600, color: i < selected.docs ? '#059669' : '#9B8AB0' }}>{doc}</span>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 14px', background: '#F8F5FF', borderRadius: 10, marginBottom: 20 }}>
                  <span style={{ color: '#9B8AB0', fontSize: 13 }}>Background Check</span>
                  <span style={{ background: bgColors[selected.bgCheck], color: bgText[selected.bgCheck], borderRadius: 50, padding: '2px 10px', fontSize: 12, fontWeight: 700 }}>{selected.bgCheck}</span>
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#4A4A6A', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Rejection Reason (if rejecting)</label>
                  <select value={reason} onChange={e => setReason(e.target.value)} style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #EDE6F8', borderRadius: 10, fontSize: 13, fontFamily: 'var(--font-sans)', color: '#1A1A2E', background: 'white', outline: 'none' }}>
                    <option value="">Select reason...</option>
                    {['Incomplete documents', 'Failed background check', 'Unqualified for service category', 'Duplicate account', 'Other'].map(r => <option key={r}>{r}</option>)}
                  </select>
                </div>

                <div style={{ display: 'flex', gap: 10 }}>
                  <button style={{ flex: 2, background: 'linear-gradient(135deg,#059669,#10B981)', color: 'white', borderRadius: 50, padding: '13px', fontWeight: 700, fontSize: 14, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, fontFamily: 'var(--font-sans)' }}>
                    <CheckCircle size={15} /> Approve Pro
                  </button>
                  <button style={{ flex: 1, border: '1.5px solid #EF4444', color: '#EF4444', borderRadius: 50, padding: '13px', fontWeight: 600, fontSize: 14, background: 'white', cursor: 'pointer', fontFamily: 'var(--font-sans)' }}>
                    Reject
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
