import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Save, ToggleLeft, ToggleRight } from 'lucide-react';
import AdminSidebar from '../../components/AdminSidebar';

const cities = [
  { name: 'Hyderabad', status: 'Active', launched: 'Jan 2020', pros: 124, zones: 5 },
  { name: 'Bangalore', status: 'Active', launched: 'Mar 2021', pros: 98, zones: 4 },
  { name: 'Mumbai', status: 'Active', launched: 'Jun 2021', pros: 87, zones: 4 },
  { name: 'Delhi', status: 'Active', launched: 'Sep 2021', pros: 76, zones: 3 },
  { name: 'Chennai', status: 'Active', launched: 'Jan 2022', pros: 54, zones: 3 },
  { name: 'Pune', status: 'Paused', launched: 'Apr 2022', pros: 31, zones: 2 },
  { name: 'Kolkata', status: 'Active', launched: 'Jun 2022', pros: 42, zones: 2 },
  { name: 'Ahmedabad', status: 'Paused', launched: 'Oct 2022', pros: 28, zones: 2 },
];

const zones = [
  { name: 'Zone A — Central', color: 'rgba(62,42,86,0.35)', active: true },
  { name: 'Zone B — North', color: 'rgba(107,74,143,0.3)', active: true },
  { name: 'Zone C — West', color: 'rgba(155,126,200,0.3)', active: true },
  { name: 'Zone D — East', color: 'rgba(62,42,86,0.18)', active: false },
  { name: 'Zone E — South', color: 'rgba(107,74,143,0.18)', active: true },
];

// Approximate polygon points for map zones (% of container)
const zonePolygons = [
  { name: 'A', points: '40,30 60,30 65,55 55,65 35,60 30,45', color: '#3E2A56' },
  { name: 'B', points: '35,10 65,10 70,30 60,30 40,30 30,30', color: '#6B4A8F' },
  { name: 'C', points: '10,30 30,30 30,60 20,70 8,55', color: '#9B7EC8' },
  { name: 'D', points: '65,30 85,20 90,50 75,65 65,55', color: '#C4A8E8' },
  { name: 'E', points: '30,60 55,65 65,55 70,75 50,88 25,78', color: '#3E2A56' },
];

const pv = { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0, transition: { duration: 0.4 } }, exit: { opacity: 0 } };

