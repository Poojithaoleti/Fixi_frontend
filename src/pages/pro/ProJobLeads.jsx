import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MapPin, Clock, Filter, CheckCircle, X } from 'lucide-react';
import ProSidebar from '../../components/ProSidebar';

const allLeads = [
  { id: 'FX-29541', service: 'AC Repair & Service', icon: '❄️', category: 'AC Repair', customer: 'Arjun K.', address: 'Madhapur, Hyderabad', distance: '1.4 km', time: 'Today · 4:00 PM', payout: '₹520', platformFee: '₹52', net: '₹468', expires: '04:32', urgency: 'Today — Urgent' },
  { id: 'FX-29538', service: 'Home Deep Cleaning (2BHK)', icon: '🧹', category: 'Cleaning', customer: 'Priya S.', address: 'Gachibowli, Hyderabad', distance: '2.1 km', time: 'Tomorrow · 9:00 AM', payout: '₹780', platformFee: '₹78', net: '₹702', expires: '12:05', urgency: 'Flexible' },
  { id: 'FX-29522', service: 'Electrical Wiring Fix', icon: '⚡', category: 'Electrical', customer: 'Rohit V.', address: 'Banjara Hills, Hyderabad', distance: '3.2 km', time: 'Today · 6:00 PM', payout: '₹420', platformFee: '₹42', net: '₹378', expires: '01:14', urgency: 'Today — Urgent' },
  { id: 'FX-29510', service: 'AC Installation (Split)', icon: '❄️', category: 'AC Repair', customer: 'Sneha R.', address: 'Jubilee Hills, Hyderabad', distance: '4.0 km', time: 'Tomorrow · 11:00 AM', payout: '₹950', platformFee: '₹95', net: '₹855', expires: '22:40', urgency: 'This Week' },
];

const pv = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
};

