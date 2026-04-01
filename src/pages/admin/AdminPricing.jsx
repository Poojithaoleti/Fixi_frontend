import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, ChevronRight, Save, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';
import AdminSidebar from '../../components/AdminSidebar';

const categories = [
  { id: 1, label: 'AC Repair', icon: '❄️', active: true, subs: ['AC Service', 'AC Installation', 'Gas Top-Up', 'AC Uninstall'] },
  { id: 2, label: 'Plumbing', icon: '🔧', active: true, subs: ['Leak Fix', 'Pipe Replacement', 'Drain Cleaning', 'Tap Repair'] },
  { id: 3, label: 'Electrical', icon: '⚡', active: true, subs: ['Wiring Repair', 'Fan Install', 'MCB Replace', 'Socket Fix'] },
  { id: 4, label: 'Deep Cleaning', icon: '🧹', active: true, subs: ['1BHK Clean', '2BHK Clean', '3BHK Clean', 'Office Clean'] },
  { id: 5, label: 'Carpentry', icon: '🪵', active: false, subs: ['Furniture Repair', 'Door Fix', 'Cabinet Install', 'Custom Build'] },
  { id: 6, label: 'Painting', icon: '🎨', active: true, subs: ['Interior Paint', 'Exterior Paint', 'Texture Finish', 'Waterproofing'] },
  { id: 7, label: 'Pest Control', icon: '🐛', active: true, subs: ['Cockroach', 'Rodent', 'Termite', 'Mosquito'] },
  { id: 8, label: 'Appliance Repair', icon: '📱', active: true, subs: ['Washing Machine', 'Refrigerator', 'Microwave', 'Oven'] },
];

const cities = ['Hyderabad', 'Bangalore', 'Mumbai', 'Delhi', 'Chennai'];

const pv = { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0, transition: { duration: 0.4 } }, exit: { opacity: 0 } };

