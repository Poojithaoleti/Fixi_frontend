import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Bell, TrendingUp, Star, CheckCircle, MapPin, Clock, ArrowRight, Zap, ToggleLeft, ToggleRight } from 'lucide-react';
import ProSidebar from '../../components/ProSidebar';

const stats = [
  { label: "Today's Jobs", value: '3', sub: '2 completed · 1 upcoming', color: '#3E2A56', bg: '#EDE6F8' },
  { label: 'This Week', value: '₹12,450', sub: '↑ 18% vs last week', color: '#059669', bg: '#D1FAE5' },
  { label: 'Avg Rating', value: '4.9★', sub: 'Based on 320 reviews', color: '#D97706', bg: '#FEF3C7' },
  { label: 'Completion', value: '97%', sub: '3 cancellations lifetime', color: '#3E2A56', bg: '#EDE6F8' },
];

const todaysJobs = [
  { id: 'FX-29483', service: 'AC Service & Repair', icon: '❄️', customer: 'Arjun K.', address: 'Banjara Hills, Hyd', time: '10:00 AM', status: 'In Progress', statusColor: '#059669', statusBg: '#D1FAE5' },
  { id: 'FX-29510', service: 'AC Installation', icon: '❄️', customer: 'Priya M.', address: 'Jubilee Hills, Hyd', time: '2:30 PM', status: 'Upcoming', statusColor: '#3E2A56', statusBg: '#EDE6F8' },
];

const newLeads = [
  { id: 'FX-29541', service: 'AC Repair', icon: '❄️', address: 'Madhapur, 1.4km', time: 'Today · 4:00 PM', payout: '₹520', expires: '4:32' },
  { id: 'FX-29538', service: 'Deep Cleaning', icon: '🧹', address: 'Gachibowli, 2.1km', time: 'Tomorrow · 9:00 AM', payout: '₹780', expires: '12:05' },
];

const quickActions = [
  { icon: '📋', label: 'View Schedule', page: '/pro/schedule' },
  { icon: '💰', label: 'My Earnings', page: '/pro/earnings' },
  { icon: '📍', label: 'Service Area', page: '/pro/area' },
];

const pv = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
};

