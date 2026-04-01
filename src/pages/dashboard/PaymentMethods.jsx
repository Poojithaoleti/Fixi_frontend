import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Trash2, CreditCard, Smartphone, Wallet } from 'lucide-react';
import DashboardSidebar from '../../components/DashboardSidebar';

const cards = [
  { type: 'VISA', last4: '4242', expiry: '12/27', color: '#1A1F71' },
  { type: 'MASTER', last4: '8832', expiry: '09/26', color: '#EB001B' },
];

const upis = ['arjun.kumar@okaxis', 'arjun@ybl'];

export default function PaymentMethods() {
  const navigate = useNavigate();
  return (
    <div className="dashboard-layout" style={{ display: 'flex', gap: 28, alignItems: 'flex-start', maxWidth: 1100, margin: '0 auto', padding: '100px 24px 60px' }}>
      <DashboardSidebar currentPage="payment-methods" />

      <main style={{ flex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 style={{ fontSize: '1.6rem', color: '#1A1A2E', marginBottom: 24 }}>Payment Methods</h1>

          {/* FIXI Wallet */}
          <motion.div
            whileHover={{ y: -2 }}
            style={{
              background: 'linear-gradient(135deg, #3E2A56 0%, #6B4A8F 100%)',
              borderRadius: 20, padding: '24px 28px', marginBottom: 24,
              boxShadow: '0 8px 32px rgba(62,42,86,0.35)', position: 'relative', overflow: 'hidden',
            }}>
            {/* Decorative circles */}
            <div style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
            <div style={{ position: 'absolute', bottom: -20, right: 60, width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                  <Wallet size={18} color="rgba(255,255,255,0.8)" />
                  <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13, fontWeight: 600 }}>FIXI Wallet</span>
                </div>
                <div style={{ color: 'white', fontSize: 36, fontWeight: 800, lineHeight: 1, marginBottom: 6 }}>₹250.00</div>
                <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>Available Balance</div>
              </div>
              <button style={{
                background: 'rgba(255,255,255,0.15)', border: '1.5px solid rgba(255,255,255,0.3)',
                borderRadius: 10, padding: '10px 18px', color: 'white', fontWeight: 700, fontSize: 13,
                cursor: 'pointer', fontFamily: 'var(--font-sans)', backdropFilter: 'blur(4px)',
              }}>
                + Add Money
              </button>
            </div>
          </motion.div>

          {/* Saved Cards */}
          <div style={{ background: 'white', borderRadius: 16, padding: '20px 24px', marginBottom: 20, boxShadow: '0 2px 16px rgba(62,42,86,0.06)', border: '1px solid #F0ECFD' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
              <h3 style={{ fontSize: 13, fontWeight: 700, color: '#3E2A56', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'var(--font-sans)' }}>Saved Cards</h3>
              <button style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#6B4A8F', fontWeight: 700, fontSize: 13, background: 'none', border: 'none', cursor: 'pointer' }}>
                <Plus size={14} /> Add Card
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {cards.map((card, i) => (
                <motion.div key={i} whileHover={{ x: 3 }} style={{
                  display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px',
                  borderRadius: 12, border: '1px solid #F0ECFD',
                  borderLeft: `4px solid ${card.color}`,
                  background: '#FAFAFA',
                }}>
                  <div style={{
                    width: 44, height: 30, background: card.color,
                    borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <span style={{ color: 'white', fontSize: 9, fontWeight: 800 }}>{card.type}</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 14, color: '#1A1A2E' }}>•••• •••• •••• {card.last4}</div>
                    <div style={{ fontSize: 12, color: '#9B8AB0' }}>Expires {card.expiry}</div>
                  </div>
                  <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#EF4444', padding: 6 }}><Trash2 size={15} /></button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* UPI */}
          <div style={{ background: 'white', borderRadius: 16, padding: '20px 24px', marginBottom: 20, boxShadow: '0 2px 16px rgba(62,42,86,0.06)', border: '1px solid #F0ECFD' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
              <h3 style={{ fontSize: 13, fontWeight: 700, color: '#3E2A56', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'var(--font-sans)' }}>UPI IDs</h3>
              <button style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#6B4A8F', fontWeight: 700, fontSize: 13, background: 'none', border: 'none', cursor: 'pointer' }}>
                <Plus size={14} /> Add UPI ID
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {upis.map((upi, i) => (
                <motion.div key={i} whileHover={{ x: 3 }} style={{
                  display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px',
                  borderRadius: 10, border: '1px solid #F0ECFD', background: '#FAFAFA',
                  borderLeft: '4px solid #10B981',
                }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: '#D1FAE5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Smartphone size={16} color="#059669" />
                  </div>
                  <div style={{ flex: 1, fontSize: 14, fontWeight: 600, color: '#1A1A2E' }}>{upi}</div>
                  <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#EF4444' }}><Trash2 size={14} /></button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Add new card dashed */}
          <motion.button
            whileHover={{ borderColor: '#6B4A8F', background: '#F8F5FF' }}
            style={{
              width: '100%', border: '2px dashed #D6C8F0', borderRadius: 14, padding: '18px',
              background: 'transparent', cursor: 'pointer', color: '#6B4A8F', fontWeight: 600, fontSize: 14,
              fontFamily: 'var(--font-sans)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              transition: 'all 0.2s',
            }}>
            <CreditCard size={18} /> + Add New Payment Method
          </motion.button>
        </motion.div>
      </main>
    </div>
  );
}
