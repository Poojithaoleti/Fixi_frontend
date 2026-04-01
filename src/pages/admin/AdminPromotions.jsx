import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X } from 'lucide-react';
import AdminSidebar from '../../components/AdminSidebar';

const promos = [
  { code: 'SUMMER30', type: 'Percentage', value: '30%', used: 142, max: 500, start: 'Apr 1', end: 'Apr 30', status: 'Active' },
  { code: 'NEWUSER100', type: 'Flat', value: '₹100', used: 891, max: 1000, start: 'Jan 1', end: 'Dec 31', status: 'Active' },
  { code: 'CLEAN50', type: 'Flat', value: '₹50', used: 200, max: 200, start: 'Mar 1', end: 'Mar 31', status: 'Expired' },
  { code: 'FIXI2024', type: 'Percentage', value: '15%', used: 478, max: 1000, start: 'Jan 1', end: 'Jun 30', status: 'Active' },
];

const pv = { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0, transition: { duration: 0.4 } }, exit: { opacity: 0 } };

export default function AdminPromotions() {
  const [showModal, setShowModal] = useState(false);

  return (
    <motion.div variants={pv} initial="initial" animate="animate" exit="exit" style={{ background: '#F8F5FF', minHeight: '100vh' }}>
      <div style={{ display: 'flex', gap: 20, maxWidth: 1320, margin: '0 auto', padding: '24px 20px', alignItems: 'flex-start' }}>
        <AdminSidebar />
        <main style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h1 style={{ fontSize: 'clamp(1.3rem,3vw,1.8rem)', color: '#1A1A2E', fontFamily: 'var(--font-serif)' }}>Coupons & Promotions</h1>
            <button onClick={() => setShowModal(true)} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'linear-gradient(135deg,#3E2A56,#6B4A8F)', color: 'white', borderRadius: 10, padding: '9px 16px', fontSize: 13, fontWeight: 700, border: 'none', cursor: 'pointer' }}>
              <Plus size={14} /> Create Promotion
            </button>
          </div>

          <div style={{ background: 'white', borderRadius: 16, boxShadow: '0 2px 12px rgba(62,42,86,0.07)', border: '1px solid #F0EAF8', overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr style={{ background: '#F8F5FF' }}>
                    {['Code', 'Type', 'Value', 'Usage', 'Validity', 'Status', 'Actions'].map(h => (
                      <th key={h} style={{ padding: '11px 16px', textAlign: 'left', color: '#3E2A56', fontWeight: 700, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {promos.map((p, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #F8F5FF' }}
                      onMouseEnter={e => e.currentTarget.style.background = '#FAFAFA'}
                      onMouseLeave={e => e.currentTarget.style.background = 'white'}>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{ background: '#EDE6F8', color: '#3E2A56', borderRadius: 6, padding: '4px 10px', fontWeight: 800, fontSize: 13, letterSpacing: '0.05em' }}>{p.code}</span>
                      </td>
                      <td style={{ padding: '12px 16px', color: '#4A4A6A' }}>{p.type}</td>
                      <td style={{ padding: '12px 16px', fontWeight: 700, color: '#3E2A56', fontSize: 15 }}>{p.value}</td>
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                          <span style={{ fontSize: 12, color: '#4A4A6A' }}>{p.used}/{p.max}</span>
                          <div style={{ width: 100, height: 5, background: '#F0EAF8', borderRadius: 4 }}>
                            <div style={{ width: `${(p.used / p.max) * 100}%`, height: '100%', background: p.used >= p.max ? '#EF4444' : 'linear-gradient(90deg,#3E2A56,#6B4A8F)', borderRadius: 4 }} />
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '12px 16px', color: '#9B8AB0', fontSize: 12 }}>{p.start} — {p.end}</td>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{ background: p.status === 'Active' ? '#D1FAE5' : '#F3F4F6', color: p.status === 'Active' ? '#059669' : '#6B7280', borderRadius: 50, padding: '3px 10px', fontSize: 11, fontWeight: 700 }}>{p.status}</span>
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ display: 'flex', gap: 6 }}>
                          <button style={{ color: '#6B4A8F', fontSize: 12, fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>Edit</button>
                          <button style={{ color: '#EF4444', fontSize: 12, fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* Create Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              style={{ background: 'white', borderRadius: 20, width: '100%', maxWidth: 480, overflow: 'hidden', boxShadow: '0 24px 64px rgba(0,0,0,0.2)' }}>
              <div style={{ height: 6, background: 'linear-gradient(90deg,#3E2A56,#6B4A8F)' }} />
              <div style={{ padding: '22px 26px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                  <span style={{ fontWeight: 700, color: '#1A1A2E', fontSize: 17 }}>Create Promotion</span>
                  <button onClick={() => setShowModal(false)} style={{ background: '#F0EAF8', border: 'none', borderRadius: 8, padding: '6px', cursor: 'pointer' }}><X size={16} color="#6B4A8F" /></button>
                </div>

                {[['Promo Code', 'SUMMER30', 'text'], ['Discount Value', '30', 'number'], ['Max Uses', '500', 'number']].map(([l, p, t]) => (
                  <div key={l} style={{ marginBottom: 14 }}>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#4A4A6A', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{l}</label>
                    <input type={t} placeholder={p} style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #EDE6F8', borderRadius: 10, fontSize: 13, fontFamily: 'var(--font-sans)', color: '#1A1A2E', outline: 'none', boxSizing: 'border-box' }}
                      onFocus={e => e.target.style.borderColor = '#3E2A56'}
                      onBlur={e => e.target.style.borderColor = '#EDE6F8'} />
                  </div>
                ))}

                <div style={{ marginBottom: 14 }}>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#4A4A6A', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Discount Type</label>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {['Percentage', 'Flat Amount'].map((t, i) => (
                      <button key={t} style={{ flex: 1, padding: '10px', borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-sans)', background: i === 0 ? 'linear-gradient(135deg,#3E2A56,#6B4A8F)' : '#F8F5FF', color: i === 0 ? 'white' : '#9B8AB0', border: i === 0 ? 'none' : '1.5px solid #EDE6F8' }}>{t}</button>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
                  {[['Start Date', ''], ['End Date', '']].map(([l]) => (
                    <div key={l}>
                      <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#4A4A6A', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{l}</label>
                      <input type="date" style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #EDE6F8', borderRadius: 10, fontSize: 13, fontFamily: 'var(--font-sans)', color: '#1A1A2E', outline: 'none', boxSizing: 'border-box' }}
                        onFocus={e => e.target.style.borderColor = '#3E2A56'}
                        onBlur={e => e.target.style.borderColor = '#EDE6F8'} />
                    </div>
                  ))}
                </div>

                <button onClick={() => setShowModal(false)} style={{ width: '100%', background: 'linear-gradient(135deg,#3E2A56,#6B4A8F)', color: 'white', borderRadius: 50, padding: '13px', fontWeight: 700, fontSize: 14, border: 'none', cursor: 'pointer', fontFamily: 'var(--font-sans)' }}>
                  Save Promotion
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