export default function ProDashboard() {
  const navigate = useNavigate();
  const [dutyOn, setDutyOn] = useState(true);

  return (
    <motion.div variants={pv} initial="initial" animate="animate" exit="exit">
      <div style={{ display: 'flex', gap: 28, maxWidth: 1200, margin: '0 auto', padding: '100px 24px 60px', alignItems: 'flex-start' }}>
        <ProSidebar currentPage="pro-dashboard" />

        <main style={{ flex: 1 }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 14 }}>
            <div>
              <div style={{ fontSize: 13, color: '#9B8AB0', marginBottom: 4 }}>Monday, 30 March 2026</div>
              <h1 style={{ fontSize: 'clamp(1.4rem,3vw,1.9rem)', color: '#1A1A2E', fontFamily: 'var(--font-serif)' }}>Good morning, Ravi 👋</h1>
            </div>
            {/* Duty toggle */}
            <motion.button whileTap={{ scale: 0.97 }} onClick={() => setDutyOn(d => !d)}
              style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 18px', borderRadius: 50, border: 'none', cursor: 'pointer', background: dutyOn ? 'linear-gradient(135deg,#3E2A56,#6B4A8F)' : '#EDE6F8', transition: 'all 0.3s' }}>
              {dutyOn ? <ToggleRight size={20} color="white" /> : <ToggleLeft size={20} color="#9B8AB0" />}
              <span style={{ fontWeight: 700, fontSize: 14, color: dutyOn ? 'white' : '#9B8AB0', fontFamily: 'var(--font-sans)' }}>
                Duty: {dutyOn ? 'ON' : 'OFF'}
              </span>
            </motion.button>
          </div>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 16, marginBottom: 28 }}>
            {stats.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                style={{ background: 'white', borderRadius: 16, padding: '20px', boxShadow: '0 4px 20px rgba(62,42,86,0.08)', border: '1px solid #F0EAF8', borderTop: '4px solid', borderTopColor: s.color }}>
                <div style={{ fontSize: 12, color: '#9B8AB0', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 8 }}>{s.label}</div>
                <div style={{ fontSize: 26, fontWeight: 800, color: s.color, fontFamily: 'var(--font-sans)', lineHeight: 1, marginBottom: 6 }}>{s.value}</div>
                <div style={{ fontSize: 12, color: '#9B8AB0' }}>{s.sub}</div>
              </motion.div>
            ))}
          </div>

          {/* New Job Leads */}
          {dutyOn && newLeads.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              style={{ background: 'white', borderRadius: 16, padding: '20px 24px', boxShadow: '0 4px 20px rgba(62,42,86,0.08)', border: '1px solid #F0EAF8', marginBottom: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981', animation: 'pulse 1.5s infinite' }} />
                <span style={{ fontWeight: 700, color: '#1A1A2E', fontSize: 16 }}>New Job Leads Near You</span>
                <span style={{ background: 'linear-gradient(135deg,#3E2A56,#6B4A8F)', color: 'white', borderRadius: 50, fontSize: 11, fontWeight: 700, padding: '2px 8px' }}>{newLeads.length}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {newLeads.map((lead, i) => (
                  <motion.div key={i} whileHover={{ y: -2 }}
                    style={{ background: '#F8F5FF', borderRadius: 12, padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 14, borderLeft: '4px solid #3E2A56', flexWrap: 'wrap' }}>
                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg,#3E2A56,#6B4A8F)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{lead.icon}</div>
                    <div style={{ flex: 1, minWidth: 140 }}>
                      <div style={{ fontWeight: 700, color: '#1A1A2E', fontSize: 15, marginBottom: 4 }}>{lead.service}</div>
                      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#9B8AB0', fontSize: 12 }}><MapPin size={12} />{lead.address}</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#9B8AB0', fontSize: 12 }}><Clock size={12} />{lead.time}</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8, flexShrink: 0 }}>
                      <div style={{ fontSize: 18, fontWeight: 800, color: '#3E2A56' }}>{lead.payout}</div>
                      <div style={{ background: '#FEF3C7', color: '#D97706', borderRadius: 50, padding: '3px 10px', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Clock size={11} /> Expires {lead.expires}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                      <button onClick={() => navigate('/pro/job-leads')} style={{ background: 'linear-gradient(135deg,#3E2A56,#6B4A8F)', color: 'white', borderRadius: 50, padding: '9px 18px', fontWeight: 700, fontSize: 13, border: 'none', cursor: 'pointer' }}>Accept</button>
                      <button style={{ color: '#9B8AB0', fontSize: 13, background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>Decline</button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Today's Schedule */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            style={{ background: 'white', borderRadius: 16, padding: '20px 24px', boxShadow: '0 4px 20px rgba(62,42,86,0.08)', border: '1px solid #F0EAF8', marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <span style={{ fontWeight: 700, color: '#1A1A2E', fontSize: 16 }}>Today's Schedule</span>
              <button onClick={() => navigate('/pro/schedule')} style={{ color: '#6B4A8F', fontWeight: 600, fontSize: 13, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
                Full Schedule <ArrowRight size={13} />
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {todaysJobs.map((job, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', background: '#F8F5FF', borderRadius: 12, flexWrap: 'wrap' }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#EDE6F8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{job.icon}</div>
                  <div style={{ flex: 1, minWidth: 120 }}>
                    <div style={{ fontWeight: 700, color: '#1A1A2E', fontSize: 14, marginBottom: 3 }}>{job.service}</div>
                    <div style={{ fontSize: 12, color: '#9B8AB0', display: 'flex', alignItems: 'center', gap: 4 }}><MapPin size={11} />{job.address}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#9B8AB0', fontSize: 13 }}><Clock size={13} />{job.time}</div>
                    <span style={{ background: job.statusBg, color: job.statusColor, borderRadius: 50, fontSize: 11, fontWeight: 700, padding: '3px 10px' }}>{job.status}</span>
                  </div>
                  <button onClick={() => navigate('/pro/job-detail')} style={{ border: '1.5px solid #3E2A56', color: '#3E2A56', borderRadius: 50, padding: '7px 14px', fontSize: 12, fontWeight: 600, background: 'white', cursor: 'pointer', flexShrink: 0, fontFamily: 'var(--font-sans)' }}>View Details</button>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <div style={{ fontWeight: 700, color: '#1A1A2E', fontSize: 16, marginBottom: 14 }}>Quick Actions</div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {quickActions.map((a, i) => (
                <button key={i} onClick={() => navigate(a.page)}
                  style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'white', border: '1.5px solid #EDE6F8', borderRadius: 12, padding: '12px 20px', cursor: 'pointer', fontFamily: 'var(--font-sans)', transition: 'all 0.2s', boxShadow: '0 2px 12px rgba(62,42,86,0.06)' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#3E2A56'; e.currentTarget.style.background = '#F8F5FF'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#EDE6F8'; e.currentTarget.style.background = 'white'; }}>
                  <span style={{ fontSize: 20 }}>{a.icon}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#1A1A2E' }}>{a.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        </main>
      </div>
      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
    </motion.div>
  );
}