export default function AdminPricing() {
  const [selectedCat, setSelectedCat] = useState(categories[0]);
  const [selectedSub, setSelectedSub] = useState(categories[0].subs[0]);
  const [saved, setSaved] = useState(false);

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <motion.div variants={pv} initial="initial" animate="animate" exit="exit" style={{ background: '#F8F5FF', minHeight: '100vh' }}>
      <div style={{ display: 'flex', gap: 20, maxWidth: 1320, margin: '0 auto', padding: '24px 20px', alignItems: 'flex-start' }}>
        <AdminSidebar />
        <main style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h1 style={{ fontSize: 'clamp(1.3rem,3vw,1.8rem)', color: '#1A1A2E', fontFamily: 'var(--font-serif)' }}>Services & Pricing</h1>
            <button style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'linear-gradient(135deg,#3E2A56,#6B4A8F)', color: 'white', borderRadius: 10, padding: '9px 16px', fontSize: 13, fontWeight: 700, border: 'none', cursor: 'pointer' }}>
              <Plus size={14} /> Add Category
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 18 }} className="admin-two-col">
            {/* Left panel — category tree */}
            <div style={{ background: 'white', borderRadius: 16, padding: '14px', boxShadow: '0 2px 12px rgba(62,42,86,0.07)', border: '1px solid #F0EAF8' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {categories.map(cat => (
                  <button key={cat.id} onClick={() => { setSelectedCat(cat); setSelectedSub(cat.subs[0]); }}
                    style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 10, border: 'none', cursor: 'pointer', textAlign: 'left', fontFamily: 'var(--font-sans)', transition: 'all 0.15s', background: selectedCat.id === cat.id ? '#EDE6F8' : 'transparent', borderLeft: selectedCat.id === cat.id ? '3px solid #3E2A56' : '3px solid transparent' }}>
                    <span style={{ fontSize: 18 }}>{cat.icon}</span>
                    <span style={{ fontSize: 13, fontWeight: selectedCat.id === cat.id ? 700 : 500, color: selectedCat.id === cat.id ? '#3E2A56' : '#4A4A6A', flex: 1 }}>{cat.label}</span>
                    {!cat.active && <span style={{ background: '#F3F4F6', color: '#6B7280', borderRadius: 50, fontSize: 10, fontWeight: 600, padding: '1px 7px' }}>Off</span>}
                    <ChevronRight size={14} color={selectedCat.id === cat.id ? '#3E2A56' : '#C4AFDE'} />
                  </button>
                ))}
              </div>
            </div>

            {/* Right panel — edit */}
            <div style={{ background: 'white', borderRadius: 16, padding: '22px 26px', boxShadow: '0 2px 12px rgba(62,42,86,0.07)', border: '1px solid #F0EAF8' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 22 }}>
                <span style={{ fontSize: 28 }}>{selectedCat.icon}</span>
                <div style={{ flex: 1 }}>
                  <input defaultValue={selectedCat.label} style={{ fontSize: 18, fontWeight: 700, color: '#1A1A2E', border: 'none', outline: 'none', fontFamily: 'var(--font-sans)', width: '100%', background: 'transparent' }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 13, color: '#9B8AB0' }}>Active</span>
                  <div onClick={() => {}} style={{ cursor: 'pointer' }}>
                    {selectedCat.active
                      ? <ToggleRight size={28} color="#3E2A56" />
                      : <ToggleLeft size={28} color="#C4AFDE" />}
                  </div>
                </div>
              </div>

              {/* Sub-service selector */}
              <div style={{ marginBottom: 18 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#9B8AB0', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>Sub-services</div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {selectedCat.subs.map(s => (
                    <button key={s} onClick={() => setSelectedSub(s)} style={{ padding: '7px 14px', borderRadius: 50, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-sans)', background: selectedSub === s ? 'linear-gradient(135deg,#3E2A56,#6B4A8F)' : '#F8F5FF', color: selectedSub === s ? 'white' : '#6B6B8A', border: selectedSub === s ? 'none' : '1.5px solid #EDE6F8' }}>{s}</button>
                  ))}
                  <button style={{ padding: '7px 14px', borderRadius: 50, fontSize: 12, fontWeight: 600, cursor: 'pointer', background: 'white', color: '#6B4A8F', border: '1.5px dashed #C4AFDE' }}>+ Add</button>
                </div>
              </div>

              {/* Description */}
              <div style={{ marginBottom: 18 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#4A4A6A', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Description</label>
                <textarea rows={2} defaultValue={`Professional ${selectedSub} service by verified technicians.`}
                  style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #EDE6F8', borderRadius: 10, fontSize: 13, fontFamily: 'var(--font-sans)', color: '#1A1A2E', outline: 'none', resize: 'none', lineHeight: 1.6, boxSizing: 'border-box' }}
                  onFocus={e => e.target.style.borderColor = '#3E2A56'}
                  onBlur={e => e.target.style.borderColor = '#EDE6F8'} />
              </div>

              {/* Pricing table */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#9B8AB0', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>Pricing by City</div>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <thead>
                      <tr style={{ background: '#F8F5FF' }}>
                        <th style={{ padding: '9px 14px', textAlign: 'left', color: '#3E2A56', fontWeight: 700, fontSize: 11, textTransform: 'uppercase' }}>City</th>
                        {['Basic', 'Standard', 'Premium'].map(t => (
                          <th key={t} style={{ padding: '9px 14px', textAlign: 'center', color: '#3E2A56', fontWeight: 700, fontSize: 11, textTransform: 'uppercase' }}>{t}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {cities.map((city, i) => (
                        <tr key={city} style={{ borderBottom: '1px solid #F8F5FF' }}>
                          <td style={{ padding: '9px 14px', fontWeight: 600, color: '#4A4A6A' }}>{city}</td>
                          {[399, 699, 1199].map((base, j) => (
                            <td key={j} style={{ padding: '9px 14px', textAlign: 'center' }}>
                              <input type="number" defaultValue={base + i * 20} style={{ width: 80, padding: '6px 10px', border: '1.5px solid #EDE6F8', borderRadius: 8, fontSize: 13, textAlign: 'center', outline: 'none', fontFamily: 'var(--font-sans)' }}
                                onFocus={e => e.target.style.borderColor = '#3E2A56'}
                                onBlur={e => e.target.style.borderColor = '#EDE6F8'} />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: 10 }}>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleSave}
                  style={{ flex: 3, background: saved ? '#10B981' : 'linear-gradient(135deg,#3E2A56,#6B4A8F)', color: 'white', borderRadius: 50, padding: '12px', fontWeight: 700, fontSize: 14, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, transition: 'background 0.3s', fontFamily: 'var(--font-sans)' }}>
                  <Save size={14} /> {saved ? 'Saved!' : 'Save Changes'}
                </motion.button>
                <button style={{ flex: 1, color: '#EF4444', fontSize: 13, fontWeight: 600, background: 'none', border: '1.5px solid #FEE2E2', borderRadius: 50, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontFamily: 'var(--font-sans)' }}>
                  <Trash2 size={13} /> Delete
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </motion.div>
  );
}
