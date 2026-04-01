import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Flag, Star } from 'lucide-react';
import AdminSidebar from '../../components/AdminSidebar';

const reviews = [
  { id: 'R-1021', customer: 'Arjun K.', pro: 'Ravi Kumar', service: 'AC Repair', rating: 5, date: 'Mar 28', comment: 'Excellent service. On time and professional.', flagged: false },
  { id: 'R-1019', customer: 'Anon', pro: 'Suresh P.', service: 'Plumbing', rating: 1, date: 'Mar 26', comment: 'Absolutely terrible. This person never showed up and demanded money. Scammer!', flagged: true },
  { id: 'R-1018', customer: 'Priya S.', pro: 'CleanPro', service: 'Cleaning', rating: 4, date: 'Mar 25', comment: 'Good cleaning, missed a few spots but overall satisfied.', flagged: false },
  { id: 'R-1017', customer: 'Rohit V.', pro: 'Anand M.', service: 'Electrical', rating: 5, date: 'Mar 24', comment: 'Very knowledgeable. Fixed the issue quickly.', flagged: false },
  { id: 'R-1015', customer: 'Anon', pro: 'Ravi Kumar', service: 'AC Install', rating: 2, date: 'Mar 22', comment: 'Suspicious review text that seems fake and promotional in nature.', flagged: true },
];

const tabs = ['All', 'Flagged', 'Pending'];
const pv = { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0, transition: { duration: 0.4 } }, exit: { opacity: 0 } };

export default function AdminReviews() {
  const [tab, setTab] = useState('All');
  const [selected, setSelected] = useState(null);
  const filtered = tab === 'All' ? reviews : tab === 'Flagged' ? reviews.filter(r => r.flagged) : reviews;

  return (
    <motion.div variants={pv} initial="initial" animate="animate" exit="exit" style={{ background: '#F8F5FF', minHeight: '100vh' }}>
      <div style={{ display: 'flex', gap: 20, maxWidth: 1320, margin: '0 auto', padding: '24px 20px', alignItems: 'flex-start' }}>
        <AdminSidebar />
        <main style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h1 style={{ fontSize: 'clamp(1.3rem,3vw,1.8rem)', color: '#1A1A2E', fontFamily: 'var(--font-serif)' }}>Reviews Moderation</h1>
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
            {[['Total', reviews.length, '#3E2A56', '#EDE6F8'], ['Flagged', reviews.filter(r=>r.flagged).length, '#D97706', '#FEF3C7']].map(([l,v,c,bg]) => (
              <div key={l} style={{ background: 'white', borderRadius: 12, padding: '12px 18px', boxShadow: '0 2px 10px rgba(62,42,86,0.07)', border: '1px solid #F0EAF8', display: 'flex', gap: 10, alignItems: 'center' }}>
                <span style={{ fontSize: 11, color: '#9B8AB0', fontWeight: 600, textTransform: 'uppercase' }}>{l}</span>
                <span style={{ fontSize: 20, fontWeight: 800, color: c }}>{v}</span>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
            {tabs.map(t => <button key={t} onClick={() => setTab(t)} style={{ padding: '8px 16px', borderRadius: 50, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-sans)', background: tab === t ? 'linear-gradient(135deg,#3E2A56,#6B4A8F)' : 'white', color: tab === t ? 'white' : '#9B8AB0', border: tab === t ? 'none' : '1.5px solid #EDE6F8' }}>{t}</button>)}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {filtered.map((r, i) => (
              <motion.div key={r.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.06 }}
                style={{ background: 'white', borderRadius: 14, padding: '16px 20px', boxShadow: '0 2px 10px rgba(62,42,86,0.06)', border: '1px solid #F0EAF8', borderLeft: r.flagged ? '4px solid #F59E0B' : '4px solid transparent' }}>
                <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, flexWrap: 'wrap' }}>
                      <span style={{ fontWeight: 700, color: '#1A1A2E', fontSize: 14 }}>{r.customer}</span>
                      <span style={{ color: '#9B8AB0', fontSize: 12 }}>→ {r.pro}</span>
                      <span style={{ background: '#EDE6F8', color: '#6B4A8F', borderRadius: 50, padding: '1px 8px', fontSize: 11, fontWeight: 600 }}>{r.service}</span>
                      {r.flagged && <span style={{ background: '#FEF3C7', color: '#D97706', borderRadius: 50, padding: '1px 8px', fontSize: 11, fontWeight: 700 }}>⚠️ Flagged</span>}
                    </div>
                    <div style={{ display: 'flex', gap: 2, marginBottom: 6 }}>
                      {[...Array(5)].map((_, j) => <Star key={j} size={13} style={{ fill: j < r.rating ? '#FBBF24' : '#EDE6F8', color: j < r.rating ? '#FBBF24' : '#EDE6F8' }} />)}
                    </div>
                    <p style={{ color: '#4A4A6A', fontSize: 13, lineHeight: 1.6 }}>{r.comment}</p>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-end', flexShrink: 0 }}>
                    <span style={{ color: '#9B8AB0', fontSize: 12 }}>{r.date}</span>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button onClick={() => setSelected(r)} style={{ color: '#6B4A8F', fontSize: 12, fontWeight: 600, background: '#EDE6F8', border: 'none', borderRadius: 6, padding: '5px 10px', cursor: 'pointer' }}>View Full</button>
                      <button style={{ color: '#EF4444', fontSize: 12, fontWeight: 600, background: '#FEE2E2', border: 'none', borderRadius: 6, padding: '5px 10px', cursor: 'pointer' }}>Remove</button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </main>
      </div>
    </motion.div>
  );
}