export default function AdminZones() {
  const [selectedCity, setSelectedCity] = useState(cities[0]);
  const [cityActive, setCityActive] = useState(true);
  const [pricing, setPricing] = useState(0);
  const [saved, setSaved] = useState(false);

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <motion.div variants={pv} initial="initial" animate="animate" exit="exit" style={{ background: '#F8F5FF', minHeight: '100vh' }}>
      <div style={{ display: 'flex', gap: 20, maxWidth: 1320, margin: '0 auto', padding: '24px 20px', alignItems: 'flex-start' }}>
        <AdminSidebar />
        <main style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h1 style={{ fontSize: 'clamp(1.3rem,3vw,1.8rem)', color: '#1A1A2E', fontFamily: 'var(--font-serif)' }}>Zone & City Management</h1>
            <button style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'linear-gradient(135deg,#3E2A56,#6B4A8F)', color: 'white', borderRadius: 10, padding: '9px 16px', fontSize: 13, fontWeight: 700, border: 'none', cursor: 'pointer' }}>
              <Plus size={14} /> Add City
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 18 }} className="admin-two-col">
            {/* City list */}
            <div style={{ background: 'white', borderRadius: 16, boxShadow: '0 2px 12px rgba(62,42,86,0.07)', border: '1px solid #F0EAF8', overflow: 'hidden' }}>
              <div style={{ padding: '14px 16px', borderBottom: '1px solid #F0EAF8', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 700, color: '#1A1A2E', fontSize: 14 }}>Cities ({cities.length})</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {cities.map((city, i) => {
                  const isActive = selectedCity.name === city.name;
                  return (
                    <button key={city.name} onClick={() => setSelectedCity(city)}
                      style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', border: 'none', cursor: 'pointer', textAlign: 'left', fontFamily: 'var(--font-sans)', background: isActive ? 'linear-gradient(90deg,rgba(62,42,86,0.06),transparent)' : 'white', borderLeft: isActive ? '4px solid #3E2A56' : '4px solid transparent', transition: 'all 0.15s', borderBottom: '1px solid #F8F5FF' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 14, fontWeight: isActive ? 700 : 500, color: isActive ? '#3E2A56' : '#1A1A2E' }}>{city.name}</div>
                        <div style={{ fontSize: 11, color: '#9B8AB0' }}>{city.pros} pros · {city.zones} zones</div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <div style={{ width: 7, height: 7, borderRadius: '50%', background: city.status === 'Active' ? '#10B981' : '#9B8AB0' }} />
                        <span style={{ fontSize: 11, color: city.status === 'Active' ? '#059669' : '#9B8AB0', fontWeight: 600 }}>{city.status}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* City detail */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ background: 'white', borderRadius: 16, boxShadow: '0 2px 12px rgba(62,42,86,0.07)', border: '1px solid #F0EAF8', overflow: 'hidden' }}>
                {/* City header */}
                <div style={{ padding: '16px 22px', borderBottom: '1px solid #F0EAF8', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
                  <div>
                    <h2 style={{ fontSize: 20, fontWeight: 700, color: '#1A1A2E', marginBottom: 3 }}>{selectedCity.name}</h2>
                    <span style={{ fontSize: 12, color: '#9B8AB0' }}>Launched {selectedCity.launched} · {selectedCity.pros} active pros</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 13, color: '#6B6B8A', fontWeight: 500 }}>{cityActive ? 'Active' : 'Paused'}</span>
                    <div onClick={() => setCityActive(a => !a)} style={{ cursor: 'pointer' }}>
                      {cityActive
                        ? <ToggleRight size={28} color="#3E2A56" />
                        : <ToggleLeft size={28} color="#C4AFDE" />}
                    </div>
                  </div>
                </div>

                {/* Map */}
                <div style={{ position: 'relative', background: '#F0F4F8', height: 280, overflow: 'hidden' }}>
                  {/* Grid */}
                  <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.2 }}>
                    {[...Array(8)].map((_, i) => <line key={`h${i}`} x1="0" y1={`${i*14.3}%`} x2="100%" y2={`${i*14.3}%`} stroke="#94A3B8" strokeWidth="0.8" />)}
                    {[...Array(10)].map((_, i) => <line key={`v${i}`} x1={`${i*11}%`} y1="0" x2={`${i*11}%`} y2="100%" stroke="#94A3B8" strokeWidth="0.8" />)}
                  </svg>
                  {/* Roads */}
                  <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.4 }}>
                    <line x1="0" y1="48%" x2="100%" y2="50%" stroke="#CBD5E1" strokeWidth="5" />
                    <line x1="48%" y1="0" x2="50%" y2="100%" stroke="#CBD5E1" strokeWidth="5" />
                    <line x1="0" y1="25%" x2="100%" y2="28%" stroke="#CBD5E1" strokeWidth="2" />
                    <line x1="72%" y1="0" x2="71%" y2="100%" stroke="#CBD5E1" strokeWidth="2" />
                  </svg>
                  {/* Zone polygons */}
                  <svg viewBox="0 0 100 100" preserveAspectRatio="none" width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
                    {zonePolygons.map(z => (
                      <g key={z.name}>
                        <polygon points={z.points} fill={z.color} fillOpacity="0.25" stroke={z.color} strokeWidth="0.5" />
                        <text x={z.points.split(' ')[0].split(',')[0]} y={z.points.split(' ')[0].split(',')[1]}
                          style={{ fontSize: '5px', fill: z.color, fontWeight: 'bold', fontFamily: 'sans-serif' }}>Zone {z.name}</text>
                      </g>
                    ))}
                  </svg>
                  {/* City label */}
                  <div style={{ position: 'absolute', bottom: 10, left: 12, background: 'white', borderRadius: 8, padding: '5px 10px', fontSize: 12, fontWeight: 700, color: '#3E2A56', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                    📍 {selectedCity.name}
                  </div>
                </div>

                {/* Zone list */}
                <div style={{ padding: '16px 22px', borderTop: '1px solid #F0EAF8' }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#9B8AB0', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>Zones</div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {zones.map((z, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7, background: z.active ? '#EDE6F8' : '#F3F4F6', borderRadius: 8, padding: '6px 12px', border: `1px solid ${z.active ? '#C4AFDE' : '#E5E7EB'}` }}>
                        <div style={{ width: 10, height: 10, borderRadius: 3, background: zonePolygons[i]?.color || '#3E2A56', opacity: 0.7 }} />
                        <span style={{ fontSize: 12, fontWeight: 600, color: z.active ? '#3E2A56' : '#6B7280' }}>{z.name}</span>
                        {!z.active && <span style={{ fontSize: 10, color: '#9B8AB0' }}>Off</span>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Pricing override */}
              <div style={{ background: 'white', borderRadius: 16, padding: '18px 22px', boxShadow: '0 2px 12px rgba(62,42,86,0.07)', border: '1px solid #F0EAF8' }}>
                <div style={{ fontWeight: 700, color: '#1A1A2E', fontSize: 14, marginBottom: 14 }}>City Pricing Override</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: 13, color: '#6B6B8A' }}>Price adjustment for this city</span>
                  <span style={{ fontWeight: 700, color: '#3E2A56', fontSize: 14 }}>{pricing > 0 ? '+' : ''}{pricing}%</span>
                </div>
                <input type="range" min={-20} max={30} value={pricing} onChange={e => setPricing(+e.target.value)}
                  style={{ width: '100%', accentColor: '#3E2A56', marginBottom: 14 }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#9B8AB0', marginBottom: 14 }}>
                  <span>-20% cheaper</span><span>Base price</span><span>+30% premium</span>
                </div>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleSave}
                  style={{ width: '100%', background: saved ? '#10B981' : 'linear-gradient(135deg,#3E2A56,#6B4A8F)', color: 'white', borderRadius: 50, padding: '12px', fontWeight: 700, fontSize: 14, border: 'none', cursor: 'pointer', transition: 'background 0.3s', fontFamily: 'var(--font-sans)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                  <Save size={14} /> {saved ? 'Saved!' : 'Save City Settings'}
                </motion.button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </motion.div>
  );
}
