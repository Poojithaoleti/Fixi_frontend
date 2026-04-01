import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownLeft, TrendingUp } from 'lucide-react';
import ProSidebar from '../../components/ProSidebar';

const tabs = ['All', 'Paid Out', 'Pending'];
const txns = [
  { type: 'paid', service: 'AC Service & Repair', id: 'FX-29200', date: 'Mar 28, 2026', amount: '₹468', color: '#059669' },
  { type: 'paid', service: 'AC Installation (Split)', id: 'FX-29150', date: 'Mar 25, 2026', amount: '₹855', color: '#059669' },
  { type: 'pending', service: 'AC Repair — Arjun K.', id: 'FX-29541', date: 'Mar 30, 2026', amount: '₹459', color: '#D97706' },
  { type: 'paid', service: 'Deep Cleaning Assist', id: 'FX-29100', date: 'Mar 22, 2026', amount: '₹702', color: '#059669' },
  { type: 'paid', service: 'AC Service', id: 'FX-28900', date: 'Mar 18, 2026', amount: '₹468', color: '#059669' },
  { type: 'pending', service: 'AC Installation — Priya M.', id: 'FX-29510', date: 'Apr 1, 2026', amount: '₹855', color: '#D97706' },
  { type: 'paid', service: 'AC Repair', id: 'FX-28700', date: 'Mar 14, 2026', amount: '₹378', color: '#059669' },
];

const pv = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
};

export default function ProEarnings() {
  const [tab, setTab] = useState('All');
  const filtered = tab === 'All' ? txns : txns.filter(t => (tab === 'Paid Out' ? t.type === 'paid' : t.type === 'pending'));

  return (
    <motion.div variants={pv} initial="initial" animate="animate" exit="exit">
      <div style={{ display: 'flex', gap: 28, maxWidth: 1200, margin: '0 auto', padding: '100px 24px 60px', alignItems: 'flex-start' }}>
        <ProSidebar currentPage="pro-earnings" />

        <main style={{ flex: 1 }}>
          <h1 style={{ fontSize: 'clamp(1.3rem,3vw,1.8rem)', color: '#1A1A2E', fontFamily: 'var(--font-serif)', marginBottom: 24 }}>Earnings & Wallet</h1>

          {/* Hero earnings card */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            style={{ background: 'linear-gradient(135deg,#3E2A56 0%,#2A1B3D 100%)', borderRadius: 20, padding: '28px 32px', marginBottom: 20, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', right: -40, top: -40, width: 220, height: 220, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.06)' }} />
            <div style={{ position: 'absolute', right: 20, top: 20, width: 120, height: 120, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.04)' }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
                <div>
                  <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: 13, fontWeight: 600, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Earned This Month</div>
                  <div style={{ color: 'white', fontSize: 'clamp(2rem,5vw,2.8rem)', fontWeight: 800, fontFamily: 'var(--font-sans)', lineHeight: 1 }}>₹18,450</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#10B981', fontSize: 13, fontWeight: 600, marginTop: 8 }}>
                    <TrendingUp size={14} /> ↑ 22% vs last month
                  </div>
                </div>
                <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  style={{ border: '2px solid rgba(255,255,255,0.5)', color: 'white', borderRadius: 50, padding: '11px 24px', fontWeight: 700, fontSize: 14, background: 'transparent', cursor: 'pointer', fontFamily: 'var(--font-sans)', flexShrink: 0, transition: 'background 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  Request Payout
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Stats chips */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginBottom: 24 }}>
            {[
              { label: 'Pending Clearance', value: '₹1,314', color: '#D97706', bg: '#FEF3C7' },
              { label: 'Paid Out (Mar)', value: '₹17,136', color: '#059669', bg: '#D1FAE5' },
              { label: 'Next Payout', value: 'Friday', color: '#3E2A56', bg: '#EDE6F8' },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.08 }}
                style={{ background: 'white', borderRadius: 14, padding: '16px 18px', boxShadow: '0 4px 16px rgba(62,42,86,0.07)', border: '1px solid #F0EAF8' }}>
                <div style={{ fontSize: 11, color: '#9B8AB0', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 6 }}>{s.label}</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: s.color, fontFamily: 'var(--font-sans)' }}>{s.value}</div>
              </motion.div>
            ))}
          </div>

          {/* Transactions */}
          <div style={{ background: 'white', borderRadius: 16, boxShadow: '0 4px 20px rgba(62,42,86,0.07)', border: '1px solid #F0EAF8', overflow: 'hidden' }}>
            {/* Tab bar */}
            <div style={{ display: 'flex', padding: '14px 20px 0', borderBottom: '1px solid #F0EAF8', gap: 4 }}>
              {tabs.map(t => (
                <button key={t} onClick={() => setTab(t)}
                  style={{ padding: '8px 16px', borderRadius: '8px 8px 0 0', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-sans)', border: 'none', transition: 'all 0.2s', background: tab === t ? '#3E2A56' : 'transparent', color: tab === t ? 'white' : '#9B8AB0' }}>
                  {t}
                </button>
              ))}
            </div>

            <div style={{ padding: '8px 0' }}>
              {filtered.map((txn, i) => (
                <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                  style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '13px 22px', borderBottom: i < filtered.length - 1 ? '1px solid #F8F5FF' : 'none' }}>
                  <div style={{ width: 38, height: 38, borderRadius: '50%', background: txn.type === 'paid' ? '#D1FAE5' : '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {txn.type === 'paid' ? <ArrowUpRight size={18} color="#059669" /> : <ArrowDownLeft size={18} color="#D97706" />}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, color: '#1A1A2E', fontSize: 14 }}>{txn.service}</div>
                    <div style={{ color: '#9B8AB0', fontSize: 12 }}>{txn.id} · {txn.date}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 700, color: txn.color, fontSize: 15 }}>{txn.amount}</div>
                    <div style={{ fontSize: 11, color: txn.type === 'paid' ? '#059669' : '#D97706', fontWeight: 600 }}>{txn.type === 'paid' ? 'Paid Out' : 'Pending'}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bank details */}
          <div style={{ background: 'white', borderRadius: 16, padding: '18px 22px', boxShadow: '0 4px 16px rgba(62,42,86,0.07)', border: '1px solid #F0EAF8', marginTop: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 40, height: 40, background: '#EDE6F8', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>🏦</div>
              <div>
                <div style={{ fontWeight: 700, color: '#1A1A2E', fontSize: 14 }}>HDFC Bank</div>
                <div style={{ color: '#9B8AB0', fontSize: 13 }}>••••••7842 · IFSC: HDFC0001234</div>
              </div>
            </div>
            <button style={{ color: '#6B4A8F', fontWeight: 600, fontSize: 13, background: 'none', border: 'none', cursor: 'pointer' }}>Update Bank Details</button>
          </div>
        </main>
      </div>
    </motion.div>
  );
}
