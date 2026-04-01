import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone, MessageCircle, X, CheckCircle, MapPin, Navigation } from 'lucide-react';

const trackSteps = [
  { label: 'Confirmed', done: true },
  { label: 'On the Way', active: true },
  { label: 'Arrived', done: false },
  { label: 'In Progress', done: false },
  { label: 'Completed', done: false },
];

export default function LiveTracking() {
  const navigate = useNavigate();
  return (
    <div style={{ minHeight: '100vh', paddingTop: 70, background: '#1A1A2E', display: 'flex', flexDirection: 'column' }}>

      {/* Map Area */}
      <div style={{ flex: 1, position: 'relative', background: '#2A2A3E', minHeight: 380 }}>
        {/* Fake map grid */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
          <svg width="100%" height="100%" style={{ opacity: 0.15 }}>
            {[...Array(20)].map((_, i) => <line key={`h${i}`} x1="0" y1={i * 40} x2="100%" y2={i * 40} stroke="#6B4A8F" strokeWidth="0.5" />)}
            {[...Array(30)].map((_, i) => <line key={`v${i}`} x1={i * 60} y1="0" x2={i * 60} y2="100%" stroke="#6B4A8F" strokeWidth="0.5" />)}
          </svg>
          {/* Fake roads */}
          <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.3 }}>
            <path d="M 0 200 Q 200 180 400 200 T 800 210" stroke="#EDE6F8" strokeWidth="4" fill="none" />
            <path d="M 200 0 Q 220 150 240 300 T 260 500" stroke="#EDE6F8" strokeWidth="3" fill="none" />
            <path d="M 0 120 Q 300 100 600 130 T 1000 140" stroke="#EDE6F8" strokeWidth="2.5" fill="none" />
          </svg>
        </div>

        {/* Route line (dashed purple) */}
        <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
          <defs>
            <marker id="arrowHead" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 Z" fill="#6B4A8F" />
            </marker>
          </defs>
          <path
            d="M 55% 70% Q 50% 55% 40% 35%"
            stroke="#6B4A8F" strokeWidth="3" strokeDasharray="10 6"
            fill="none" markerEnd="url(#arrowHead)"
          />
        </svg>

        {/* Customer pin */}
        <div style={{ position: 'absolute', left: '38%', top: '30%', transform: 'translate(-50%, -50%)' }}>
          <div style={{
            width: 40, height: 40, borderRadius: '50%',
            background: '#3E2A56', border: '3px solid white',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
          }}>
            <MapPin size={18} color="white" />
          </div>
          <div style={{ position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', marginTop: 4, background: 'white', borderRadius: 6, padding: '2px 8px', fontSize: 11, fontWeight: 700, color: '#3E2A56', whiteSpace: 'nowrap', boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}>Your Location</div>
        </div>

        {/* Technician pin with pulse */}
        <div style={{ position: 'absolute', left: '55%', top: '68%', transform: 'translate(-50%, -50%)' }}>
          <motion.div
            animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ repeat: Infinity, duration: 2 }}
            style={{
              position: 'absolute', width: 56, height: 56, borderRadius: '50%',
              background: '#6B4A8F', top: -8, left: -8,
            }}
          />
          <div style={{
            width: 40, height: 40, borderRadius: '50%',
            background: 'linear-gradient(135deg, #3E2A56, #6B4A8F)',
            border: '3px solid white',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 16px rgba(107,74,143,0.5)',
            position: 'relative', zIndex: 1,
          }}>
            <span style={{ fontSize: 18 }}>🔧</span>
          </div>
          <div style={{ position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', marginTop: 4, background: 'linear-gradient(135deg, #3E2A56, #6B4A8F)', borderRadius: 6, padding: '2px 8px', fontSize: 11, fontWeight: 700, color: 'white', whiteSpace: 'nowrap', boxShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>Ravi</div>
        </div>

        {/* Map header */}
        <div style={{ position: 'absolute', top: 16, left: 16, right: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', zIndex: 10 }}>
          <button onClick={() => navigate('/dashboard/active-bookings')}
            style={{ background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: 10, padding: '8px 14px', cursor: 'pointer', fontWeight: 700, fontSize: 13, color: '#3E2A56', display: 'flex', alignItems: 'center', gap: 6, backdropFilter: 'blur(8px)' }}>
            ← Back
          </button>
          <div style={{ background: 'rgba(255,255,255,0.9)', borderRadius: 10, padding: '8px 14px', backdropFilter: 'blur(8px)' }}>
            <div style={{ fontSize: 11, color: '#9B8AB0', fontWeight: 600 }}>LIVE TRACKING</div>
            <div style={{ fontSize: 13, color: '#3E2A56', fontWeight: 700 }}>AC Service #FX-29483</div>
          </div>
        </div>
      </div>

      {/* Bottom slide-up card */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        style={{
          background: 'white', borderRadius: '24px 24px 0 0',
          padding: '24px', paddingBottom: 40,
          boxShadow: '0 -8px 40px rgba(62,42,86,0.2)',
        }}>

        {/* Drag handle */}
        <div style={{ width: 40, height: 4, borderRadius: 2, background: '#EDE6F8', margin: '0 auto 20px' }} />

        {/* Pro info + ETA */}
        <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 20 }}>
          <div style={{
            width: 52, height: 52, borderRadius: '50%',
            background: 'linear-gradient(135deg, #6B4A8F, #9B7EC8)',
            border: '2.5px solid #3E2A56',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 800, color: 'white', fontSize: 18,
          }}>R</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 800, fontSize: 16, color: '#1A1A2E' }}>Ravi Kumar</div>
            <div style={{ fontSize: 13, color: '#F59E0B', fontWeight: 600 }}>★ 4.8 · 320 jobs</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#3E2A56' }}>12 min</div>
            <div style={{ fontSize: 12, color: '#9B8AB0' }}>away</div>
          </div>
        </div>

        {/* Status with bold message */}
        <div style={{
          background: '#F8F5FF', borderRadius: 12, padding: '12px 16px', marginBottom: 20,
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            style={{ width: 10, height: 10, borderRadius: '50%', background: '#3E2A56', flexShrink: 0 }}
          />
          <div>
            <div style={{ fontWeight: 700, color: '#3E2A56', fontSize: 14 }}>On the way — 12 mins away</div>
            <div style={{ fontSize: 12, color: '#9B8AB0' }}>Travelling from Ameerpet, Hyderabad</div>
          </div>
        </div>

        {/* Progress track */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 0, marginBottom: 24 }}>
          {trackSteps.map((s, i) => (
            <div key={s.label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                {i > 0 && (
                  <div style={{ flex: 1, height: 2, background: i <= 1 ? 'linear-gradient(90deg, #3E2A56, #6B4A8F)' : '#EDE6F8' }} />
                )}
                <div style={{
                  width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                  background: s.done ? 'linear-gradient(135deg, #3E2A56, #6B4A8F)' : s.active ? 'white' : '#EDE6F8',
                  border: s.active ? '3px solid #3E2A56' : 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: s.active ? '0 0 0 4px rgba(62,42,86,0.15)' : 'none',
                }}>
                  {s.done ? <CheckCircle size={12} color="white" /> : s.active ? (
                    <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 1 }}
                      style={{ width: 8, height: 8, borderRadius: '50%', background: '#3E2A56' }} />
                  ) : null}
                </div>
                {i < trackSteps.length - 1 && (
                  <div style={{ flex: 1, height: 2, background: '#EDE6F8' }} />
                )}
              </div>
              <div style={{ fontSize: 10, fontWeight: s.active ? 700 : 500, color: s.done || s.active ? '#3E2A56' : '#B0A0C8', textAlign: 'center' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: 10 }}>
          <motion.button whileHover={{ y: -2 }} style={{
            flex: 1, padding: '13px', borderRadius: 12,
            background: 'linear-gradient(135deg, #3E2A56, #6B4A8F)',
            color: 'white', fontWeight: 700, fontSize: 15, border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            fontFamily: 'var(--font-sans)',
          }}>
            <Phone size={16} /> Call
          </motion.button>
          <motion.button whileHover={{ y: -2 }} style={{
            flex: 1, padding: '13px', borderRadius: 12,
            border: '2px solid #3E2A56', color: '#3E2A56',
            fontWeight: 700, fontSize: 15, background: 'white', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            fontFamily: 'var(--font-sans)',
          }}>
            <MessageCircle size={16} /> Chat
          </motion.button>
        </div>
        <button style={{ display: 'block', margin: '12px auto 0', color: '#B0A0C8', fontSize: 13, background: 'none', border: 'none', cursor: 'pointer' }}>
          Cancel Booking
        </button>
      </motion.div>
    </div>
  );
}
