import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, AlertTriangle, CheckCircle, Navigation, Phone, MessageCircle } from 'lucide-react';
import ProSidebar from '../../components/ProSidebar';

const pv = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
};

export default function ProJobDetail() {
  const navigate = useNavigate();
  const [jobStatus, setJobStatus] = useState('accepted'); // accepted → arrived → in-progress → completed

  const statusFlow = ['accepted', 'arrived', 'in-progress', 'completed'];
  const statusLabels = { accepted: 'Accepted', arrived: 'Mark Arrived', 'in-progress': 'Start Job', completed: 'Completed ✓' };
  const nextAction = { accepted: 'Mark Arrived', arrived: 'Start Job', 'in-progress': 'Complete Job', completed: null };

  const advance = () => {
    const idx = statusFlow.indexOf(jobStatus);
    if (idx < statusFlow.length - 1) setJobStatus(statusFlow[idx + 1]);
  };

  return (
    <motion.div variants={pv} initial="initial" animate="animate" exit="exit">
      <div style={{ display: 'flex', gap: 28, maxWidth: 1200, margin: '0 auto', padding: '100px 24px 60px', alignItems: 'flex-start' }}>
        <ProSidebar currentPage="pro-job-leads" />

        <main style={{ flex: 1 }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <button onClick={() => navigate('/pro/job-leads')} style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#6B4A8F', fontWeight: 600, fontSize: 14, background: 'none', border: 'none', cursor: 'pointer' }}>
                <ArrowLeft size={16} /> Back
              </button>
              <span style={{ color: '#EDE6F8' }}>|</span>
              <h1 style={{ fontSize: '1.2rem', color: '#1A1A2E', fontFamily: 'var(--font-sans)', fontWeight: 700 }}>Job #FX-29541</h1>
            </div>
            <span style={{ background: 'linear-gradient(135deg,#3E2A56,#6B4A8F)', color: 'white', borderRadius: 50, padding: '5px 16px', fontSize: 12, fontWeight: 700 }}>
              {statusLabels[jobStatus]}
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 20 }} className="job-detail-grid">
            {/* Left column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Customer card */}
              <div style={{ background: 'white', borderRadius: 16, padding: '20px 22px', boxShadow: '0 4px 16px rgba(62,42,86,0.07)', border: '1px solid #F0EAF8' }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#9B8AB0', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12 }}>Customer</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#EDE6F8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 700, color: '#3E2A56' }}>A</div>
                    <div>
                      <div style={{ fontWeight: 700, color: '#1A1A2E', fontSize: 15 }}>Arjun K. <span style={{ fontSize: 12, color: '#9B8AB0', fontWeight: 400 }}>(masked)</span></div>
                      <div style={{ fontSize: 13, color: '#9B8AB0' }}>⭐ 4.7 · Member since 2024</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'linear-gradient(135deg,#3E2A56,#6B4A8F)', color: 'white', borderRadius: 50, padding: '8px 16px', fontSize: 13, fontWeight: 600, border: 'none', cursor: 'pointer' }}>
                      <Phone size={13} /> Call
                    </button>
                    <button style={{ display: 'flex', alignItems: 'center', gap: 6, border: '1.5px solid #3E2A56', color: '#3E2A56', borderRadius: 50, padding: '6px 14px', fontSize: 13, fontWeight: 600, background: 'white', cursor: 'pointer' }}>
                      <MessageCircle size={13} /> Chat
                    </button>
                  </div>
                </div>
              </div>

              {/* Problem description */}
              <div style={{ background: 'white', borderRadius: 16, padding: '20px 22px', boxShadow: '0 4px 16px rgba(62,42,86,0.07)', border: '1px solid #F0EAF8' }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#9B8AB0', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12 }}>Problem Description</div>
                <p style={{ color: '#4A4A6A', fontSize: 14, lineHeight: 1.7, marginBottom: 14 }}>
                  AC not cooling at all. It's a 1.5 ton LG split AC, approximately 3 years old. The issue started yesterday evening. I noticed the indoor unit is running but there's no cool air coming out. The compressor outside seems to be working.
                </p>
                {/* Photo thumbnails */}
                <div style={{ display: 'flex', gap: 8 }}>
                  {['🌡️', '❄️'].map((em, i) => (
                    <div key={i} style={{ width: 80, height: 70, background: '#EDE6F8', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, border: '1px solid #C4AFDE' }}>{em}</div>
                  ))}
                </div>
                <div style={{ marginTop: 12 }}>
                  <span style={{ background: '#FEF3C7', color: '#D97706', borderRadius: 50, fontSize: 12, fontWeight: 700, padding: '4px 12px', display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                    <AlertTriangle size={12} /> Today — Urgent
                  </span>
                </div>
              </div>

              {/* Location */}
              <div style={{ background: 'white', borderRadius: 16, padding: '20px 22px', boxShadow: '0 4px 16px rgba(62,42,86,0.07)', border: '1px solid #F0EAF8' }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#9B8AB0', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12 }}>Location</div>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#1A1A2E', fontWeight: 600, fontSize: 14, marginBottom: 4 }}>
                      <MapPin size={15} color="#6B4A8F" /> Flat 4B, Sunridge Apartments
                    </div>
                    <div style={{ color: '#9B8AB0', fontSize: 13, marginLeft: 21 }}>Banjara Hills, Hyderabad 500034</div>
                    <div style={{ color: '#9B8AB0', fontSize: 13, marginLeft: 21, marginTop: 2 }}>1.4 km from your location</div>
                  </div>
                  <button style={{ display: 'flex', alignItems: 'center', gap: 6, border: '1.5px solid #3E2A56', color: '#3E2A56', borderRadius: 50, padding: '8px 16px', fontSize: 13, fontWeight: 600, background: 'white', cursor: 'pointer' }}>
                    <Navigation size={13} /> Directions
                  </button>
                </div>
                {/* Fake mini map */}
                <div style={{ marginTop: 14, background: '#F8F5FF', borderRadius: 10, height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #EDE6F8', position: 'relative', overflow: 'hidden' }}>
                  <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.12 }}>
                    {[0,1,2,3,4].map(i => <line key={`h${i}`} x1="0" y1={i*30} x2="100%" y2={i*30} stroke="#3E2A56" strokeWidth="0.8"/>)}
                    {[0,1,2,3,4,5,6,7,8].map(i => <line key={`v${i}`} x1={i*80} y1="0" x2={i*80} y2="100%" stroke="#3E2A56" strokeWidth="0.8"/>)}
                  </svg>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg,#3E2A56,#6B4A8F)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1, boxShadow: '0 4px 12px rgba(62,42,86,0.4)' }}>
                    <MapPin size={14} color="white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Schedule */}
              <div style={{ background: 'white', borderRadius: 16, padding: '20px 22px', boxShadow: '0 4px 16px rgba(62,42,86,0.07)', border: '1px solid #F0EAF8' }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#9B8AB0', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12 }}>Schedule</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{ width: 40, height: 40, background: '#EDE6F8', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>📅</div>
                  <div>
                    <div style={{ fontWeight: 700, color: '#1A1A2E', fontSize: 15 }}>Today, 30 Mar 2026</div>
                    <div style={{ color: '#9B8AB0', fontSize: 13, display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={12} /> 4:00 PM</div>
                  </div>
                </div>
              </div>

              {/* Payout */}
              <div style={{ background: 'linear-gradient(135deg,#3E2A56,#4D3569)', borderRadius: 16, padding: '20px 22px' }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12 }}>Payout Breakdown</div>
                {[['Booking Value', '₹520'], ['Platform Fee (10%)', '-₹52'], ['GST on fee', '-₹9']].map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                    <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: 13 }}>{k}</span>
                    <span style={{ color: v.startsWith('-') ? '#FCA5A5' : 'rgba(255,255,255,0.9)', fontWeight: 600, fontSize: 13 }}>{v}</span>
                  </div>
                ))}
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 12 }}>
                  <span style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 700, fontSize: 14 }}>You Earn</span>
                  <span style={{ color: 'white', fontWeight: 800, fontSize: 20, fontFamily: 'var(--font-sans)' }}>₹459</span>
                </div>
              </div>

              {/* Action buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {nextAction[jobStatus] && (
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    onClick={advance}
                    style={{ background: 'linear-gradient(135deg,#3E2A56,#6B4A8F)', color: 'white', borderRadius: 50, padding: '14px', fontWeight: 700, fontSize: 15, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontFamily: 'var(--font-sans)' }}>
                    <CheckCircle size={16} /> {nextAction[jobStatus]}
                  </motion.button>
                )}
                {jobStatus === 'completed' && (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                    style={{ background: '#D1FAE5', borderRadius: 14, padding: '16px', textAlign: 'center' }}>
                    <CheckCircle size={28} color="#059669" style={{ margin: '0 auto 8px' }} />
                    <div style={{ fontWeight: 700, color: '#059669', fontSize: 15 }}>Job Completed!</div>
                    <div style={{ color: '#6B7280', fontSize: 13, marginTop: 4 }}>₹459 will be credited on Friday</div>
                  </motion.div>
                )}
                <button style={{ color: '#9B8AB0', fontSize: 13, fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                  <AlertTriangle size={14} /> Report Issue
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </motion.div>
  );
}
