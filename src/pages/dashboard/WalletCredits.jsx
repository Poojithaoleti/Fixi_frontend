import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownLeft, Wallet, Plus } from 'lucide-react';
import DashboardSidebar from '../../components/DashboardSidebar';

const tabs = ['All', 'Credits', 'Debits'];

const transactions = [
  { type: 'credit', desc: 'Referral Reward — Priya M.', date: 'Mar 28, 2026', amount: '+₹100', color: '#059669', icon: '🎁' },
  { type: 'debit',  desc: 'AC Service #FX-29483', date: 'Mar 15, 2026', amount: '-₹699', color: '#EF4444', icon: '❄️' },
  { type: 'credit', desc: 'Cashback — Wallet Payment', date: 'Mar 15, 2026', amount: '+₹35', color: '#059669', icon: '💸' },
  { type: 'credit', desc: 'Promotional Credit — New User', date: 'Mar 1, 2026', amount: '+₹150', color: '#059669', icon: '🎉' },
  { type: 'debit',  desc: 'Deep Cleaning #FX-28900', date: 'Feb 20, 2026', amount: '-₹1,299', color: '#EF4444', icon: '🧹' },
  { type: 'credit', desc: 'Wallet Top-Up', date: 'Feb 15, 2026', amount: '+₹500', color: '#059669', icon: '💳' },
  { type: 'credit', desc: 'Referral Reward — Kiran S.', date: 'Feb 10, 2026', amount: '+₹100', color: '#059669', icon: '🎁' },
  { type: 'debit',  desc: 'Pest Control #FX-28100', date: 'Jan 28, 2026', amount: '-₹599', color: '#EF4444', icon: '🪲' },
];

const creditChips = [
  { label: 'Cashback', val: '₹85', color: '#059669', bg: '#D1FAE5' },
  { label: 'Referral Credits', val: '₹200', color: '#3E2A56', bg: '#EDE6F8' },
  { label: 'Promo Credits', val: '₹185', color: '#D97706', bg: '#FEF3C7' },
];

export default function WalletCredits() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('All');
  const [autoApply, setAutoApply] = useState(true);
  const filtered = tab === 'All' ? transactions : transactions.filter(t => t.type === tab.toLowerCase());

  return (
    <div className="dashboard-layout" style={{ display: 'flex', gap: 28, alignItems: 'flex-start', maxWidth: 1100, margin: '0 auto', padding: '100px 24px 60px' }}>
      <DashboardSidebar currentPage="wallet" />

      <main style={{ flex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 style={{ fontSize: '1.6rem', color: '#1A1A2E', marginBottom: 20 }}>Wallet & Credits</h1>

          {/* Main wallet card */}
          <motion.div
            whileHover={{ y: -3 }}
            style={{
              background: 'linear-gradient(135deg, #3E2A56 0%, #6B4A8F 100%)',
              borderRadius: 20, padding: '28px', marginBottom: 20,
              boxShadow: '0 8px 32px rgba(62,42,86,0.35)', position: 'relative', overflow: 'hidden',
            }}>
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 20px)', backgroundSize: '28px 28px' }} />
            <div style={{ position: 'relative' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                <Wallet size={18} color="rgba(255,255,255,0.8)" />
                <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>FIXI Wallet Balance</span>
              </div>
              <div style={{ fontSize: 48, fontWeight: 800, color: 'white', lineHeight: 1, marginBottom: 4 }}>₹470.00</div>
              <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, marginBottom: 20 }}>Total available (wallet + credits)</div>
              <motion.button
                whileHover={{ background: 'rgba(255,255,255,0.25)' }}
                style={{
                  background: 'rgba(255,255,255,0.15)', border: '1.5px solid rgba(255,255,255,0.3)',
                  borderRadius: 10, padding: '10px 20px', color: 'white', fontWeight: 700, fontSize: 14,
                  cursor: 'pointer', fontFamily: 'var(--font-sans)', display: 'inline-flex', alignItems: 'center', gap: 6,
                }}>
                <Plus size={14} /> Add Money
              </motion.button>
            </div>
          </motion.div>

          {/* Credit breakdown chips */}
          <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
            {creditChips.map(({ label, val, color, bg }) => (
              <div key={label} style={{
                flex: 1, minWidth: 120, background: 'white', borderRadius: 12, padding: '14px 16px',
                boxShadow: '0 2px 12px rgba(62,42,86,0.06)', border: '1px solid #F0ECFD',
              }}>
                <div style={{ fontSize: 20, fontWeight: 800, color, marginBottom: 4 }}>{val}</div>
                <div style={{ fontSize: 12, color: '#9B8AB0', fontWeight: 600 }}>{label}</div>
              </div>
            ))}
          </div>

          {/* Transactions */}
          <div style={{ background: 'white', borderRadius: 16, padding: '20px 24px', boxShadow: '0 2px 16px rgba(62,42,86,0.06)', border: '1px solid #F0ECFD' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3 style={{ fontSize: 13, fontWeight: 700, color: '#3E2A56', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'var(--font-sans)' }}>Transactions</h3>
              <div style={{ display: 'flex', gap: 6 }}>
                {tabs.map(t => (
                  <button key={t} onClick={() => setTab(t)}
                    style={{
                      padding: '5px 14px', borderRadius: 50, fontSize: 12, fontWeight: 700,
                      cursor: 'pointer', border: 'none', fontFamily: 'var(--font-sans)',
                      background: tab === t ? 'linear-gradient(135deg, #3E2A56, #6B4A8F)' : '#F8F5FF',
                      color: tab === t ? 'white' : '#9B8AB0', transition: 'all 0.2s',
                    }}>
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {filtered.map((tx, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 12, padding: '13px 0',
                    borderBottom: i < filtered.length - 1 ? '1px solid #F8F5FF' : 'none',
                  }}>
                  <div style={{ fontSize: 20, width: 36, textAlign: 'center' }}>{tx.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#1A1A2E' }}>{tx.desc}</div>
                    <div style={{ fontSize: 12, color: '#B0A0C8' }}>{tx.date}</div>
                  </div>
                  <div style={{ fontWeight: 800, fontSize: 15, color: tx.color }}>{tx.amount}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Auto-apply toggle */}
          <div style={{
            marginTop: 16, background: 'white', borderRadius: 12, padding: '14px 18px',
            boxShadow: '0 2px 12px rgba(62,42,86,0.05)', border: '1px solid #F0ECFD',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14, color: '#1A1A2E' }}>Auto-apply credits to bookings</div>
              <div style={{ fontSize: 12, color: '#9B8AB0' }}>Automatically use wallet credits at checkout</div>
            </div>
            <div
              onClick={() => setAutoApply(!autoApply)}
              style={{
                width: 44, height: 24, borderRadius: 12, cursor: 'pointer',
                background: autoApply ? 'linear-gradient(135deg, #3E2A56, #6B4A8F)' : '#E5E7EB',
                position: 'relative', transition: 'all 0.3s', flexShrink: 0,
              }}>
              <div style={{
                position: 'absolute', top: 3, left: autoApply ? 22 : 3,
                width: 18, height: 18, borderRadius: '50%', background: 'white',
                transition: 'left 0.2s', boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
              }} />
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
