import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Copy, Share2, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import DashboardSidebar from '../../components/DashboardSidebar';

const referralHistory = [
  { friend: 'Priya M.', date: 'Mar 20, 2026', status: 'Credited', amount: '₹100', statusColor: '#059669', statusBg: '#D1FAE5' },
  { friend: 'Kiran S.', date: 'Feb 10, 2026', status: 'Credited', amount: '₹100', statusColor: '#059669', statusBg: '#D1FAE5' },
  { friend: 'Rahul T.', date: 'Apr 1, 2026', status: 'Pending', amount: '₹100', statusColor: '#D97706', statusBg: '#FEF3C7' },
  { friend: 'Sneha B.', date: 'Mar 5, 2026', status: 'Credited', amount: '₹100', statusColor: '#059669', statusBg: '#D1FAE5' },
];

const steps = [
  { icon: '📤', title: 'Share your code', desc: 'Send your unique referral code to friends & family.' },
  { icon: '🔗', title: 'Friend signs up', desc: 'They create a FIXI account using your code.' },
  { icon: '💸', title: 'Both earn ₹100', desc: 'You and your friend each get ₹100 in wallet credits.' },
];

export default function ReferralProgram() {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText('FIXI-ARJUN22');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="dashboard-layout" style={{ display: 'flex', gap: 28, alignItems: 'flex-start', maxWidth: 1100, margin: '0 auto', padding: '100px 24px 60px' }}>
      <DashboardSidebar currentPage="referral" />

      <main style={{ flex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 style={{ fontSize: '1.6rem', color: '#1A1A2E', marginBottom: 20 }}>Referral Program</h1>

          {/* Hero banner */}
          <div style={{
            background: 'linear-gradient(135deg, #3E2A56, #6B4A8F)',
            borderRadius: 20, padding: '28px 32px', marginBottom: 24, position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', right: -20, top: -20, fontSize: 100, opacity: 0.1 }}>🎁</div>
            <div style={{ position: 'absolute', right: 60, bottom: -10, fontSize: 60, opacity: 0.07 }}>🎁</div>
            <div style={{ position: 'relative', maxWidth: 500 }}>
              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>Refer & Earn</div>
              <h2 style={{ color: 'white', fontSize: '2rem', marginBottom: 8, lineHeight: 1.2 }}>Give ₹100,<br />Get ₹100</h2>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, lineHeight: 1.6 }}>
                Invite friends to FIXI. When they complete their first booking, you both earn ₹100 in wallet credits!
              </p>
            </div>
          </div>

          {/* Referral code card */}
          <div style={{ background: 'white', borderRadius: 16, padding: '24px', marginBottom: 20, boxShadow: '0 2px 16px rgba(62,42,86,0.06)', border: '1px solid #F0ECFD' }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#9B8AB0', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12 }}>Your Referral Code</div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 20, flexWrap: 'wrap' }}>
              <div style={{
                flex: 1, minWidth: 160, padding: '14px 20px', background: '#F8F5FF', borderRadius: 10,
                border: '2px dashed #C4B0E8', fontFamily: 'monospace', fontSize: 22, fontWeight: 800,
                color: '#3E2A56', letterSpacing: '0.1em', textAlign: 'center',
              }}>FIXI-ARJUN22</div>
              <motion.button
                onClick={handleCopy}
                whileHover={{ y: -2 }} whileTap={{ scale: 0.96 }}
                style={{
                  padding: '14px 22px', borderRadius: 10, border: 'none',
                  background: copied ? 'linear-gradient(135deg, #059669, #10B981)' : 'linear-gradient(135deg, #3E2A56, #6B4A8F)',
                  color: 'white', fontWeight: 700, fontSize: 14,
                  cursor: 'pointer', fontFamily: 'var(--font-sans)',
                  display: 'flex', alignItems: 'center', gap: 8, transition: 'background 0.3s',
                }}>
                {copied ? <><CheckCircle size={15} /> Copied!</> : <><Copy size={15} /> Copy Code</>}
              </motion.button>
            </div>

            <div style={{ fontSize: 13, fontWeight: 600, color: '#9B8AB0', marginBottom: 10 }}>Share via</div>
            <div style={{ display: 'flex', gap: 10 }}>
              {[
                { label: 'WhatsApp', emoji: '💬', color: '#25D366', bg: '#E8FAF0' },
                { label: 'SMS', emoji: '📱', color: '#3B82F6', bg: '#EFF6FF' },
                { label: 'Email', emoji: '📧', color: '#6B7280', bg: '#F9FAFB' },
              ].map(({ label, emoji, color, bg }) => (
                <button key={label} style={{
                  flex: 1, padding: '10px 8px', borderRadius: 10, background: bg, border: 'none',
                  cursor: 'pointer', fontWeight: 600, fontSize: 12, color,
                  fontFamily: 'var(--font-sans)', transition: 'all 0.2s',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                }}>
                  <span style={{ fontSize: 20 }}>{emoji}</span>{label}
                </button>
              ))}
            </div>
          </div>

          {/* Stats row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 24 }}>
            {[
              { label: 'Invited', val: '12', icon: '📤' },
              { label: 'Joined', val: '8', icon: '✅' },
              { label: 'Earned', val: '₹800', icon: '💰' },
            ].map(({ label, val, icon }) => (
              <div key={label} style={{
                background: 'white', borderRadius: 14, padding: '16px', textAlign: 'center',
                boxShadow: '0 2px 12px rgba(62,42,86,0.06)', border: '1px solid #F0ECFD',
              }}>
                <div style={{ fontSize: 24, marginBottom: 6 }}>{icon}</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: '#3E2A56', marginBottom: 2 }}>{val}</div>
                <div style={{ fontSize: 12, color: '#9B8AB0', fontWeight: 600 }}>{label}</div>
              </div>
            ))}
          </div>

          {/* How it works */}
          <div style={{ background: '#F8F5FF', borderRadius: 16, padding: '20px 24px', marginBottom: 20 }}>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: '#3E2A56', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'var(--font-sans)', marginBottom: 18 }}>How It Works</h3>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {steps.map((s, i) => (
                <div key={i} style={{ flex: 1, minWidth: 140, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                    background: 'linear-gradient(135deg, #3E2A56, #6B4A8F)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16,
                  }}>{s.icon}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 13, color: '#1A1A2E', marginBottom: 3 }}>{s.title}</div>
                    <div style={{ fontSize: 12, color: '#9B8AB0', lineHeight: 1.5 }}>{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* History table */}
          <div style={{ background: 'white', borderRadius: 16, overflow: 'hidden', boxShadow: '0 2px 16px rgba(62,42,86,0.06)', border: '1px solid #F0ECFD' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #F8F5FF', fontWeight: 700, fontSize: 13, color: '#3E2A56', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Referral History</div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#F8F5FF' }}>
                    {['Friend', 'Date', 'Status', 'Reward'].map(h => (
                      <th key={h} style={{ padding: '10px 16px', fontSize: 11, fontWeight: 700, color: '#9B8AB0', textAlign: 'left', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {referralHistory.map((r, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #F8F5FF' }}>
                      <td style={{ padding: '12px 16px', fontSize: 14, fontWeight: 600, color: '#1A1A2E' }}>{r.friend}</td>
                      <td style={{ padding: '12px 16px', fontSize: 13, color: '#9B8AB0' }}>{r.date}</td>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{ background: r.statusBg, color: r.statusColor, fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 50 }}>{r.status}</span>
                      </td>
                      <td style={{ padding: '12px 16px', fontSize: 14, fontWeight: 800, color: '#3E2A56' }}>{r.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <p style={{ marginTop: 12, fontSize: 12, color: '#B0A0C8', lineHeight: 1.5 }}>
            * Referral credits are issued after the friend's first completed booking. Maximum 50 referrals per account. FIXI reserves the right to modify or cancel this program at any time.
          </p>
        </motion.div>
      </main>
    </div>
  );
}
