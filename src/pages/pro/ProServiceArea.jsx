import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Save, CheckCircle } from 'lucide-react';
import ProSidebar from '../../components/ProSidebar';

const zones = ['Madhapur', 'Gachibowli', 'Kondapur', 'Banjara Hills', 'Jubilee Hills', 'Hitec City', 'Kukatpally', 'Miyapur'];

const pv = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
};

export default function ProServiceArea() {
  const [radius, setRadius] = useState(8);
  const [selectedZones, setSelectedZones] = useState(['Madhapur', 'Gachibowli', 'Hitec City']);
  const [emergency, setEmergency] = useState(true);
  const [saved, setSaved] = useState(false);

  const toggleZone = (z) => setSelectedZones(p => p.includes(z) ? p.filter(x => x !== z) : [...p, z]);
  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <motion.div variants={pv} initial="initial" animate="animate" exit="exit">
      <div style={{ display: 'flex', gap: 28, maxWidth: 1200, margin: '0 auto', padding: '100px 24px 60px', alignItems: 'flex-start' }}>
        <ProSidebar currentPage="pro-area" />

        <main style={{ flex: 1 }}>
          <h1 style={{ fontSize: 'clamp(1.3rem,3vw,1.8rem)', color: '#1A1A2E', fontFamily: 'var(--font-serif)', marginBottom: 24 }}>My Service Area</h1>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20 }} className="area-grid">
            {/* Map mock */}
            <div style={{ background: 'white', borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 20px rgba(62,42,86,0.08)', border: '1px solid #F0EAF8', minHeight: 440, position: 'relative' }}>
              {/* Grid map */}
              <div style={{ position: 'absolute', inset: 0, background: '#F0F4F8' }}>
                <svg width="100%" height="100%" style={{ opacity: 0.3 }}>
                  {[...Array(12)].map((_, i) => <line key={`h${i}`} x1="0" y1={i * 40} x2="100%" y2={i * 40} stroke="#94A3B8" strokeWidth="0.8" />)}
                  {[...Array(16)].map((_, i) => <line key={`v${i}`} x1={i * 60} y1="0" x2={i * 60} y2="100%" stroke="#94A3B8" strokeWidth="0.8" />)}
                </svg>
                {/* Roads */}
                <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.5 }}>
                  <line x1="0" y1="45%" x2="100%" y2="48%" stroke="#CBD5E1" strokeWidth="4" />
                  <line x1="35%" y1="0" x2="33%" y2="100%" stroke="#CBD5E1" strokeWidth="4" />
                  <line x1="0" y1="72%" x2="100%" y2="70%" stroke="#CBD5E1" strokeWidth="2" />
                  <line x1="65%" y1="0" x2="67%" y2="100%" stroke="#CBD5E1" strokeWidth="2" />
                </svg>
                {/* Radius circle */}
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: `${radius * 22}px`, height: `${radius * 22}px`, borderRadius: '50%', border: '2px dashed #3E2A56', background: 'rgba(62,42,86,0.08)', transition: 'all 0.3s' }} />
                {/* Center pin */}
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-100%)', zIndex: 10 }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg,#3E2A56,#6B4A8F)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(62,42,86,0.4)' }}>
                    <MapPin size={18} color="white" />
                  </div>
                  <div style={{ width: 0, height: 0, borderLeft: '8px solid transparent', borderRight: '8px solid transparent', borderTop: '10px solid #3E2A56', margin: '0 auto' }} />
                </div>
                {/* Area label */}
                <div style={{ position: 'absolute', bottom: 14, left: 14, background: 'white', borderRadius: 8, padding: '6px 12px', fontSize: 12, fontWeight: 700, color: '#3E2A56', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                  📍 Madhapur, Hyderabad
                </div>
                <div style={{ position: 'absolute', bottom: 14, right: 14, background: 'white', borderRadius: 8, padding: '6px 12px', fontSize: 12, fontWeight: 600, color: '#3E2A56', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                  Radius: {radius} km
                </div>
              </div>
            </div>

            {/* Settings panel */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ background: 'white', borderRadius: 16, padding: '20px 22px', boxShadow: '0 4px 20px rgba(62,42,86,0.07)', border: '1px solid #F0EAF8' }}>
                <div style={{ fontWeight: 700, color: '#1A1A2E', fontSize: 15, marginBottom: 16 }}>Service Radius</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: 13, color: '#6B6B8A' }}>Distance from your location</span>
                  <span style={{ background: '#EDE6F8', color: '#3E2A56', borderRadius: 50, padding: '2px 12px', fontSize: 14, fontWeight: 800 }}>{radius} km</span>
                </div>
                <input type="range" min={2} max={20} value={radius} onChange={e => setRadius(+e.target.value)}
                  style={{ width: '100%', accentColor: '#3E2A56', marginBottom: 6 }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#9B8AB0' }}><span>2 km</span><span>20 km</span></div>
                <div style={{ marginTop: 12, background: '#F8F5FF', borderRadius: 8, padding: '8px 12px', fontSize: 12, color: '#6B4A8F' }}>
                  ~{Math.round(radius * radius * 3.14)} km² coverage · est. {Math.round(radius * 12)} jobs/month
                </div>
              </div>

              <div style={{ background: 'white', borderRadius: 16, padding: '20px 22px', boxShadow: '0 4px 20px rgba(62,42,86,0.07)', border: '1px solid #F0EAF8' }}>
                <div style={{ fontWeight: 700, color: '#1A1A2E', fontSize: 15, marginBottom: 4 }}>Preferred Zones</div>
                <div style={{ fontSize: 12, color: '#9B8AB0', marginBottom: 12 }}>Prioritize job leads from these areas</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                  {zones.map(z => (
                    <button key={z} onClick={() => toggleZone(z)} style={{ padding: '6px 14px', borderRadius: 50, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-sans)', transition: 'all 0.2s', background: selectedZones.includes(z) ? 'linear-gradient(135deg,#3E2A56,#6B4A8F)' : '#F8F5FF', color: selectedZones.includes(z) ? 'white' : '#6B6B8A', border: selectedZones.includes(z) ? 'none' : '1.5px solid #EDE6F8' }}>{z}</button>
                  ))}
                </div>
              </div>

              <div style={{ background: 'white', borderRadius: 16, padding: '18px 22px', boxShadow: '0 4px 20px rgba(62,42,86,0.07)', border: '1px solid #F0EAF8' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontWeight: 700, color: '#1A1A2E', fontSize: 14, marginBottom: 3 }}>Emergency Jobs</div>
                    <div style={{ fontSize: 12, color: '#9B8AB0' }}>Accept urgent same-day bookings</div>
                  </div>
                  <div onClick={() => setEmergency(e => !e)}
                    style={{ width: 44, height: 24, borderRadius: 12, background: emergency ? 'linear-gradient(135deg,#3E2A56,#6B4A8F)' : '#EDE6F8', cursor: 'pointer', position: 'relative', transition: 'background 0.3s', flexShrink: 0 }}>
                    <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'white', position: 'absolute', top: 3, left: emergency ? 23 : 3, transition: 'left 0.25s', boxShadow: '0 1px 4px rgba(0,0,0,0.2)' }} />
                  </div>
                </div>
              </div>

              <div style={{ background: 'white', borderRadius: 16, padding: '18px 22px', boxShadow: '0 4px 20px rgba(62,42,86,0.07)', border: '1px solid #F0EAF8' }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#6B6B8A', marginBottom: 6 }}>City</div>
                <div style={{ fontWeight: 700, color: '#1A1A2E', fontSize: 15, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <MapPin size={14} color="#6B4A8F" /> Hyderabad, Telangana
                </div>
                <div style={{ fontSize: 12, color: '#9B8AB0', marginTop: 3 }}>Auto-detected from your registered address</div>
              </div>

              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleSave}
                style={{ width: '100%', background: saved ? '#10B981' : 'linear-gradient(135deg,#3E2A56,#6B4A8F)', color: 'white', borderRadius: 50, padding: '14px', fontWeight: 700, fontSize: 15, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, transition: 'background 0.3s', fontFamily: 'var(--font-sans)' }}>
                {saved ? <><CheckCircle size={16} /> Saved!</> : <><Save size={16} /> Save Settings</>}
              </motion.button>
            </div>
          </div>
        </main>
      </div>
    </motion.div>
  );
}