export default function ProJobLeads() {
  const navigate = useNavigate();
  const [leads, setLeads] = useState(allLeads);
  const [accepted, setAccepted] = useState(null);
  const [catFilter, setCatFilter] = useState('All');

  const cats = ['All', 'AC Repair', 'Cleaning', 'Electrical'];
  const filtered = catFilter === 'All' ? leads : leads.filter(l => l.category === catFilter);

  const accept = (id) => {
    setAccepted(id);
    setTimeout(() => { setLeads(p => p.filter(l => l.id !== id)); setAccepted(null); navigate('/pro/job-detail'); }, 1200);
  };
  const decline = (id) => setLeads(p => p.filter(l => l.id !== id));

  return (
    <motion.div variants={pv} initial="initial" animate="animate" exit="exit">
      <div style={{ display: 'flex', gap: 28, maxWidth: 1200, margin: '0 auto', padding: '100px 24px 60px', alignItems: 'flex-start' }}>
        <ProSidebar currentPage="pro-job-leads" />

        <main style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
            <div>
              <h1 style={{ fontSize: 'clamp(1.3rem,3vw,1.8rem)', color: '#1A1A2E', fontFamily: 'var(--font-serif)' }}>Job Leads Near You</h1>
              <p style={{ color: '#9B8AB0', fontSize: 14, marginTop: 4 }}>{filtered.length} leads available · Hyderabad</p>
            </div>
            {/* Category filters */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {cats.map(c => (
                <button key={c} onClick={() => setCatFilter(c)}
                  style={{ padding: '8px 16px', borderRadius: 50, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-sans)', transition: 'all 0.2s', background: catFilter === c ? 'linear-gradient(135deg,#3E2A56,#6B4A8F)' : 'white', color: catFilter === c ? 'white' : '#6B6B8A', border: catFilter === c ? 'none' : '1.5px solid #EDE6F8' }}>
                  {c}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence>
            {filtered.length === 0 ? (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                style={{ textAlign: 'center', padding: '80px 40px', background: 'white', borderRadius: 20, boxShadow: '0 4px 20px rgba(62,42,86,0.07)' }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>📭</div>
                <h3 style={{ fontSize: 20, color: '#1A1A2E', marginBottom: 8 }}>No leads right now</h3>
                <p style={{ color: '#9B8AB0', fontSize: 14 }}>New leads will appear here. Make sure your duty is ON.</p>
              </motion.div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {filtered.map((lead) => (
                  <motion.div key={lead.id} layout
                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -40, height: 0, marginBottom: 0, overflow: 'hidden' }}
                    transition={{ duration: 0.35 }}
                    style={{ background: 'white', borderRadius: 16, boxShadow: '0 4px 20px rgba(62,42,86,0.08)', border: '1px solid #F0EAF8', overflow: 'hidden' }}>
                    {/* Top gradient strip */}
                    <div style={{ height: 4, background: 'linear-gradient(90deg,#3E2A56,#6B4A8F)' }} />

                    <div style={{ padding: '20px 22px' }}>
                      <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', flexWrap: 'wrap' }}>
                        {/* Icon */}
                        <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'linear-gradient(135deg,#3E2A56,#6B4A8F)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>{lead.icon}</div>

                        {/* Middle */}
                        <div style={{ flex: 1, minWidth: 160 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
                            <span style={{ fontWeight: 700, color: '#1A1A2E', fontSize: 16 }}>{lead.service}</span>
                            <span style={{ background: lead.urgency.includes('Urgent') ? '#FEF3C7' : '#EDE6F8', color: lead.urgency.includes('Urgent') ? '#D97706' : '#6B4A8F', borderRadius: 50, fontSize: 11, fontWeight: 700, padding: '2px 9px' }}>{lead.urgency}</span>
                          </div>
                          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 10 }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#9B8AB0', fontSize: 13 }}><MapPin size={13} />{lead.address} · {lead.distance}</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#9B8AB0', fontSize: 13 }}><Clock size={13} />{lead.time}</span>
                          </div>
                          {/* Payout breakdown */}
                          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                            <div style={{ background: '#F8F5FF', borderRadius: 8, padding: '6px 12px' }}>
                              <div style={{ fontSize: 11, color: '#9B8AB0' }}>Booking value</div>
                              <div style={{ fontSize: 15, fontWeight: 700, color: '#3E2A56' }}>{lead.payout}</div>
                            </div>
                            <div style={{ background: '#F8F5FF', borderRadius: 8, padding: '6px 12px' }}>
                              <div style={{ fontSize: 11, color: '#9B8AB0' }}>Platform fee</div>
                              <div style={{ fontSize: 15, fontWeight: 700, color: '#EF4444' }}>-{lead.platformFee}</div>
                            </div>
                            <div style={{ background: '#EDE6F8', borderRadius: 8, padding: '6px 12px' }}>
                              <div style={{ fontSize: 11, color: '#6B4A8F' }}>You earn</div>
                              <div style={{ fontSize: 15, fontWeight: 800, color: '#3E2A56' }}>{lead.net}</div>
                            </div>
                          </div>
                        </div>

                        {/* Right: expiry + actions */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10, flexShrink: 0 }}>
                          <div style={{ background: '#FEF3C7', borderRadius: 50, padding: '5px 12px', fontSize: 12, fontWeight: 700, color: '#D97706', display: 'flex', alignItems: 'center', gap: 5 }}>
                            <Clock size={12} /> Expires in {lead.expires}
                          </div>
                          <div style={{ display: 'flex', gap: 8 }}>
                            {accepted === lead.id ? (
                              <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }}
                                style={{ background: '#10B981', color: 'white', borderRadius: 50, padding: '10px 20px', fontWeight: 700, fontSize: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
                                <CheckCircle size={15} /> Accepted!
                              </motion.div>
                            ) : (
                              <>
                                <button onClick={() => accept(lead.id)}
                                  style={{ background: 'linear-gradient(135deg,#3E2A56,#6B4A8F)', color: 'white', borderRadius: 50, padding: '10px 20px', fontWeight: 700, fontSize: 14, border: 'none', cursor: 'pointer', fontFamily: 'var(--font-sans)' }}>
                                  Accept Job
                                </button>
                                <button onClick={() => decline(lead.id)}
                                  style={{ color: '#9B8AB0', fontSize: 13, fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'var(--font-sans)' }}>
                                  <X size={14} /> Decline
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </motion.div>
  );
}
